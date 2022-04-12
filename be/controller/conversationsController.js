const postsModel = require("../model/postsModel");
const conversationModel = require("../model/conversationsModel");
const mongoose = require("mongoose");

//createAConversation
const createAConversation = async (req, res) => {
  try {
    const newConversation = await new conversationModel({
      ...req.body,
      ...{ admin: req.user._id },
    });
    await newConversation.save();
    res.status(200).json(newConversation);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//get all conversations
const getAllConversation = async (req, res) => {
  try {
    const conversationQuery = await conversationModel.find();
    res.status(200).json(conversationQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get a conversation
const getAConversation = async (req, res) => {
  try {
    const conversationQuery = await conversationModel.findById(req.params.id);
    res.status(200).json(conversationQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update

const addANewUserToAConversation = async (req, res) => {
  try {
    const conversationQuery = await conversationModel.findById(req.params.id);
    if (conversationQuery.admin.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ message: "you are not admin of this conversation" });
    const conversationUpdate = await conversationModel.findByIdAndUpdate(
      req.params.id,
      { $push: { members: req.body.userId } },
      { new: true }
    );
    res.status(200).json(conversationUpdate);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const pullAUserOutOfAConversation = async (req, res) => {
  try {
    const conversationQuery = await conversationModel.findById(req.params.id);
    //check if admin or ur self
    if (
      conversationQuery.admin.toString() !== req.user._id.toString() &&
      conversationQuery.members.includes(req.user._id.toString())
    )
      return res.status(401).json({ message: "you are not have permission" });
    //check if delete admin and last one
    if (
      req.body.userId === conversationQuery.admin.toString() &&
      conversationQuery.members.length === 1
    ) {
      const conversationUpdate = await conversationModel.findByIdAndDelete(
        req.params.id
      );
      return res.status(200).json({ message: "deleted", conversationUpdate });
    }
    //check if delete admin
    if (req.body.userId === conversationQuery.admin.toString()) {
      return res.status(200).json({
        message: "only can delete this conversation when you are last",
      });
    }
    const conversationUpdate = await conversationModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.body.userId } },
      { new: true }
    );
    res.status(200).json(conversationUpdate);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//delete
const deleteAConversation = async (req, res) => {
  try {
    const conversationQuery = await conversationModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({ message: "deleted", conversationQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  createAConversation,
  getAllConversation,
  addANewUserToAConversation,
  pullAUserOutOfAConversation,
  getAConversation,
  deleteAConversation,
};
