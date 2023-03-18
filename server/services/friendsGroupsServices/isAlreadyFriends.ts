export default function(parms:any[],id:string){
    const isPresent=parms.filter(e=>e.members[0]===id);
    if (isPresent.length>0) {
        return true;
    }
    else{
        return false;
    }
}