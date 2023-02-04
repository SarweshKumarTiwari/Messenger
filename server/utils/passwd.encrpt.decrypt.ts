import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

class password{
    //getting server defined salt
    private salt:string=process.env.ENCRYPTION_SALT as string||"";

    //encryption of given password
    async encrypt(password:string):Promise<string> {
        password=password+this.salt;
        password=await bcrypt.hash(password,8) as string
        return password;
    }

    //decryption of password
    async decrypt(givenPassword:string,password:string):Promise<boolean>{
        givenPassword=givenPassword+this.salt;
        return await bcrypt.compare(givenPassword,password) as boolean;
    }
}

export default new password();