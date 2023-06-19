import axios from "axios";
import url from '../url';

axios.defaults.withCredentials=true;


type formData = {
        error?: string
        name?: string
        email: string
        password: string
}

type toUpdate={
    id:string,
    name?:string,
    profile_pic?:string
}
console.log(url)
class Requests{
    async registerUser(data:formData){
        return await axios.post(url+"/auth/register",data,{
            withCredentials:true
        });
    }
    async update(newUpdate:toUpdate){
        return await axios.post(url+"/auth/updatepic",newUpdate,{
            withCredentials:true
        })
    }
    async loginUser(data:formData){
        return await axios.post(url+"/auth/login",data,{
            withCredentials:true
        });
    }

    async getUser(){
        return await axios.get(url+"/auth/authorise_user",{
            withCredentials:true
        });
    }

    async deleteUser(){
        return await axios.delete(url+"/auth/logout",{
            withCredentials:true
        })
    }

    async getUserById(id:string){
        return await axios.get(url+"/auth/getuser/"+id,{
            withCredentials:true
        })
    }
}

export default new Requests();