import { NextFunction, Request,Response } from "express";
import validateData from "../../services/friendsGroupsServices/validateData";
import membergroupModel from "../../models/memberGroupModel/memberGroupModel";
import userModels from "../../models/userModels/userModels";
import addName from "../../services/friendsGroupsServices/GetFriendsName";
import isAlreadyFriends from "../../services/friendsGroupsServices/isAlreadyFriends";
import getFriendID from "../../services/friendsGroupsServices/getFriendID";

class Friends{
    async checkisnotPresent(req:Request,res:Response,next:NextFunction){
        const errors=validateData(req.body);
        if (errors.length>0) {
            return res.status(401).json({error:errors});
        }
        userModels.getUser(getFriendID(req.body.members,req.body.id)).then(value=>{
            if (!value) {
                return res.status(404).json({error:"not found any user"});
            }
            next();
        })
    }
    async checkisFriendAlready(req:Request,res:Response,next:NextFunction){
        membergroupModel.getAllGroupsorFriends(req.body.id,0).then(value=>{
            if(isAlreadyFriends(value,req.body.members,req.body.id)){
                return res.status(400).json({error:"this user is already your friend"})
            }
            next();
        })
    }
    async add(req:Request,res:Response){
        if (req.body.id) {
            req.body.id=undefined;
        }
        membergroupModel.addFriendsOrGroups(req.body).then(data=>{
            if (data!==undefined) {
                return res.status(201).json({success:"Added a new friend"})
            }
            return res.status(400).json({error:"internal server error"})
        }).catch(err=>{
            console.log(err);
        })
    }
    async getFriends(req:Request,res:Response){
        if (!req.body.userid) {
            return res.status(400).json({error:"some field is empty"});
        }
        membergroupModel.getAllGroupsorFriends(req.body.userid,0).then(e=>{
            if (e.length>0) {
                const result=JSON.parse(JSON.stringify(e));
                return res.status(200).json({success:addName(result,req.body.userid)});
            }
            return res.status(400).json({error:"some error occured"})
        }).catch(e=>res.status(400).json({error:e}))
    }
    async delete(req:Request,res:Response){
        membergroupModel.removegroup(req.params.groupid).then(data=>{
            if (data!==null) {
                return res.status(201).json({success:"deleted friend"})
            }
            return res.status(400).json({error:"internal server error"})
        }).catch(err=>{
            console.log(err);
        })
    }
}
export default new Friends();