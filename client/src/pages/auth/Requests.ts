import axios from "axios";

axios.defaults.withCredentials=true;
const url:string="http://localhost:4000";
type formData = {
        error?: string
        name?: string
        email: string
        password: string
}

class Requests{
    async registerUser(data:formData){
        return await axios.post(url+"/auth/register",data,{
            withCredentials:true
        });
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
}

export default new Requests();