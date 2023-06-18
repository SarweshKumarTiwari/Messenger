import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const URI:string=process.env.DB_URI||"mongodb://localhost:27017/Messenger";

const connectUsers=()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(URI,()=>{
        try {
            console.log("Succesfully connected to DB")
        } catch (error) {
            console.log(error);
        }
    })
}

export default connectUsers;