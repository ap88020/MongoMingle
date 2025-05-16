import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import cloudinary from "../lib/cloudinary/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/soket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await userModel.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log(`Error :- ${error.message}`);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};


export const getMessages = async (req,res) => {
    try {
        const { id:userToChatID } = req.params;
        const myId = req.user._id;
        const messages = await messageModel.find({
            $or:[
                {senderId : myId , receverId : userToChatID},
                {senderId : userToChatID , receverId : myId},
            ]
        })
        res.status(200).json({messages})
    } catch (error) {
        console.log(`Error in getMessages:- ${error.message}`);
        res.status(400).json({
            error : "internal server error",
        })
    }   
}

export const sendMessage = async (req,res) => {
    try {
        const { text, image } = req.body;
        const { id:receverId } = req.params;
        const senderId = req.user._id;

        let imagUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imagUrl  = uploadResponse.secure_url;
        }

        const newMessage = new messageModel({
            senderId,
            receverId,
            text,
            image : imagUrl,
        })

            await newMessage.save();
            const receiverSocketId = getReceiverSocketId(receverId);

            if(receiverSocketId){
                io.to(receiverSocketId).emit("newMessages" , newMessage);
            }

            res.status(200).json({
                newMessage
            })
    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(400).json({
            error : "Internal server Error",
        })        
    }
}