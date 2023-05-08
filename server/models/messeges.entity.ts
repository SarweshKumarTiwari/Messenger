import mongoose, { Schema } from "mongoose";

export default mongoose.model("Messeges",new Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    category:{
        type:Number,
        default:0
    },
    user:{
        type:new Schema({
            userId:{
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
                type:new Schema({date:String,time:String},{_id:false}),
                default:()=>{
                    const a=new Date();
                    const date=`${a.getDate()}/${a.getMonth()+1}/${a.getFullYear()}`
                    const time=`${a.getHours()}:${a.getMinutes()}`;
                    return {date:date,time:time};
                }
            },
        },{_id:false}),
        required:false
    },
    message:{
        type:String,
        required:false
    }
}));