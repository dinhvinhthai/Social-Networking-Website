const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "usersModal",
    },
    eventName: {
      type: String,
    },
    desc: {
      type: String,
      max: 350,
      lowercase: true,
    },
    joins: [{ type: String, ref: "usersModal" }],

    img: {
      type: String,
      default: "defaultEvent.jpg",
    },
    startTime: {
      type: Date,
    },
    location: { type: String, default: "Trường đại học Cần Thơ" },
    duration: {
      type: Number,
    },
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

module.exports = mongoose.model("eventModel", eventsSchema);
// module.exports = mongoose.model("commentModal", commentSchema);
