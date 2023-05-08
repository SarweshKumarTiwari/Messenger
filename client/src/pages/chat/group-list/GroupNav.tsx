import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseContext } from '../context/ProviderOfContext';
import GroupFriendList from './GroupFriendList';
import AddFriendsOrGroups from './AddFriendsOrGroups';
import { useMutation } from 'react-query';
import Requests from '../../auth/Requests';
import { authUser } from '../../../AuthUserContext';
import { SocketProvider } from '../../../SocketConfig';
export default function GroupNav() {
    const [option, setoption] = useState<boolean>(false);
    const [type, settype] = useState<0 | 1>(0);
    const [userDisconneted, setuserDisconneted] = useState<string | null>(null);
    const { isSmall } = useContext(UseContext);
    const isAuth = useContext(authUser);
    const socket = useContext(SocketProvider);
    const navigate = useNavigate();

    //logout user request
    const { mutate } = useMutation(Requests.deleteUser, {
        onSuccess: () => {
            isAuth?.setuserData(null);
            socket.emit("disconnected", isAuth?.user_data?.id as string);
            sessionStorage.removeItem("isUserOnline");
        }
    });
    //logout function
    function logout() {
        mutate();
        if (isAuth?.user_data) {
            navigate("/")
        }
    }
    useEffect(() => {
        const fun2 = (userId: string) => {

            ////// removing users from session ////////////////
            const online=JSON.parse(sessionStorage.getItem("isUserOnline")||"[]");
            if (online.length) {
                online.splice(online.indexOf(userId),1);
                sessionStorage.setItem("isUserOnline",JSON.stringify(online));
            }
            //////////////////////////////////////////////////
            
            setuserDisconneted(userId);
        }
        socket.on("user_disconnected", fun2);
        return () => {
            socket.off("user_disconnected", fun2)
        }
    }, [socket])


    return (
        <div className={`w-1/3 border max-md:${isSmall ? "w-0" : "w-full"} h-screen overflow-auto  flex flex-col relative`}>
            <div className="py-2 px-3 relative bg-sky-500 shadow-md border-b border-sky-500 flex flex-row justify-between items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src="http://andressantibanez.com/res/avatar.png" alt='not_fnd' />
                </div>
                <div className="flex" >
                    <div className={`ml-4 p-2 rounded-lg ${type ? "" : "bg-sky-600"} hover:bg-sky-600`} onClick={() => settype(0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-chat-dots" viewBox="0 0 16 16">
                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                        </svg>
                    </div>
                    <div className={`ml-4 p-2 rounded-lg ${!type ? "" : "bg-sky-600"} hover:bg-sky-600`} onClick={() => settype(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg>
                    </div>
                    <div className={`ml-4 p-2 ${option && "rounded-lg bg-sky-600"} rounded-lg hover:bg-sky-600`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-list" viewBox="0 0 16 16" onClick={() => setoption(!option)}>
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        {option && <div className="pt-3 absolute w-44 h-min mt-3 shadow-md" style={{ "right": "17px", "backgroundColor": "#fff", "borderRadius": "5px" }}>
                            <ul>

                                <li className="px-3 py-3 gray-100 hover:bg-gray-200">Settings</li>
                                <li className="px-3 py-3 gray-100 hover:bg-gray-200" onClick={logout}>logout</li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
            {type ? <AddFriendsOrGroups /> : <GroupFriendList disconnectId={userDisconneted} setDisconnectedId={setuserDisconneted}/>}
        </div>
    )
}
