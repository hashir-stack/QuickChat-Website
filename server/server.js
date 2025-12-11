const express = require("express");
const cors= require("cors");
require("dotenv").config();
const http = require("http");

// importing the db config
const dbConnect = require("./config/dataBase.js");
const { cloudinaryConnect } = require("./config/cloudinary.js");

// importing the routes
const userRoutes = require("./routes/userRoute.js")

const PORT = process.env.PORT || 5000;

// create express and HTTP Sever
const app = express();
const server = http.createServer(app); 

// Middleware SetUp
app.use(express.json({limit: "4"}));
app.use(cors());

//db Connection 
dbConnect();
// cloudinary connection
cloudinaryConnect();

// Basic Routes
app.use("/api/status",(req,res)=>{
    res.send("Server is live...");
});

app.use("/api/auth",userRoutes);

server.listen(PORT,()=>{
    console.log(`Server is successfully running on ${PORT}...`);
})