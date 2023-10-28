import usersModel from './users-model.js';

export const createUser = (user) => usersModel.create(user);

export const deleteUser = (uid) => usersModel.deleteOne({ _id: uid });

export const updateUser = (uid, user) => usersModel.updateOne({ _id: uid }, { $set: user });

export const sendFriendRequest = async (uid, fid) => {
    await usersModel.updateOne({ _id: uid }, { $push: { sentRequests: fid } });
    await usersModel.updateOne({ _id: fid }, { $push: { receivedRequests: uid } });
}


export const acceptFriendRequest = async (uid, fid) => {
    await usersModel.updateOne({ _id: uid }, { 
        $pull: { receivedRequests: fid }, 
        $push: { friends: fid } 
    });
    
    await usersModel.updateOne({ _id: fid }, { 
        $pull: { sentRequests: uid }, 
        $push: { friends: uid } 
    });
}


export const declineFriendRequest = async (uid, fid) => {
    await usersModel.updateOne({ _id: uid }, { $pull: { receivedRequests: fid } });
    await usersModel.updateOne({ _id: fid }, { $pull: { sentRequests: uid } });
}


export const removeFriend = async (uid, fid) => {
    await usersModel.updateOne({ _id: uid }, { $pull: { friends: fid } });
    await usersModel.updateOne({ _id: fid }, { $pull: { friends: uid } });
}
