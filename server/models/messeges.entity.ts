import mongoose, { Schema } from "mongoose";

export default mongoose.model("Messeges",new Schema({
    category:{
        type:Number,
        required:true
    },
    user:{
        type:new Schema({
            chatId:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required:false,
            },
            image:{
                type:String,
                required:false
            },
            message:{
                type:String,
                required:false
            },
            date:{
                type:Date,
                default:Date.now
            },
        }),
        required:false
    },
    message:{
        type:String,
        required:false
    }
}));