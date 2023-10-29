import * as usersDao from "./users-dao.js"

const UserController = (app) => {
  app.post('/api/users', createUser);
  app.delete('/api/users/:uid', deleteUser);
  app.put('/api/users/:uid', updateUser);
  app.post('/api/users', findUserByUsername);
  
  
  // Friend-related routes
  app.put('/api/users/sendRequest/:uid/:fid', sendFriendRequest);
  app.put('/api/users/acceptRequest/:uid/:fid', acceptFriendRequest);
  app.put('/api/users/declineRequest/:uid/:fid', declineFriendRequest);
  app.put('/api/users/removeFriend/:uid/:fid', removeFriend);
  
  
  // Quiz-related routes
  app.get('/api/users/:uid/quiz', getQuizAnswers);
  app.put('/api/users/:uid/quiz', setQuizAnswers);
}


const createUser = async (req, res) => {
  const newUser = req.body;
  // const user = await usersDao.findUserByUsername(newUser.username)
  // if (user) {
  //   res.sendStatus(409)
  //   return
  // }
  const insertedUser = await usersDao
  .createUser(newUser);
  res.json(insertedUser);
};



const sendFriendRequest = async (req, res) => {
  try {
    await usersDao.sendFriendRequest(req.params.uid, req.params.fid);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const acceptFriendRequest = async (req, res) => {
  try {
    await usersDao.acceptFriendRequest(req.params.uid, req.params.fid);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const declineFriendRequest = async (req, res) => {
  try {
    await usersDao.declineFriendRequest(req.params.uid, req.params.fid);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const removeFriend = async (req, res) => {
  try {
    await usersDao.removeFriend(req.params.uid, req.params.fid);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



const findUsers = async (req, res) => {
  const users = await usersDao.findUser()
  res.json(users)
}

const findUserById = async (req, res) => {
  const user = await usersDao.findUserbyId(req.params.uid)
  res.json(user)
}
const findUserByUsername = async (req, res) => {
  const user = await usersDao.findUserByUsername(req.params.uid)
  res.json(user)
}


const deleteUser = async (req, res) => {
  const userIdToDelete = req.params.uid;
  const status = await usersDao.deleteUsers(userIdToDelete);
  res.json(status);
}

const updateUser = async (req, res) => {
  const userIdToUpdate = req.params.uid;
  const updates = req.body;
  const status = await usersDao
  .updateUser(userIdToUpdate,
    updates);
    res.json(status);
  }
  
  const getQuizAnswers = async (req, res) => {
    const uid = req.params.uid;
    const quizAnswers = await usersDao.getQuizAnswers(uid);
    res.json(quizAnswers);
  }
  
  const setQuizAnswers = async (req, res) => {
    const uid = req.params.uid;
    const quizAnswers = req.body;
    await usersDao.setQuizAnswers(uid, quizAnswers);
    res.json({ success: true });
  }
  
  
  export default UserController