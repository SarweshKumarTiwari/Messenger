type incoming = {
    name?: string,
    message?: string,
    image?: string
    date?: { date: string, time: string }
}

export default function IncomingMessages({ name, message, date, image }: incoming) {
    return (
        <div className="flex  mb-2" >
            <div >
                {name && <p className="text-sm px-1 font-medium text-gray-400 text-teal">
                    {name}
                </p>}
                {image ?<div className="rounded bg-sky-400 shadow-md max-h-1/2 w-1/2 shadow-gray-300 py-2 px-3 " style={{backgroundColor:"#F2F2F2"}}>
                                {image&& <img src={image} className="border h-full w-full border-white" style={{"margin":"0px"}} alt="not Found"></img>}
                                <p className="text-right text-xs  mt-1">
                                    {date?.time}
                                </p>
                            </div>:
                <div className="rounded max-w-fit py-2 px-3 shadow-md" style={{ "backgroundColor": " #F2F2F2" }}>
                    <p className="text-sm mt-1">
                        {message}
                    </p>
                    
                </div>}
            </div>
        </div>
    )
}
