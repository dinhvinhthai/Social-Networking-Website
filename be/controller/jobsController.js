const mongoose = require("mongoose");
const jobsModel = require("../model/jobsModel");

const getAllJob = async (req, res) => {
  try {
    const jobsQuery = await jobsModel.find();
    res.status(200).json({ jobsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAJob = async (req, res) => {
  try {
    const jobsQuery = await jobsModel.findById(req.params.id);
    res.status(200).json({ jobsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//create an event
const createAJob = async (req, res) => {
  try {
    if (req.user.isAdmin === false)
      return res
        .status(400)
        .json({ message: "only Admin can create an event" });
    const jobsQuery = await new jobsModel(req.body);
    if (req.file) {
      jobsQuery.img = req.file.filename;
    }
    jobsQuery.save();
    res.status(200).json({ jobsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//update an event
const updateAJob = async (req, res) => {
  try {
    if (req.user.isAdmin === false)
      return res
        .status(400)
        .json({ message: "only Admin can update an event" });
    const jobsQuery = await jobsModel.findByIdAndUpdate(
      req.body.jobId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ jobsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteAJob = async (req, res) => {
  try {
    if (req.user.isAdmin === false)
      return res
        .status(400)
        .json({ message: "only Admin can delete an event" });
    const jobsQuery = await jobsModel.findByIdAndDelete(req.body.jobId);
    res.status(200).json({ jobsQuery });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllJob,
  getAJob,
  createAJob,
  updateAJob,
  deleteAJob,
};
