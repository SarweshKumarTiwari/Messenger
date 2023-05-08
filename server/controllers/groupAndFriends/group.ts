import { NextFunction, Request, Response } from "express";
import memberGroupModel from "../../models/memberGroupModel/memberGroupModel";
import userModels from "../../models/userModels/userModels";
import validateData from "../../services/friendsGroupsServices/validateData";
import addName from "../../services/friendsGroupsServices/GetFriendsName"
import { memberGroupType } from "../../types/memberGroupTypes";
class GroupController {

    async newGroup(req: Request, res: Response) {
        const errors: string[] = validateData(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors })
        }
        if (req.body.members.length === 0) {
            return res.status(400).json({ error: "members should be in the group" });
        }
        memberGroupModel.addFriendsOrGroups(req.body).then(data => {
            if (data !== undefined) {
                return res.status(201).json({ success: "Added a new friend" })
            }
            return res.status(400).json({ error: "internal server error" })
        }).catch(error => {
            return res.status(400).json({ error: error });
        });
    }
    //check user present
    async isUser(req: Request, res: Response, next: NextFunction) {
        if (!req.body.member.id) {
            return res.status(400).json({ error: "userid not provided" })
        }
        const data=await memberGroupModel.getMemberfromGroup(req.body.groupid);
        const d=data?.members.filter(e=>e.id==req.body.member.id)||[0];
        if(d.length>0){
            return res.status(400).json({error:"This user is already member"})
        }
        next();
    }

    async addGroupmember(req: Request, res: Response) {
        if (!req.body.groupid && !req.body.member.id) {
            return res.status(401).json({ error: "not Provided ids" })
        }
        memberGroupModel.addMemberinGroup(req.body.groupid, req.body.member).then(e => {
            if (!e) {
                return res.status(400).json({ error: "not added any error occured" });
            }
            return res.status(201).json({ success: "Added user successfully" });
        }).catch(e => {
            return res.status(400).json({ error: e })
        })
    }

    async removeGroupmember(req: Request, res: Response) {
        if (!req.body.groupid && !req.body.member_id) {
            return res.status(401).json({ error: "not Provided ids" })
        }
        memberGroupModel.removeMemberFromGroup(req.body.groupid, req.body.member_id).then(e => {
            if (!e) {
                return res.status(400).json({ error: "not added any error occured" });
            }
            return res.status(200).json({ success: "removed user successfully" });
        }).catch(e => {
            console.log(e);
            return res.status(400).json({ error: e })
        })
    }

    async showGroups(req: Request, res: Response) {
        if (!req.body.groupid) {
            return res.status(401).json({ error: "not Provided id" })
        }
        memberGroupModel.getAllGroupsorFriends(req.body.groupid, 1).then(e => {
            if (e.length > 0) {
                return res.status(200).json({ groups: e })
            }
            return res.status(404).json({ error: "groups not found" })
        }).catch(e => res.status(400).json({ error: e }));
    }

    async deleteGroup(req: Request, res: Response) {
        if (!req.params.groupid) {
            return res.status(401).json({ error: "not Provided id" })
        }
        memberGroupModel.removegroup(req.params.groupid).then(doc => {
            if (!doc) {
                return res.status(401).json({ error: "not removed group" });
            }
            return res.status(200).json({ success: "successfully deleted" });
        }).catch(e => res.status(400).json({ error: e }));
    }

    async getAllFriendsAndGroups(req: Request, res: Response) {
        if (!req.body.userid) {
            return res.status(404).json({ error: "no id found" });
        }
        try {
            memberGroupModel.getAllGroupsorFriends(req.body.userid, 1).then(doc => {
                memberGroupModel.getAllGroupsorFriends(req.body.userid, 0).then(e => {
                    if (e.length > 0) {
                        const n: memberGroupType[] = JSON.parse(JSON.stringify(doc))
                        const ele: memberGroupType[] = JSON.parse(JSON.stringify(e))
                        return res.status(200).json({ success: n.concat(addName(ele, req.body.userid)) });
                    }
                    return res.status(200).json({ success: doc });
                })
            })
        }
        catch (e) {
            return res.status(400).json({error:"Some error occured"})
        }
    }
}

export default new GroupController();