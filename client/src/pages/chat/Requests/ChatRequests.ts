import axios from "axios";
import { BubbleBox } from "../users";
import url from "../../url"

axios.defaults.withCredentials=true;

class ChatRequests{
    async getAllChatsOf(data:{groupid:string|undefined,userid:string|undefined}){
        return axios.post(url+"/chats/getchats",data,{
            withCredentials:true
        });
    }

    async sendChat(chat:BubbleBox){
        return axios.post(url+"/chats/addchat",chat,{
            withCredentials:true
        })
    }
}

export default new ChatRequests();