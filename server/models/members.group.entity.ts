import mongoose,{Schema} from "mongoose";

export default mongoose.model("userFriendsandGroups",new Schema({
    name:{
        type:String,
        required:false
    },
    type:{
        type:Number,
        required:true
    },
    members:{
        type:[mongoose.Schema.Types.ObjectId],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
}));