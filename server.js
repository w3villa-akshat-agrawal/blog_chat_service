require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoConnection");
const chatRouter = require("./src/routes/chatRoutes")
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
const chatSocket = require("./src/socket/chatSocket");

const PORT = process.env.PORT || 5001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

chatSocket(io);
app.use("/blogChat",chatRouter)
server.listen(PORT, () => console.log(`🚀 Chat service running on port ${PORT}`));
