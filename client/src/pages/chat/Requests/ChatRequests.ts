import axios from "axios";
import { BubbleBox } from "../users";

axios.defaults.withCredentials=true;
const url="http://localhost:4000/chats"

class ChatRequests{
    async getAllChatsOf(data:{groupid:string|undefined,userid:string|undefined}){
        return axios.post(url+"/getchats",data,{
            withCredentials:true
        });
    }

    async sendChat(chat:BubbleBox){
        return axios.post(url+"/addchat",chat,{
            withCredentials:true
        })
    }
}

export default new ChatRequests();