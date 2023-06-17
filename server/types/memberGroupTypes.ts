export  type memberGroupType={
    name?:string
    img?:string
    members:{
        name?:string
        id:string
    }[]
    recent_message?:string
    type:0|1
}