import password from "../../utils/passwd.encrpt.decrypt";
import token from "../../utils/generateAndValidateToken";
import dotenv from "dotenv";
import { users } from "../../types/user";
import { JwtPayload } from "jsonwebtoken";
dotenv.config();
class verifyUsers{
    async verifyUsersCredentials (
        params:
            {
                password: string,
                data: users
            }): Promise<string | null> {
        if (!await password.decrypt(params.password, params.data.password)) {
            return null;
        }
        return token.generateToken({
            id:params.data._id,
            name:params.data.name,
            email:params.data.email
        }, process.env.ACCESS_TOKEN as string);
    }
    async verify_users_token(access_token:string):Promise<string|JwtPayload|undefined|null>{
        try {
            return token.verifyToken(access_token,process.env.ACCESS_TOKEN as string);
        } catch (error) {
            return null;
        }
    }
}
export default new verifyUsers();