import membersGroups from "../members.group.entity";
import { memberGroupType } from "../../types/memberGroupTypes";
import messegesEntity from "../messeges.entity";
class membersGroupsCRUD {

    //add friends or groups to database
    async addFriendsOrGroups(membertypes: memberGroupType) {
        return await new membersGroups(membertypes).save();
    }

    //get friends and groups
    async getAllGroupsorFriends(id:string,type:number){
       return await membersGroups.find({type:type}).find({"members.id":{$eq:id}}).exec();
    }

    //get members in group
    async getMemberfromGroup(groupid:string){
        return await membersGroups.findById(groupid,{members:1,_id:0});
    }
    //add member in group
    async addMemberinGroup(group_id: string, member: string) {
        return await membersGroups
        .findByIdAndUpdate(group_id, {$push:{members:member}});
    }
    //remove member from group
    async removeMemberFromGroup(group_id: string, member_id: string) {
        await messegesEntity.deleteMany({"user.userId":member_id}).where({id:group_id});
        return await membersGroups
        .findByIdAndUpdate(group_id,{$pull:{members:{id:member_id}}});

    }
    //remove a friend and the messeges
    async removeFriend(id: string) {
        await messegesEntity.deleteMany({"user.chatId":id});
        return await membersGroups.findByIdAndRemove(id);
    }
    //remove a group and its messeges
    async removegroup(groupid: string) {
        await messegesEntity.deleteMany({id:groupid});
        return await membersGroups.findByIdAndRemove(groupid);
    }
}

export default new membersGroupsCRUD();