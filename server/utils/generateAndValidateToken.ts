import jwt,{ JwtPayload, SignOptions} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// All token related queries
class token{

    //generate token 
    generateToken(payload:JwtPayload,secret:string,timelimit?:SignOptions):string{
        return jwt.sign(payload,secret,timelimit)
    }

    //verify token
    verifyToken(token:string,secret:string){
        try {
            return jwt.verify(token,secret);
        } catch (error) {
            return null;
        }
        
    }

}
export default new token();