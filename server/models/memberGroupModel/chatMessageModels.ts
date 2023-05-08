import message from "../messeges.entity";
import { chatmessage } from "../../types/chatMessage";

class Message{
    //Add Chat to list
    async addChat(chat:chatmessage){
        return await new message(chat).save();
    }

    //show chat of a group
    async getChatsOfGroup(groupid:string){
        return await message.find({id:groupid});
    }

    //get chats of a member
    async getChatOfUser(memberid:string){
        return await message.find({user:{userId:memberid}});
    }

    //delete single chat
    async deleteSingleChat(chatid:string){
        return await message.findByIdAndDelete(chatid);
    }

    //delete all chat
    async deleteAllChatOfGroup(groupid:string){
        return await message.deleteMany({id:groupid});
    }
}

export default new Message();