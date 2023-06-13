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
    //get user by id 
    async getUserById(req:Request,res:Response){
        if (!req.params.id) {
            return res.json({error:"id not found"})
        }
        try {
            return res.status(200).json({success:await userModels.getUser(req.params.id)})    
        } catch (error) {
            return res.status(400).json({error:error})
        }
    }
    //update profile pic
    async updateProfilePic(req:Request,res:Response){
        if (!req.body.id) {
            return res.status(400).json({error:"id not provided"});
        }
        try {
            const data=await userModels.editOrUpdateUser(req.body.id,{profile_pic:req.body.profile_pic})
            return res.status(200).json({success:"added profile pic"})
        } catch (error) {
            return res.status(400).json({error:error});
        }
    }
    
}

export default new UserProfile();