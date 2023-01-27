export type users={
    id:number,
    name: string,
    img: string,
    date: string,
    recent_msg: string
}
export type BubbleBox = {
    category: number
    user?: {
        name?: string
        image?:string
        file?:string
        message?: string
        date: string
    }
    message?: string
}