export type groups={
    _id:string,
    name: string,
    type?:0|1
    members?:{
        id:string
        name?:string
    }[]
    img?: string,
    date?: string,
    recent_msg?: string,
    online?:boolean;
}
export type BubbleBox = {
    _id?:string
    id?:string
    category: number
    user?: {
        userId?:string
        name?: string
        image?:string
        file?:string
        message?: string
        date?: {date:string,time:string}
    }
    message?: string
} 
export type member={
    name?:string
    id:string
}