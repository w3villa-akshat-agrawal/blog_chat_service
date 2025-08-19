const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [{ type: String, required: true }],  // user IDs
  lastMessage: {
    sender: String,
    text: String,
    timestamp: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model("Conversation", conversationSchema);
