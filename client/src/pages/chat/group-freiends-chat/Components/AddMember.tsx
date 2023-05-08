import { useMutation, useQuery } from 'react-query';
import { GroupRequests } from '../../Requests/GroupFriendRequests';
import axios, { AxiosError } from 'axios';
import { authUser } from '../../../../AuthUserContext';
import { useState, useContext } from "react"
import { UseContext } from '../../context/ProviderOfContext';

type cb={
    callbackFn:()=>void
}

export default function AddMember({callbackFn}:cb) {
    const { data,callback} = useContext(UseContext);
    const isAuth = useContext(authUser);
    const [first, setfirst] = useState("");
    const [user, setuser] = useState<{ _id: string, name: string, profile_pic: string }[]>([]);
    const filteredUser = user.filter(e => e.name.toLowerCase().includes(first.toLowerCase()));

    //showing all users in list
    useQuery({
        queryKey: ["get_all_users"],
        queryFn: () => axios.get("http://localhost:4000/auth/getallusers/" + isAuth?.user_data?.id as string,
            {
                withCredentials: true
            }),
        onSuccess: (result) => {
            setuser(result.data.success);
        }
    })

    //adding member to group
    const addNewMember = useMutation({
        mutationKey: ["updating_member"],
        mutationFn: GroupRequests.addMember,
        onSuccess: () => {
            alert("succesfully added member")
        },
        onError: (e: AxiosError) => {
            alert("may be a user of your group");
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
                            <div className="  px-3 flex items-center  hover:bg-gray-200 cursor-pointer" key={e._id}>
                                <div>
                                    <img className="h-12 w-12 rounded-full max-md:h-min max-min"
                                        src={e.profile_pic ? e.profile_pic : "https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png"} alt='not_fnd' />
                                </div>
                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4 max-md:py-2">
                                    <div className="flex items-bottom justify-between">
                                        <p className="text-gray-800 max-md:text-md">
                                            {e.name}
                                        </p>
                                        <button className='rounded-lg p-2 bg-sky-500 hover:bg-sky-600'
                                            onClick={() => addNewMember.mutate(
                                                {
                                                    groupid: data?._id as string,
                                                    member: {
                                                        id: e._id,
                                                        name: e.name
                                                    }
                                                },{
                                                    onSuccess:()=>{
                                                        data?.members?.push({
                                                            id:e._id,
                                                            name:e.name
                                                        });
                                                        callback(data);
                                                    }
                                                }
                                            )}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
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
