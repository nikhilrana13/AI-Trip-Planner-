import mongoose from "mongoose";

const SavedTripSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    tripId:{type:mongoose.Schema.Types.ObjectId,ref:"Trip"},
    createdAt:{type:Date, default:Date.now}
})

const SavedTripModel = mongoose.model("SavedTrip",SavedTripSchema);
export default SavedTripModel;

