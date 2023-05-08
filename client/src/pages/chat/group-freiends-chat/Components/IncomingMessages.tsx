type incoming = {
    name?: string,
    message?: string,
    image?:string
    date?: { date: string, time: string }
}

export default function IncomingMessages({ name, message, date,image}: incoming) {
    return (
        <div className="flex  mb-2" >
            <div >
                {name && <p className="text-sm px-1 font-medium text-gray-400 text-teal">
                    {name}
                </p>}
                <div className="rounded max-w-fit py-2 px-3 shadow-md" style={{ "backgroundColor": " #F2F2F2" }}>
                {image&& <img src={image} className="border mr-3/4 border-white" style={{maxHeight:"20%",maxWidth:"40%"}} alt="not Found"></img>}
                    <p className="text-sm mt-1">
                        {message}
                    </p>
                    <p className="text-left text-xs text-grey-dark mt-1">
                        {date?.time}
                    </p>
                </div>
            </div>
        </div>
    )
}
