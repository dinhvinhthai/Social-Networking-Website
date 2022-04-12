const mongoose = require("mongoose");
const messagesSchema = new mongoose.Schema(
  {
    conversationId: { type: String, ref: "conversationModel" },
    sender: { type: String, ref: "usersModal" },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messagesModel", messagesSchema);
