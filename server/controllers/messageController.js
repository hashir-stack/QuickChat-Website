const { cloudinaryConnect } = require("../config/cloudinary");
const Message = require("../models/Message");
const User = require("../models/User");
const { userSocketMap, io } = require("../server");


// Get all users except the logged in user
exports.getUsersForSidebar = async (req,res)=>{
    try {
        // fetching the user id from request
        const userId = req.user._id;

        const filteredUser = await User.find({_id:{$ne:userId}}).select("-password");

        // Number of message not seen
        const unseenMessage = {};
        const promises = filteredUser.map(async(user)=>{
            const messages = await Message.find({senderId:user._id,receiverId:userId,seen:false});
            if(messages.length>0){
                unseenMessage[user._id] = messages.length;
            }
        });

        await Promise.all(promises);

        res.json({
            success:true,
            users:filteredUser,
            unseenMessage
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Get all messages from selected User
exports.getMessage = async (req,res)=>{
    try {
        // fetching the needed ids
        const {id:selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                { senderId:myId, receiverId:selectedUserId },
                { senderId:selectedUserId, receiverId:myId }
            ]
        });

        await Message.updateMany(
            {senderId : selectedUserId,receiverId:myId},
            {seen:true}
        );

        res.json({
            success:true,
            messages
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Api to mark message as seen using message id
exports.markMessageAsSeen = async(req,res)=>{
    try {
        const {id} = req.params;

        await Message.findByIdAndUpdate(id,{seen:true});

        res.json({
            success:true,
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        });
    }
}

// Send message to selected user
exports.sendMessage = async (req,res)=>{
    try {
        // feteching the needed data from the request
        const{text,image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinaryConnect.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,receiverId,text,image:imageUrl
        });

        // Emit the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }
}