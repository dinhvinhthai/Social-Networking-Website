const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "usersModal",
    },
    jobName: {
      type: String,
    },
    desc: {
      type: String,
      max: 350,
      lowercase: true,
    },
    img: {
      type: String,
      default: "defaultEvent.jpg",
    },
    location: { type: String, default: "Trường đại học Cần Thơ" },
    participants: {
      type: String,
      default: "Sinh viên Đại Học Cần Thơ",
    },
    link: {
      type: String,
      default: "ctu.edu.vn",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobsModel", jobsSchema);
// module.exports = mongoose.model("commentModal", commentSchema);
