const express = require("express");
const serverless = require("serverless-http");

const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const dbConnect = require("./config/dataBase.js");
const { cloudinaryConnect } = require("./config/cloudinary.js");
const userRoutes = require("./routes/userRoute.js");
const messageRoutes = require("./routes/messageRoute.js");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
exports.io = io;

// 👇 Declare and export the socket map once
exports.userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) {
    // normalize to string
    exports.userSocketMap[String(userId)] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(exports.userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete exports.userSocketMap[String(userId)];
    io.emit("getOnlineUsers", Object.keys(exports.userSocketMap));
  });
});

app.use(express.json({ limit: "4mb" }));
app.use(cors());

dbConnect();
cloudinaryConnect();

app.use("/api/status", (req, res) => {
  res.send("Server is live...");
});
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV !== "production"){
  server.listen(PORT, () => {
  console.log(`Server is successfully running on ${PORT}...`);
  });
}
// export server for vercel
module.exports = server;
module.exports = app;
module.exports.handler = serverless(app);

