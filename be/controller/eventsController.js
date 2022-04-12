const postsModel = require("../model/postsModel");
const mongoose = require("mongoose");
const eventsModel = require("../model/eventModel");

const getAllEvents = async (req, res) => {
  try {
    const eventsQuery = await eventsModel.find();
    res.status(200).json({ eventsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAnEvents = async (req, res) => {
  try {
    const eventsQuery = await eventsModel.findById(req.params.id);
    res.status(200).json({ eventsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//create an event
const createAnEvent = async (req, res) => {
  try {
    if (req.user.isAdmin === false)
      return res
        .status(400)
        .json({ message: "only Admin can create an event" });
    const eventsQuery = await new eventsModel(req.body);
    if (req.file) {
      eventsQuery.img = req.file.filename;
    }
    eventsQuery.save();
    res.status(200).json({ eventsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update an event
const updateAnEvent = async (req, res) => {
  try {
    if (req.user.isAdmin === false)
      return res
        .status(400)
        .json({ message: "only Admin can update an event" });
    const eventsQuery = await eventsModel.findByIdAndUpdate(
      req.body.eventId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ eventsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteAnEvent = async (req, res) => {
  try {
    if (req.user.isAdmin === false)
      return res
        .status(400)
        .json({ message: "only Admin can delete an event" });
    const eventsQuery = await eventsModel.findByIdAndDelete(req.body.eventId);
    res.status(200).json({ eventsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const joinEvent = async (req, res) => {
  try {
    const eventsJoin = await eventsModel.findById(req.body.eventId);
    if (eventsJoin.joins.includes(req.user._id)) {
      const eventsQuery = await eventsModel.findByIdAndUpdate(
        req.body.eventId,
        {
          $pull: { joins: req.user._id },
        },
        { new: true }
      );
      return res.status(200).json({ message: "huy tham gia", eventsQuery });
    }
    const eventsQuery = await eventsModel.findByIdAndUpdate(
      req.body.eventId,
      {
        $push: { joins: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({ message: "tham gia", eventsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllEvents,
  deleteAnEvent,
  createAnEvent,
  updateAnEvent,
  getAnEvents,
  joinEvent,
};
