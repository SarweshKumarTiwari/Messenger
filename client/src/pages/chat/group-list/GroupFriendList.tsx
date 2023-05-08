import React, { useState, useContext, useEffect } from 'react';
import { groups } from '../users';
import { UseContext } from '../context/ProviderOfContext';
import { useQuery } from 'react-query';
import { GroupRequests } from '../Requests/GroupFriendRequests';
import { authUser } from '../../../AuthUserContext';
import { SocketProvider } from '../../../SocketConfig';

type propType = {
    disconnectId: string | null;
    setDisconnectedId: React.Dispatch<React.SetStateAction<string | null>>
}
export default function GroupFriendList({ disconnectId, setDisconnectedId }: propType) {
    const { callback, setSmall } = useContext(UseContext);
    const isAuth = useContext(authUser);
    const [profile, setprofile] = useState<groups[]>([]);
    const [first, setfirst] = useState("");
    const [isUserOnline, setisUserOnline] = useState<string[]>(JSON.parse(sessionStorage.getItem("isUserOnline") || "[]"));
    const socket = useContext(SocketProvider);

    const filteredNames = profile.filter(e => e.name.toLowerCase().includes(first.toLowerCase()));

    //getting all friends and groups
    const { isLoading } = useQuery({
        queryKey: ["get_friends"],
        queryFn: () => GroupRequests.getGroupsAndFriends(isAuth?.user_data?.id as string),
        retry: false,

        onSuccess: (data) => {
            setprofile(data.data.success);
        },
    });

    //Is user online
    function online(members: { name?: string, id: string }[] | undefined) {
        if (!members) {
            return 0;
        }
        const l = isUserOnline.filter(e => members.filter(ele => ele.id === e)[0]);
        return l.length;
    }
    useEffect(() => {
        if (disconnectId) {
            setisUserOnline(prev => {
                prev.splice(prev.indexOf(disconnectId), 1);
                setDisconnectedId(null);
                return prev;
            })
        }

        //if new user then emit otherwise return as it is
        const fun = (userId: string) => {
            setisUserOnline(prevState => {
                if (prevState.includes(userId) || (isAuth?.user_data?.id as string === userId)) {
                    return prevState;
                }

                //////// storing sessions to refresh users //////////////
                socket.emit("connected", isAuth?.user_data?.id as string);
                const online = JSON.parse(sessionStorage.getItem("isUserOnline") || "[]");
                if (!online.includes(userId)) {
                    online.push(userId);
                }
                sessionStorage.setItem("isUserOnline",JSON.stringify(online));

                /////////////////////////////////////////////////////////////////

                return [...prevState, userId];
            })
        }
        //on user connected
        socket.on("new_user", fun)
        return () => {
            socket.off("new_user", fun)
        }
    }, [disconnectId, isAuth?.user_data?.id, setDisconnectedId, socket])
    if (isLoading) {
        return <div>loading...</div>
    }
    return (
        <>
            <div className="py-2 px-2 flex border border-gray-200">
                <div className='py-2 px-2 rounded-l-2xl bg-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#9ca3af" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                </div>
                <input type="text" className="w-full px-2 py-2 rounded-r-2xl text-sm text-gray-600 bg-gray-100 placeholder-gray-400 outline-none" value={first} onChange={e => setfirst(e.target.value)} placeholder="Search or start new chat" />
            </div>
            <div className=" flex-1 overflow-auto">
                {filteredNames.length ? filteredNames.map((e: groups) => <div className="px-3 flex items-center hover:bg-gray-200 cursor-pointer" key={e._id} onClick={() => { callback(e, isAuth?.user_data?.id); setSmall() }} >
                    <div className='relative'>
                        <img className="h-12 w-12 rounded-full"
                            src={e.img ? e.img : "https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png"} alt='not_fnd' />
                        {online(e.members) && !e.type ? <div className="absolute bg-sky-400 bottom-0 right-0 rounded-full" style={{ "minWidth": "10px", "minHeight": "10px" }}></div> : null}
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
                </div>) :
                    <div className='text-center m-4 p-2'>Not Found</div>
                }
            </div>
        </>
    )
}
