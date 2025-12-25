const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Middleware to protect the routes
exports.protectRoute = async (req, res, next) => {
  try {
    // fetching the token from header
    const token = req.headers.token;
    
    // decoding the user from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // finding the user
    const user = await User.findById(decoded.userId).select("-password");

    // validation for the user
    if (!user) {
      return res.json({
        success: false,
        message: "User not found ...",
      });
    }
    // if user is found
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
