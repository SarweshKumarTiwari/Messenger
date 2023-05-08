import { Request,Response } from "express";
import userModels from "../../models/userModels/userModels";

class UserProfile{

    //get all users
    async getAllUsers(req:Request,res:Response){
        if (!req.params.userid) {
            return res.status(400).json({error:"userid not provided"})
        }
        try {
            const data=await userModels.getAllUsers(req.params.userid);
            return res.status(200).json({success:data});
        } catch (error) {
            return res.status(400).json({error:error})
        }
    }
    
}

export default new UserProfile();