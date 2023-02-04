export type users={
    id:string,
    name: string,
    img: string,
    date: string,
    recent_msg: string,
    online?:boolean;
}
export type BubbleBox = {
    category: number
    user?: {
        userId:string
        name?: string
        image?:string
        file?:string
        message?: string
        date: string
    }
    message?: string
}