const { cloudinaryConnect, cloudinary } = require("../config/cloudinary");
const Message = require("../models/Message");
const User = require("../models/User");
const server = require("../server");

// Get all users except the logged in user
exports.getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    const filteredUser = await User.find({ _id: { $ne: userId } }).select("-password");

    const unseenMessage = {};
    const promises = filteredUser.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessage[user._id] = messages.length;
      }
    });

    await Promise.all(promises);

    res.json({
      success: true,
      users: filteredUser,
      unseenMessages: unseenMessage,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all messages from selected User
exports.getMessage = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Mark message as seen
exports.markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = String(req.params.id);   // normalize to string
    const senderId   = String(req.user._id);    // normalize to string

    if (!text && !image) {
      return res.json({ success: false, message: "Message cannot be empty" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Safely look up socket IDs
    const receiverSocketId = server.userSocketMap[receiverId];
    const senderSocketId   = server.userSocketMap[senderId];

    if (senderSocketId) server.io.to(senderSocketId).emit("newMessage", newMessage);
    if (receiverSocketId) server.io.to(receiverSocketId).emit("newMessage", newMessage);

    res.json({ success: true, newMessage });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};