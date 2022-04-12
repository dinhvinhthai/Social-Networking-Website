const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "usersModal",
    },

    groupId: {
      type: String,
      max: 300,
    },
    desc: {
      type: String,
      max: 350,
      lowercase: true,
    },
    likes: [{ type: String, ref: "usersModal" }],
    img: {
      type: String,
    },
    video: {
      type: String,
    },
    isJob: { type: Boolean, default: false },
    isDocument: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("postsModal", postsSchema);
// module.exports = mongoose.model("commentModal", commentSchema);
