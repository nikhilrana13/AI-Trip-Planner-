import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true},
     password:{type:String,required:true},
     savedtrips:[{type:mongoose.Schema.Types.ObjectId,ref:"Trip"}],
})


const userModel = mongoose.model("User",userSchema);
export default userModel