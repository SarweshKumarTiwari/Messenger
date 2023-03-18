import {Request,Response,NextFunction} from "express";
import password from "../../utils/passwd.encrpt.decrypt";
import usersCRUD from "../../models/userModels/userModels";
import checkandvalidate from "../../services/auth/checkandvalidate";

class UserRegistration{
    //verifies user's parameters like name,email and password
    async verifyUserParams(req:Request,res:Response,next:NextFunction){
        const errors=checkandvalidate(req.body)
        if (errors.length>0) {
            return res.status(400).json({errors:errors})
        }
        next();
    }
    
    //check whether user exists or not
    async checkUserExists(req:Request,res:Response,next:NextFunction){
        try {
            if (await usersCRUD.getUserbyEmail(req.body.email as string)!==null) {
                return res.status(400).json({error:"user already exists"});
            }
            next();
        } catch (error) {
            return res.status(400).json({error:"internal server error"});
        }
    }

    //register user
    async registerUser(req:Request,res:Response){
        try {
            req.body.password= await password.encrypt(req.body.password);
            const data=await usersCRUD.createUser(req.body);
            return res.status(201).json({success:"Successfully registered user",data:data});
        } catch (error) {
            return res.status(400).json({error:"internal server error"});
        }
    }
}

export default new  UserRegistration();