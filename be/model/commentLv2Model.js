const mongoose = require("mongoose");
const commentLv2Schema = new mongoose.Schema(
  {
    commentLv1: { type: String },
    message: { type: String },
    like: [{ type: String, ref: "usersModal" }],
    img: { type: String },
    userId: { type: String, ref: "usersModal" },
  },

  { timestamps: true }
);

module.exports = mongoose.model("commentLv2Model", commentLv2Schema);
