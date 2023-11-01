import usersModel from './users-model.js';

export const addInterests = async (uid, interests) => {
    const user = await usersModel.findById(uid);
    const combinedInterests = new Set([...user.interests, ...interests]);
    const newInterests = [...combinedInterests];
    await usersModel.findByIdAndUpdate(uid, { interests: newInterests }, { new: true });
}

export const createUser = (user) => usersModel.create(user);

export const findUserById = (uid) => usersModel.findById(uid);

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

export const setQuizAnswers = async (uid, quizAnswersObj) => {
    const user = await usersModel.findById(uid);

    // Transform quizAnswersObj to match the schema
    const quizAnswersArray = Object.keys(quizAnswersObj).map(key => ({
        questionNumber: parseInt(key, 10),  // Convert the key string to number
        answer: quizAnswersObj[key]
    }));

    console.log(uid, {
        ...user._doc,
        quizAnswers: quizAnswersArray
    });

    await usersModel.findByIdAndUpdate(uid, { quizAnswers: quizAnswersArray }, { new: true });
};

export const getQuizAnswers = async (uid) => {
    const user = await usersModel.findById(uid);
    return user.quizAnswers;
}