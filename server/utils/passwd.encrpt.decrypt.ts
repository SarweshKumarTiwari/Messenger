import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

class password{

    //encryption of given password
    async encrypt(password:string):Promise<string> {
        password=await bcrypt.hash(password,8) as string
        return password;
    }

    //decryption of password
    async decrypt(givenPassword:string,password:string):Promise<boolean>{
        return await bcrypt.compare(givenPassword,password) as boolean;
    }
}

export default new password();