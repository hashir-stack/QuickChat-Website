const jwt = require("jsonwebtoken");

exports.generateToken= (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET);
    return token;
}