const Message = require("../models/chats");
const Conversation = require("../models/conversation");


const chatSocket = async (io)=>{

     io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // 1️⃣ User joins a conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`User joined conversation ${conversationId}`);
    });

    // 2️⃣ Sending a new message
    socket.on("sendMessage", async ({ conversationId, sender, text }) => {
      // Save message in DB
      const message = new Message({ conversationId, sender, text });
      await message.save();

      // Update conversation with latest message
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: { sender, text, timestamp: new Date() }
      });

      // Broadcast new message to all users in this conversation room
      io.to(conversationId).emit("newMessage", message);
    });

    // 3️⃣ User disconnects
    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });
}
module.exports = chatSocket