import { useState, useContext } from 'react';
import { UseContext } from '../context/ProviderOfContext';
import { useMutation, useQuery } from 'react-query';
import { authUser } from '../../../AuthUserContext';
import axios, { AxiosError } from 'axios';
import { FriendRequests, GroupRequests } from '../Requests/GroupFriendRequests';
import { member } from '../users';

type users = {
    _id: string,
    name: string,
    profile_pic?: string
}
export default function GroupFriendList() {
    const { setSmall } = useContext(UseContext);
    const isAuth = useContext(authUser);
    const [profile, setprofile] = useState<users[]>([]);
    const [groupon, setgroupon] = useState(false);
    const [first, setfirst] = useState("");
    const filteredNames = profile.filter(e => e.name.toLowerCase().includes(first.toLowerCase()));

    //fetching users
    const { isLoading } = useQuery({
        queryKey: ["get_friends"],
        queryFn: () => axios.get("http://localhost:4000/auth/getallusers/" + isAuth?.user_data?.id as string,
            {
                withCredentials: true
            }),
        retry: false,
        onSuccess: (data) => {
            setprofile(data.data.success);
        }
    });

    //adding friends
    const addFriend = useMutation({
        mutationFn: FriendRequests.addFriend,
        onSuccess: () => {
            alert("successfully added friend");
        },
        onError: (error: AxiosError) => {
        }
    })

    //adding group
    const addGroup = useMutation({
        mutationFn: GroupRequests.addGroup,
        onSuccess: () => {
            alert("successfully added group");
        },
        onError: (error: AxiosError) => {
            console.log(error);
        }
    })

    //handling multiple  Checkboxes using vanilla
    function onGroupAdd() {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const membersInfo: member[] = [{
            id: isAuth?.user_data?.id as string,
            name: isAuth?.user_data?.name as string
        }];
        document.getElementById("checkboxes")?.querySelectorAll('input').forEach(e => {
            if (e.checked) {
                membersInfo.push(JSON.parse(e.value));
            }
        });
        if (!name) {
            return;
        }
        if (membersInfo.length > 1) {
            addGroup.mutate({ name: name, members: membersInfo });
        }
    }
    if (isLoading) {
        return <div>loading...</div>
    }
    return (
        <>
            
            {groupon && <div className="py-2 px-2 flex border border-gray-200">
                <input type="text" id="name" className="w-full px-2 py-2 rounded-r-2xl text-sm text-gray-600 bg-gray-100 placeholder-gray-400 outline-none" placeholder="Enter name of your group and add" />
                <button className="ml-1 p-2 rounded-full bg-sky-500 text-white text-sm hover:bg-sky-600" onClick={onGroupAdd}>Add</button>
            </div>}
            <div className="py-2 px-2 flex border border-gray-200">
                <div className='py-2 px-2 rounded-l-2xl bg-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#9ca3af" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                </div>
                <input type="text" className="w-full px-2 py-2 rounded-r-2xl text-sm text-gray-600 bg-gray-100 placeholder-gray-400 outline-none" value={first} onChange={e => setfirst(e.target.value)} placeholder="Search or start new chat" />
                <button className="ml-1 p-2 rounded-full bg-sky-500 text-white text-sm hover:bg-sky-500" onClick={() => setgroupon(!groupon)}>Group</button>
            </div>
            <div className="flex-1 overflow-auto " id="checkboxes">
                {filteredNames.length ? filteredNames.map((e: users) => 
                <div className="px-3 flex items-center hover:bg-gray-200 cursor-pointer" key={e._id} onClick={() => setSmall()}>
                    <div>
                        <img className="h-12 w-12 rounded-full"
                            src={e.profile_pic ? e.profile_pic : "https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png"} alt='not_fnd' />
                    </div>
                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                        <div className="flex items-bottom justify-between">
                            <p className="text-gray-800">
                                {e.name}
                            </p>
                            <div>
                                {!groupon ?
                                    <button onClick={() => {
                                        addFriend.mutate({members:[
                                            {
                                                id: isAuth?.user_data?.id as string,
                                                name: isAuth?.user_data?.name
                                            },
                                            {
                                                id: e._id,
                                                name: e.name
                                            }
                                        ],id:isAuth?.user_data?.id as string})
                                    }} className='rounded-lg p-2 bg-sky-500 hover:bg-sky-600'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                        </svg>
                                    </button> :
                                    <input id="react-checkbox" name="person" type="checkbox" value={JSON.stringify({ id: e._id, name: e.name })} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>}
                            </div>
                        </div>
                    </div>
                </div>) :
                    <div className='text-center m-4 p-2'>Not Found</div>
                }
            </div>
        </>
    )
}
