const { cloudinaryConnect, cloudinary } = require("../config/cloudinary");
const { generateToken } = require("../libs/utils");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// SignUp for new User
exports.signup = async (req, res) => {
  const { fullName, bio, email, password } = req.body;

  try {
    // Validation
    if (!fullName || !bio || !email || !password) {
      return res.json({
        success: false,
        message: "All feilds are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User is already register...",
      });
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating the new user
    const newUser = await User.create({
      fullName,
      password: hashedPassword,
      bio,
      email,
    });

    // creating the token
    const token = generateToken(newUser._id);

    // sending successfull response
    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created Succefully...",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Controller for Login
exports.login = async (req, res) => {
  // fetching the data from req body
  const { password, email } = req.body;
  try {
    // finding the user on the basis of email
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials...",
      });
    }

    // comparing the the password for the validation
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid Credentials...",
      });
    }

    // generating the token
    const token = generateToken(userData._id);

    // sending the successfull response
    res.json({
      success: true,
      userData,
      token,
      message: "Successfully login...",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to check if user is authenticated
exports.checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// controller to update user profile
exports.updateProfile = async (req, res) => {
  try {
    // fetcing the needed data from the reqests
    const { bio, profilePic, fullName } = req.body;
    const userId = req.user._id;

    let updatedUser;
    // if profilepic is only bio and fullName is updated
    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName, profilePic: upload.secure_url },
        { new: true }
      );
    }

    // success response
    res.json({
      success: true,
      user: updatedUser,
      message: "Profile is updated Successfully...",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
