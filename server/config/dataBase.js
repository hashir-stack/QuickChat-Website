const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect =()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database connect successfully...")
    })
    .catch((error)=>{
        console.log(error);
        console.log("Issue in connecting the Database...");
        process.exit(1);
    })
};

module.exports = dbConnect;