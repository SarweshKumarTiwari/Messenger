import { Request,Response,NextFunction} from "express";
import chatMessage from "../../models/memberGroupModel/chatMessageModels";
import userModels from "../../models/userModels/userModels";
import chatbodyvalidate from "../../services/chat/chatbodyvalidate";
import extractUsersChat from "../../services/chat/extractUsersChat";

class chatMessageController{
    //validate user
    async isUser(req:Request,res:Response,next:NextFunction){
        const errors=chatbodyvalidate(req.body);
        if (errors.length>0) {
            return res.status(400).json({error:errors})
        }
        userModels.getUser(req.body.user.userId).then(doc=>{
            if (doc===null) {
                return res.status(400).json({error:"member not present"});
            }
            next();
        })
        .catch(e=>{
            console.log(e);
            return res.status(500).json({error:"internal server error"})})
    }

    //adding chat by validating data
    async addChatMessage(req:Request,res:Response){
        chatMessage.addChat(req.body).then(doc=>{
            if (doc!==undefined) {
                return res.status(201).json({success:"added chat succesfully"});
            }
            return res.status(500).json({error:"Some error occured"});
        }).catch(e=>res.status(500).json({error:e}));
    }

    //get chat of groups and identify the authorised user's chat
    async getUsersChat(req:Request,res:Response) {
        if (!req.body.groupid||!req.body.userid) {
            return res.status(400).json({error:"no group id or user id provided"});
        }
        chatMessage.getChatsOfGroup(req.body.groupid).then(doc=>{
            if (doc.length>0) {
                const d=extractUsersChat(doc,req.body.userid);
                if (d.length>0) {  
                    return res.status(200).json({success:d})
                }
                else{return res.status(200).json({success:d})}
            }
            return res.status(200).json({success:doc});
        }).catch(e=>res.status(500).json({error:"internal server error"}));
    }

    //delete single chat
    async deleteChatMessage(req:Request,res:Response){
        if (!req.params.chatid) {
            return res.status(400).json({error:"chatId is not available"});
        }
        chatMessage.deleteSingleChat(req.params.chatid).then(doc=>{
            if (doc===null) {
                return res.status(404).json({error:"Not found"});
            }
            return res.status(200).json({success:"deleted chat successfully"});
        }).catch(e=>res.status(500).json({error:"internal server error"}));
    }

    //delete chat of a group
    async deleteChatOfGroup(req:Request,res:Response){
        if (!req.params.groupid) {
            return res.status(400).json({error:"group id not given"})
        }
        chatMessage.deleteAllChatOfGroup(req.params.groupid).then(doc=>{
            if (doc===null) {
                return res.status(404).json({error:"Not found"});
            }
            return res.status(200).json({success:"deleted chat successfully"});
        }).catch(e=>res.status(500).json({error:"internal server error"}));
    }
}

export default new chatMessageController();