import usersmodel from "../user.entity";
import { users,toupdate} from "../../types/user";

class usersCRUD{
    // create new user
    async createUser(user:users){
        const data= new usersmodel(user);
        return await data.save();
    }
    //get user by id
    async getUser(id:string){
        return await usersmodel.findById(id,{password:0,date:0});
    }
    //get user by given parameters
    async getUserbyEmail(email:string){
        const data=await usersmodel.findOne({email:email});
        return data;
    }
    // update the user
    async editOrUpdateUser(id:string,data:toupdate){
        return await usersmodel.findByIdAndUpdate(id,data);
    } 
    //delete user
    async deleteUser(id:string){
        return await usersmodel.findByIdAndDelete(id);
    }
    //get all user
    async getAllUsers(id:string){
        return (await usersmodel.find({_id:{$ne:id}},{password:0,email:0,date:0}));
    }
    //get all users profile by ids
    async getAllUsersByIds(id:string[]){
        return (await usersmodel.find({_id:{$in:id}},{password:0,email:0,date:0,name:0}));
    }
}
export default new usersCRUD();