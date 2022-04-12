const postsModel = require("../model/postsModel");
const messagesModel = require("../model/messagesModel");
const mongoose = require("mongoose");

//create mesage
const createOne = async (req, res) => {
  try {
    const newMessage = await new messagesModel(req.body);
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//get all mesage
const getAll = async (req, res) => {
  try {
    const messagesQuery = await messagesModel.find();
    res.status(200).json(messagesQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get a mesage
const getOne = async (req, res) => {
  try {
    const messageQuery = await messagesModel.findById(req.params.id);
    res.status(200).json(messageQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get all message of a conversation
const getMessageConversation = async (req, res) => {
  try {
    const messageQuery = await messagesModel
      .find({
        conversationId: req.params.id,
      })
      .populate("sender");
    res.status(200).json(messageQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update one
const updateOne = async (req, res) => {
  try {
    const messageQuery = await messagesModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { text: req.body.text },
      },
      { new: true }
    );
    res.status(200).json(messageQuery);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//delete
const deleteOne = async (req, res) => {
  try {
    const messageQuery = await messagesModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted", messageQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  getMessageConversation,
};
