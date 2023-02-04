import GroupNav from './GroupNav';
import { useState,useContext} from 'react';
import { users } from '../users';
import { UseContext } from '../context/ProviderOfContext';
export default function GroupFriendList() {
    const lst: users[] = [
        {
            id:"1",
            name: "Andrew Wade",
            img: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
            date:"12:25 pm",
            recent_msg:"How are You Dude"
        },
        {
            id:"2",
            name: "Mathew Wade",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
            date:"12:25 pm",
            recent_msg:"How are You Dude"
        },
        {
            id:"3",
            name: "Bhuwneshwar Kumar",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
            date:"12:25 pm",
            recent_msg:"How are You Dude"
        },
        {
            id:"4",
            name: "M.S Dhoni",
            img: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
            date:"12:25 pm",
            recent_msg:"How are You Dude"
        },
        {
            id:"5",
            name: "Virat Kohli",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5",
            date:"12:25 pm",
            recent_msg:"How are You Dude"
        },
        {
            id:"6",
            name: "Rohit Sharma",
            img: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
            date:"12:25 pm",
            recent_msg:"How are You Dude"
        },
        {
            id:"7",
            name: "Jaspreet Bumrah",
            img: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
            date:"12:25 pm",
            recent_msg:"How are You Dude"
        }
    ];
    const {callback}= useContext(UseContext);
    const [profile] = useState<users[]>(lst);
    const [first, setfirst] = useState("");
    const filteredNames=profile.filter(e=>e.name.toLowerCase().includes(first.toLowerCase()));
    
    return (
        <div className={`w-1/3 border max-md:w-screen overflow-auto  flex flex-col`}>
            <GroupNav />
            <div className="py-2 px-2 flex border border-gray-200">
                <div className='py-2 px-2 rounded-l-2xl bg-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#9ca3af" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                </div>
                <input type="text" className="w-full px-2 py-2 rounded-r-2xl text-sm text-gray-600 bg-gray-100 placeholder-gray-400 outline-none" value={first}  onChange={e=>setfirst(e.target.value)} placeholder="Search or start new chat" />
            </div>
            <div className=" flex-1 overflow-auto">
                {filteredNames.length?filteredNames.map((e:users)=><div className="px-3 flex items-center hover:bg-gray-200 cursor-pointer" key={e.id} onClick={()=>callback(e)} >
                    <div className='relative'>
                        <img className="h-12 w-12 rounded-full"
                            src={e.img} alt='not_fnd' />
                        <div className="absolute bg-sky-400 bottom-0 right-0 rounded-full" style={{"minWidth":"10px","minHeight":"10px"}}></div>
                    </div>
                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                        <div className="flex items-bottom justify-between">
                            <p className="text-gray-800">
                                {e.name}
                            </p>
                            <p className="text-xs text-gray-800">
                                {e.date}
                            </p>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">
                           {e.recent_msg}
                        </p>
                    </div>
                </div>):
                <div className='text-center m-4 p-2'>Not Found</div>
                }
            </div>
        </div>
    )
}
