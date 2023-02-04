import validator from "validator";
export default function (params:{
    name?:string
    email?:string
    password?:string
}) {
    const errors:string[]=[];
    if (!(params.name as string&&params.email as string&&params.password as string)) {
        errors.push("Some fields are empty like name,email,password");
        return errors;
    }
    if (!validator.isEmail(params.email as string)) {
        errors.push("Not a valid email")
    }
    if(!validator.isStrongPassword(params.password as string)){
        errors.push("Password is not strong");
    }
    return errors;
 }