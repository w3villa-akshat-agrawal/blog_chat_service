const Conversation = require("../models/conversation");

exports.startConversation = async (req, res) => {
  const { receiverId, userId } = req.body; // get userId from body

  if (!receiverId || !userId) {
    return res.status(400).json({ error: "userId and receiverId required" });
  }

  // Check if conversation already exists
  let conv = await Conversation.findOne({
    participants: { $all: [userId, receiverId] }
  });

  if (!conv) {
    conv = new Conversation({ participants: [userId, receiverId] });
    await conv.save();
  }

  res.json(conv);
};

exports.getConversations = async (req, res) => {
  const userId = req.user.id;
  const conversations = await Conversation.find({ participants: userId });
  res.json(conversations);
};
