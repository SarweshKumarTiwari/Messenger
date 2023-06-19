import axios from "axios";
import { member } from "../users";
import baseurl from "../../url"

axios.defaults.withCredentials=true;

const url=baseurl+"/groups"
const url1=baseurl+"/friends"
class groupRequests{
    async getGroupsAndFriends(userid:string){
        return axios.post(url+"/getfriendsandgroups",
        {
            userid:userid
        },
        {
            withCredentials:true
        });
    }

    async addGroup(data:{name:string,members:member[]}){
        return axios.post(url+"/addgroup",{
            ...data,
            type:1
        },{withCredentials:true});
    }

    async addMember(data:{groupid:string,member:member}){
        return axios.put(url+"/addmember",data,{
            withCredentials:true
        });
    }

    async removeMember(data:{groupid:string,member_id:string}){
        return axios.put(url+"/removemember",data,{
            withCredentials:true
        });
    }

    async removeGroup(groupid:string){
        return axios.delete(url+"/removegroups/"+groupid,{
            withCredentials:true
        })
    }
}

class friendRequests{

    async addFriend(data:{members:member[],id:string}){
        return axios.post(url1+"/add",{
            id:data.id,
            type:0,
            members:data.members
        },{withCredentials:true});
    }

    async getAllFriends(userid:string){
        return axios.post(url1+"/getfriends",{
            userid:userid
        },{withCredentials:true})
    }

    async deleteFriend(groupid:string){
        return axios.delete(url1+"/delete/"+groupid,{
            withCredentials:true
        })
    }
}
const FriendRequests=new friendRequests();
const GroupRequests=new groupRequests();

export  {GroupRequests,FriendRequests};