import mongoose from 'mongoose';

const URI:string="mongodb://localhost:27017/Messenger";

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