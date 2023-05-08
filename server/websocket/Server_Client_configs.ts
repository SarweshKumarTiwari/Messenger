export interface ServerToClientEmits{
    new_user:(userId:string)=>void,
    new_user_joined:(userId:string)=>void,
    message_sent:(message:{
        userId?:string
        name?: string
        image?:string
        file?:string
        message?: string
        date?:{date:string,time:string}
    })=>void,
    user_disconnected:(userId:string)=>void
}

export interface ClientToServerEmits{
    connected:(userId:string)=>void,
    leave_room:(room_id:string)=>void,
    new_room:(userId:string,room_id:string)=>void,
    send_message:(room_id:string,message:{
        userId?:string
        name?: string
        image?:string
        file?:string
        message?: string
        date?: {date:string,time:string}
    })=>void,
    disconnected:(userId:string)=>void
}

