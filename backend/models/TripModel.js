import mongoose from "mongoose";

const tripSchema = mongoose.Schema({
      userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
      destination:{type:String,required:true},
      days:{type:Number,required:true},
      budget:{
         type:String,
         required:true,
        enum:["cheap","medium","luxury"],
      },
      traveltype:{type:String,required:true,enum:['solo','couple','family','group','friends']},
      itinerary:{type:String,required:true},

})

const tripModel = mongoose.model("Trip",tripSchema);
export default tripModel