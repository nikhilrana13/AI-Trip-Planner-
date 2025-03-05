
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"




export const UserSignUp = async(req,res)=>{
     try {
        const {name,email,password} = req.body;


      
        // check if user already exists
        let user = await userModel.findOne({email});

        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const hashpassword = await bcrypt.hash(password,10);
        user = userModel.create({
            name,
            email,
            password:hashpassword,
        })
        
         return res.status(200).json({message:"Signup successfully"});

     } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"Internal server error"});
        
     }
}

export const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;

        // check if user email exists or not 

        let user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid password or email"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.cookie("token",token,{httpOnly:true,sameSite:"lax"});
        console.log("token",token);

        return res.status(200).json({message:"Login successfully",user,token});

        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"Internal server error"});
    }
}


export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"Logout successfully"});
        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

