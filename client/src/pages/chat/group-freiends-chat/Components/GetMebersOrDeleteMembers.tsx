import { useMutation } from 'react-query';
import { GroupRequests } from '../../Requests/GroupFriendRequests';
import { AxiosError } from 'axios';
import { useState, useContext } from "react"
import { UseContext } from '../../context/ProviderOfContext';

type cb = {
    callbackFn: () => void
}

export default function GetMembersOrDeleteMembers({ callbackFn }: cb) {
    const { data,callback } = useContext(UseContext);
    const [first, setfirst] = useState("");
    const v = [{ name: "", id: "" }]
    const filteredUser = data?.members || v.filter(e => e.name.toLowerCase().includes(first.toLowerCase()));



    //adding member to group
    const addNewMember = useMutation({
        mutationKey: ["updating_member"],
        mutationFn: GroupRequests.removeMember,
        onSuccess: () => {
            alert("succesfully deleted member")
        },
        onError: (e: AxiosError) => {
            alert("some error occured");
        }
    })
    return (
        <div className="absolute  mt-3 shadow-md h-96 w-80 max-md:h-screen max-md:w-screen max-md:right-0 max-md:mt-0 rounded-lg right-10 bg-white ">
            <div className=" p-2 flex flex-row-reverse" onClick={callbackFn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#94a3b8" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
            </div>
            <div className="flex m-2 ">
                <div className='py-2 px-2 rounded-l-2xl bg-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#9ca3af" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                </div>
                <input type="text" className="w-full px-2 py-2 rounded-r-2xl text-sm text-gray-600 bg-gray-100 placeholder-gray-400 outline-none" value={first} onChange={e => setfirst(e.target.value)} placeholder="Search or start new chat" />
            </div>
            <div className='overflow-auto h-3/4'>
                {
                    filteredUser.length ?
                        filteredUser.map(e =>
                            <div className="  px-3 flex items-center  hover:bg-gray-200 cursor-pointer" key={e.id}>
                                <div>
                                    <img className="h-12 w-12 rounded-full max-md:h-min max-min"
                                        src="https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png" alt='not_fnd' />
                                </div>
                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4 max-md:py-2">
                                    <div className="flex items-bottom justify-between">
                                        <p className="text-gray-800 max-md:text-md">
                                            {e.name}
                                        </p>
                                        <button className=' p-2 '
                                            onClick={() => addNewMember.mutate(
                                                {
                                                    groupid: data?._id as string,
                                                    member_id: e.id
                                                },{
                                                    onSuccess:()=>{
                                                        data?.members?.forEach((ele,i)=>{
                                                            if (ele.id===e.id) {
                                                                data.members?.splice(i,1);
                                                            }
                                                        });
                                                        callback(data);
                                                    }
                                                }
                                            )}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red"  viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1Zm0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <div>not found </div>
                }
            </div>
        </div>
    )
}
