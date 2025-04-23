import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message : "Unothirized :- No token provided",
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                message : "Unothirized : Invalid Token",
            })
        }
        const user = await userModel.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({
                message : "Message is not found",
            })
        }
        req.user = user;

        next();
    } catch (error) {
        console.log(`Error in protectRoute middleware : ${error.message}`);
        res.status(400).json({
            message : "Internal server Error",
        })
    }
}