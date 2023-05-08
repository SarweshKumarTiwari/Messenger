import { memberGroupType } from "../../types/memberGroupTypes";

export default function (data:memberGroupType[],id:string){
    data.forEach(e=>{
        e.name=e.members.filter(e=>e.id!==id)[0].name;
    })
    return data;
}