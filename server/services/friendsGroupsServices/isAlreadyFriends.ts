import getFriendID from "./getFriendID";

export default function(parms:any[],
    members:{
        id:string
        name:string
    }[],
    id:string){
    const isPresent=parms.filter(e=>getFriendID(e.members,id)==getFriendID(members,id));
    if (isPresent.length>0) {
        return true;
    }
    else{
        return false;
    }
}