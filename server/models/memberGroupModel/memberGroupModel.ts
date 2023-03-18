import membersGroups from "../members.group.entity";
import { memberGroupType } from "../../types/memberGroupTypes";
import messegesEntity from "../messeges.entity";
import mongoose from "mongoose";
class membersGroupsCRUD {

    //add friends or groups to database
    async addFriendsOrGroups(membertypes: memberGroupType) {
        return await new membersGroups(membertypes).save();
    }

    //get friends and groups
    async getAllGroupsorFriends(id:string,type:number){
        const data=await membersGroups.find({type:type}).exec();
        return data.filter(e=>e.members.includes(new mongoose.Types.ObjectId(id)));
    }


    //add member in group
    async addMemberinGroup(group_id: string, member_id: string) {
        let member = await membersGroups.findById(group_id);
        member?.members.push(new mongoose.Types.ObjectId(member_id));
        return await membersGroups.findByIdAndUpdate(group_id, { members: member?.members });
    }
    //remove member from group
    async removeMemberFromGroup(group_id: string, member_id: string) {
        let member = await membersGroups.findById(group_id);
        return await membersGroups.findByIdAndUpdate(group_id, { members: member?.members.filter(e => e !== new mongoose.Types.ObjectId(member_id)) });

    }
    //remove a friend and the messeges
    async removeFriend(id: string) {
        await messegesEntity.deleteMany({user:{chatId:id}});
        return await membersGroups.findByIdAndRemove(id);
    }
    //remove a group and its messeges
    async removegroup(id: string) {
        await messegesEntity.deleteMany({user:{chatId:id}});
        return await membersGroups.findByIdAndRemove(id);
    }
}

export default new membersGroupsCRUD();