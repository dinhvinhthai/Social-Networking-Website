const userModal = require("../model/usersModel");
let onlineUsers = [];
const addNewUser = (userLogin, socketId) => {
  if (!userLogin._id) return;
  !onlineUsers.some((user) => user._id === userLogin._id) &&
    onlineUsers.push({ ...userLogin, socketId });
};
const removeAuser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getAUser = (userId) => {
  return onlineUsers.find((user) => {
    return user._id == userId;
  });
};
const getAllUser = (userIdArray) => {
  return onlineUsers.filter((onlineUser) => {
    return userIdArray.some((item) => item === onlineUser._id);
  });
};

const getOnlineUser = () => {
  return onlineUsers;
};

const getFriendsOnline = (friends) => {
  return onlineUsers.filter((item) => friends.some((f) => f._id === item._id));
};

module.exports = {
  onlineUsers,
  addNewUser,
  removeAuser,
  getAUser,
  getAllUser,
  getOnlineUser,
  getFriendsOnline,
};
