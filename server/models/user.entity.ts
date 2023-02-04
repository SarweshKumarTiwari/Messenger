import mongoose,{Schema} from "mongoose"

//defining users entity
const users:Schema= new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true
    },
    profile_pic:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Users",users);