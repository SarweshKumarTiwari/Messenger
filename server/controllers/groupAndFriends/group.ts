import {Request,Response} from "express";
import memberGroupModel from "../../models/memberGroupModel/memberGroupModel";
import validateData from "../../services/friendsGroupsServices/validateData";
class GroupController{

    async newGroup(req:Request,res:Response){
        const errors:string[]=validateData(req.body);
        if (errors.length>0) {
            return res.status(400).json({errors:errors})
        }
        if(req.body.members.length===0){
            return res.status(400).json({error:"members should be in the group"});
        }
        memberGroupModel.addFriendsOrGroups(req.body).then(data=>{
            if (data!==undefined) {
                return res.status(201).json({success:"Added a new friend"})
            }
            return res.status(400).json({error:"internal server error"})
        }).catch(error=>{
            return res.status(400).json({error:error});
        });
    }

    async addGroupmember(req:Request,res:Response){
        if (!req.body.id && !req.body.member_id) {
            return res.status(401).json({error:"not Provided ids"})
        }
        memberGroupModel.addMemberinGroup(req.body.id,req.body.member_id).then(e=>{
            if(!e){
                return res.status(400).json({error:"not added any error occured"});
            }
            return res.status(201).json({success:"Added user successfully"});
        }).catch(e=>{
            return res.status(400).json({error:e})
        })
    }

    async removeGroupmember(req:Request,res:Response){
        if (!req.body.id && !req.body.member_id) {
            return res.status(401).json({error:"not Provided ids"})
        }
        memberGroupModel.removeMemberFromGroup(req.body.id,req.body.member_id).then(e=>{
            if(!e){
                return res.status(400).json({error:"not added any error occured"});
            }
            return res.status(201).json({success:"Added user successfully"});
        }).catch(e=>{
            return res.status(400).json({error:e})
        })
    }

    async showGroups(req:Request,res:Response){
        if (!req.body.id) {
            return res.status(401).json({error:"not Provided id"})
        }
        memberGroupModel.getAllGroupsorFriends(req.body.id,1).then(e=>{
            if (e.length>0) {
                return res.status(200).json({groups:e})
            }
            return res.status(404).json({error:"groups not found"})
        }).catch(e=>res.status(400).json({error:e}));
    }

    async deleteGroup(req:Request,res:Response){
        if (!req.body.id) {
            return res.status(401).json({error:"not Provided id"})
        }
        memberGroupModel.removegroup(req.body.id).then(doc=>{
            if(!doc){
                return res.status(401).json({error:"not removed group"});
            }
            return res.status(200).json({success:"successfully deleted"});
        }).catch(e=>res.status(400).json({error:e}));
    }

    async getAllFriendsAndGroups(req:Request,res:Response){
        if (!req.body.id) {
            return res.status(404).json({error:"no id found"});
        }
        memberGroupModel.getAllGroupsorFriends(req.body.id,1).then(doc=>{
            if (doc.length>0) {
                memberGroupModel.getAllGroupsorFriends(req.body.id,0).then(e=>{
                    if (e.length>0) {
                        return res.status(200).json({success:doc.concat(e)});
                    }
                    return res.status(404).json({error:"Not Found"})
                })
            }
            else{
                return res.status(404).json({error:"Not Found"})
            }
        })
    }
}

export default new GroupController();