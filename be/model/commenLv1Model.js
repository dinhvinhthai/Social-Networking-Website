const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    postId: { type: String },
    message: { type: String },
    like: [{ type: String, ref: "usersModal" }],
    img: { type: String },
    userId: { type: String, ref: "usersModal" },
    commentLv2: [{ type: String, ref: "commentLv2Model" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("commentsSchema", commentsSchema);
