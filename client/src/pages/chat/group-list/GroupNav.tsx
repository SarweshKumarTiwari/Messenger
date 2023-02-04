import React, { useState } from 'react'

export default function GroupNav() {
    const [option, setoption] = useState<boolean>(false);
    const [first, setfirst] = useState<boolean>(false)
    return (
        <>
            <div className="py-2 px-3 relative bg-sky-500 shadow-md border-b border-sky-500 flex flex-row justify-between items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src="http://andressantibanez.com/res/avatar.png" alt='not_fnd' />
                </div>
                <div className="flex">
                    <div className="ml-4 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16" onClick={()=> setfirst(!first)}>
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg>
                    </div>
                    <div className={`ml-4 p-2 ${option && "rounded-full bg-sky-600"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-list" viewBox="0 0 16 16" onClick={() => setoption(!option)}>
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        {option && <div className="pt-3 absolute w-44 h-min mt-3 shadow-md" style={{ "right": "17px", "backgroundColor": "#fff", "borderRadius": "5px" }}>
                            <ul>
                               
                                <li className="px-3 py-3 gray-100 hover:bg-gray-200">Settings</li>
                                <li className="px-3 py-3 gray-100 hover:bg-gray-200">logout</li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
            {first && <div className="ml-1 p-1">
            <div className="flex  rounded-2xl border border-gray-400">
                <input type="text" className="w-full rounded-l-2xl px-2 py-2 text-sm outline-none" placeholder="Search for contact" />
                <div className='m-1 p-1 border border-gray-400 rounded-2xl bg-gray-100' onClick={() => { setfirst(!first) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#9ca3af" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </div>
            </div>
            </div>}
        </>
    )
}
