import userModel from "../models/user.model.js";
import bcrypt, { compare } from 'bcryptjs'
import { generateToken } from "../lib/utils/utils.js";
import cloudinary from "../lib/cloudinary/cloudinary.js";

export const signup =  async (req,res) => {
    const {fullName,email,password} = req.body;

    try {
        if(!password || !fullName || !email){
            res.status(400).json({
                message : "all fields are required",
            })
            return;
        }

        if(password.length < 6){
            res.status(400).json({
                message : "password must contains atleast 6 character",
            })
        }
        const user = await userModel.findOne({email}); 
        if(user)res.status(400).json({message : "user already exists"});
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = await userModel.create({
            fullName,
            email,
            password : hashPassword,
        })

        if(newUser){
            const token = generateToken(newUser._id , res);
            await newUser.save();

            res.status(201).json({
                id : newUser._id,
                email : newUser.email,
                fullName : newUser.fullName,
                password : newUser.password
            })
        }else{
            res.status(400).json({
                message : "invalid user details"
            })
        }
        
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                message : "Invalid Credentials",
            })
            
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Invalid Credentials",
            })
            
        }
        generateToken(user._id,res);
        res.json({
            name : user.fullName,
            email : user.email,
            password : user.password,
            profilePicture : user.profilePic,
        })
    } catch (error) {
        console.log(`Error :- ${error.message}`);
        res.status(400).json({
            message : "Internal Server Error",
        })
    }
}

export const logout =  (req,res) => {
    try {
        res.cookie("token","",{maxAge : 0});
        res.status(200).json({
            message : "Logout successfully",
        })
    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(400).json({
            message : "Internal Server Error",
        })
    }
}

export const updateProfile = async (req,res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status.json({
                message : "profile pic is required",
            })
        }

        const uploadResponse = await cloudinary.uploader.upload({profilePic})
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {profilePic : uploadResponse.secure_url},
            {new:true}
        );

        res.status(200).json({
            updatedUser,
        })
        
    } catch (error) {
        console.log(`Error :- ${error.message}`);
        res.status(400).json({
            message : "Internal server error"
        })
    }
}

export const checkAuth = async (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(400).json({
            message : " Internal server error ",
        })
    }
}