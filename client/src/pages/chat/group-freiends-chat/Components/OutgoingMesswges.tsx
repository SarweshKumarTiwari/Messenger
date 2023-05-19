type message={
    message:string,
    date?:{date:string,time:string},
    image?:string
}
export default function OutgoingMesswges({message,date,image}:message) {
  return (
    <div className="flex justify-end mb-2">
                            <div className="rounded bg-sky-400 shadow-md shadow-gray-300 py-2 px-3 " style={{"maxHeight":"20%" ,"maxWidth":"50%"}}>
                                {image&& <img src={image} className="border border-white" style={{"margin":"0px"}} alt="not Found"></img>}
                                <p className="text-sm text-white mt-1">
                                    {message}
                                </p>
                                <p className="text-right text-xs text-white mt-1">
                                    {date?.time}
                                </p>
                            </div>
                        </div>
  )
}
