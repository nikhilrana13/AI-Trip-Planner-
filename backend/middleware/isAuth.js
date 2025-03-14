import jwt from "jsonwebtoken";

export const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message:"Login to create a trip"}); ;
        } 

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;

        next();
        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"Internal server error"}); ;

        
    }
}