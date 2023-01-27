import React, { useState } from 'react'

export default function GroupNav() {
    const [option, setoption] = useState<boolean>(false);
    const [first, setfirst] = useState<boolean>(false)
    return (
        <>
            <div className="py-2 px-3 relative bg-gray-200 flex flex-row justify-between items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src="http://andressantibanez.com/res/avatar.png" alt='not_fnd' />
                </div>
                <div className="flex">
                    <div className="ml-4 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                    </div>
                    <div className="ml-4 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
                    </div>
                    <div className={`ml-4 p-2 ${option && "rounded-full bg-gray-300"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={() => setoption(!option)}><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        {option && <div className="pt-3 absolute w-44 h-44 mt-3 shadow-md" style={{ "right": "17px", "backgroundColor": "#fff", "borderRadius": "5px" }}>
                            <ul>
                                <li className="px-3 py-3 gray-100 hover:bg-gray-200" onClick={() => { setfirst(!first); setoption(!option) }}>Add Contact</li>
                                <li className="px-3 py-3 gray-100 hover:bg-gray-200">Settings</li>
                                <li className="px-3 py-3 gray-100 hover:bg-gray-200">logout</li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
            {first && <div className="py-2 px-2 flex bg-gray-200  border border-gray-200">
                <input type="text" className="w-full rounded-l-2xl px-2 py-2 text-sm outline-none" placeholder="Search for contact" />
                <div className='py-2 px-2 rounded-r-2xl bg-white' onClick={()=>{setfirst(!first)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </div>
            </div>}
        </>
    )
}
