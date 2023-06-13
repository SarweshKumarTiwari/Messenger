import mongoose,{Schema} from "mongoose";

export default mongoose.model("userFriendsandGroups",new Schema({
    name:{
        type:String,
        required:false
    },
    img:{
        type:String,
        required:false
    },
    type:{
        type:Number,
        required:true
    },
    members:{
        type:[
            new Schema({
                id:{
                    type:mongoose.Schema.Types.ObjectId,
                    required:true
                },
                name:{
                    type:String,
                    required:false
                } 
            },{_id:false})
        ],
        required:true
    },
    recent_message:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    }
}));