const express = require("express");
const cors= require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// importing the db config
const dbConnect = require("./config/dataBase.js");
const { cloudinaryConnect } = require("./config/cloudinary.js");

// importing the routes
const userRoutes = require("./routes/userRoute.js");
const messageRoutes = require("./routes/messageRoute.js");

const PORT = process.env.PORT || 5000;

// create express and HTTP Sever
const app = express();
const server = http.createServer(app); 

// Initialize socket.io server
const io = new Server(server, { cors: { origin: "*" } });
exports.io = io;


// Store Online Users
exports.userSocketMap = {}; //in this obj add userId and SocketId

// Socket.io connection handler
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User Connected" , userId);

    if(userId){
        exports.userSocketMap[userId]= socket.id;
    }

    // Emit online users to  all connected clinets
    io.emit("getOnlineUsers",Object.keys(exports.userSocketMap));

    socket.on("disconnect",()=>{
        console.log("User Disconnected" , userId);
        delete exports.userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(exports.userSocketMap))
    })
    
})

// Middleware SetUp
app.use(express.json({limit: "4mb"}));
app.use(cors());

//db Connection 
dbConnect();
// cloudinary connection
cloudinaryConnect();

// Basic Routes
app.use("/api/status",(req,res)=>{
    res.send("Server is live...");
});
// Setting Up the Routes
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);

server.listen(PORT,()=>{
    console.log(`Server is successfully running on ${PORT}...`);
})