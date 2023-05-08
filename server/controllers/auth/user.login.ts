import { NextFunction, Request, Response } from "express";
import userModels from "../../models/userModels/userModels";
import verifyUser from "../../services/auth/verifyUser";

class AuthController {
    //Login user algorithm
    async getUsersCredentials(req: Request, res: Response) {
        try {
            if (!(req.body.email && req.body.password)) {
                return res.status(404).json({ error: "some fields are empty" });
            }
            const user = await userModels.getUserbyEmail(req.body.email);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            verifyUser.verifyUsersCredentials(
                {
                    password: req.body.password,
                    data: {
                        _id: user._id as string,
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                }).then(data => {
                    if (!data) {
                        return res.status(400).json({ error: "not valid credentials" });
                    }
                    return res.status(200).cookie(
                        "Access_Token",
                        data,
                        {
                            httpOnly:true,
                            sameSite:"strict",
                            secure:true
                        }
                    )
                    .json({ Success: "logged in successfully"});

                })
        }
        catch (error) {
            console.log(error);
        }
    }
    //authorise user by verifying token
    async authoriseuser(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.cookies.Access_Token) {
                return res.status(400).json({ error: "user not authorised" })
            }
            verifyUser.verify_users_token(req.cookies.Access_Token).then(payload=>{
                if (!payload) {
                    return res.status(400).json({error:"user not authorised or in valid token"})
                }
                req.body.user_data=payload;
                next();
            }).catch(err=>{
                console.log(err);
            })
        }
        catch(error){
            console.log(error);
        }
    }
    async logout(req:Request,res:Response){
        return res.status(200).clearCookie("Access_Token",{
            httpOnly:true,
            sameSite:"strict",
            secure:true
        }).json({success:"logged out successFully"});
    }
    async getdataOfAuthorisedUser(req:Request,res: Response){
        return res.status(200).json(req.body);
    }
}

export default new AuthController();