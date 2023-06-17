import { memberGroupType } from "../../types/memberGroupTypes";

export default function (data:memberGroupType[],id:string){
    let ids:string[]=[];
    data.forEach(e=>{
        const val=e.members.filter(e=>e.id!==id)[0];
        e.name=val.name;
        ids.push(val.id)
    })
    return {data,ids};
}

export function addProfilepic(data:memberGroupType[],fetched:{profile_pic?:string,_id:any}[]){
    data.forEach((ele,i)=>{
        ele.img=fetched.filter(elm=>ele.members.filter(e=>e.id===elm._id))[0].profile_pic;
    })
    return data;
}