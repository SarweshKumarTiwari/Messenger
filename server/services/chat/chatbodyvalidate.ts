export default function (params:any) {
    const errors:string[]=[];
    if (!params.id) {
        errors.push("Not given id");
    }
    if (params.user&&!params.user.userId) {
        errors.push("Not given userid");
    }
    if (!params.user&&!params.message) {
        errors.push("no message is given");
    }
    return errors;
}