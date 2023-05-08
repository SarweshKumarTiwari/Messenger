export default function getFriendID(
    members:{
        id:string,
        name:string
    }[],
    id:string
){
    return members.filter(e=>e.id!=id)[0].id;
}