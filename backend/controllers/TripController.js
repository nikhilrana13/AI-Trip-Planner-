
import tripModel from "../models/TripModel.js";
import userModel from "../models/userModel.js";

import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI("AIzaSyDD5P1PUgSka9gJ9iygwt9IX_VkELFg8ek");
// console.log("Google Gemini API Key:", genAI ? "Loaded" : "Not Loaded");



export const CreateTrip = async(req,res)=>{
    try {
        const userid = req.params.id;
        const{ name,destination,days,budget,traveltype} = req.body;
        // console.log('received data',req.body);

       
        // check if user exists or not //
        const user = await userModel.findById(userid);

        if(!user){
            return res.status(404).json({message:"Login to create a trip"});
        }

        // Ai powered itinerary //

        const prompt = `Generate a ${days}-day itinerary for ${destination} with a ${budget} for a ${traveltype} suggest activities,tourist attractions and hotels and famous restaurents accordingly with cool emoji according to line `;

       const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"});
       const response = await model.generateContent(prompt);
       const itinerary = response.response.text();

        const trip = await tripModel.create({
            userId:userid,
             name,
             destination,
             days,
             budget,
             traveltype,
             itinerary,
        })
;
        user.savedtrips.push(trip._id);
        await user.save();
     

        return res.status(200).json({message:"Trip created successfully",trip});

        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"Login to create a trip"});
          
    }
}


export const GetSavedTrips = async(req,res)=>{
    try {
        const userid = req.params.id;

        const user = await userModel.findById(userid).populate("savedtrips");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

       
        return res.status(200).json({message:"saved trips",savedtrips:user.savedtrips});
        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"failed to get saved trips"});
        
    }
}

export const GetTripdetails = async(req,res)=>{
    try {
        const {id} = req.params;
        const trip = await tripModel.findById(id);

        if(!trip){
            return res.status(404).json({message:"Trip not found"});
        }

        return res.status(200).json({message:"Trip details",trip});

        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({message:"failed to get trip details"});
        
    }
}
