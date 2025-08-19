const Message = require("../models/chats");

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  console.log(conversationId)
  
  const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });

  res.json(messages);
};
