export type chatmessage={
    id:string
    category:number
    user?:{
        userid:string
        name?:string
        image?:string
        message?:string
    }
    message?:string
}