export default function(chats:any,id:string){
    chats.forEach((ele:any)=>{
        if (ele.user?.userId!==id) {
            ele.category=1;
        }
    })
    return chats;
}