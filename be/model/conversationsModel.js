const mongoose = require("mongoose");
const conversationsSchema = new mongoose.Schema(
  {
    members: [{ type: String, ref: "usersModal" }],
    img: { type: String, default: "defaultEvent.jpg" },
    conversationName: { type: String },
    admin: { type: String, ref: "usersModal" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversationModel", conversationsSchema);
