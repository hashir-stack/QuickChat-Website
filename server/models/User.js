const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    fullName:{
        type:String,

        
    },
    password:{
        type:String,
        
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },
    bio:{
        type:String,
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);
