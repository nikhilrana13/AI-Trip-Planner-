import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tripRoute from "./routes/TripRoute.js";



dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin:["http://localhost:5173","http://localhost:5174"],
        credentials:true
    }
));


// middlewares //
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());






// routes //
app.use('/api/user',userRoute);
app.use('/api/trip',tripRoute)





// connet to mongoDB //

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.log("Error connecting to mongoDB",err)
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
