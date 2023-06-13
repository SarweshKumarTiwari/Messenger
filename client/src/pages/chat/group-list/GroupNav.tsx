import { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseContext } from '../context/ProviderOfContext';
import GroupFriendList from './GroupFriendList';
import AddFriendsOrGroups from './AddFriendsOrGroups';
import { useMutation, useQuery } from 'react-query';
import Requests from '../../auth/Requests';
import { authUser } from '../../../AuthUserContext';
import { SocketProvider } from '../../../SocketConfig';
import { getURLfromFile } from '../../../utils/uploadFile';
export default function GroupNav() {
    const [option, setoption] = useState<boolean>(false);
    const file = useRef<HTMLInputElement>(null!)
    const [type, settype] = useState<0 | 1>(0);
    const [userDisconneted, setuserDisconneted] = useState<string | null>(null);
    const { isSmall } = useContext(UseContext);
    const isAuth = useContext(authUser);
    const socket = useContext(SocketProvider);
    const navigate = useNavigate();
    const [img, setimg] = useState<string>(isAuth?.user_data?.profile_pic || "");
    //update profile picture mutation function
    const update = useMutation(Requests.update);
    //logout user request
    const { mutate } = useMutation(Requests.deleteUser, {
        onSuccess: () => {
            isAuth?.setuserData(null);
            socket.emit("disconnected", isAuth?.user_data?.id as string);
            sessionStorage.removeItem("isUserOnline");
        }
    });
    //get pic from user's data
    useQuery({
        queryKey: ["get_profile_pic"],
        queryFn: () => Requests.getUserById(isAuth?.user_data?.id || ""),
        retry: false,
        refetchOnWindowFocus: false,
        onSuccess: (result) => {
            setimg(result.data.success.profile_pic);
        }
    })
    //logout function
    function logout() {
        mutate();
        if (isAuth?.user_data) {
            navigate("/")
        }
    }
    //set Profile picture
    function setProfilePic() {
        getURLfromFile(file.current.files![0], e => {
            update.mutate({ id: isAuth?.user_data?.id || "", profile_pic: e }, {
                onSuccess: () => {
                    setimg(e);
                }
            })
        })
    }
    //remove profile pic
    function removeProfilePic(){
        update.mutate({id:isAuth?.user_data?.id||"",profile_pic:""},{
            onSuccess:()=>setimg("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiVlxzLVYxhm7zVUVJgitUIko_5SwNWuvpMtPaGw4qGQ&usqp=CAU&ec=48665701")
        })
    }
    useEffect(() => {
        const fun2 = (userId: string) => {

            ////// removing users from session ////////////////
            const online = JSON.parse(sessionStorage.getItem("isUserOnline") || "[]");
            if (online.length) {
                online.splice(online.indexOf(userId), 1);
                sessionStorage.setItem("isUserOnline", JSON.stringify(online));
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
                <div className='flex flex-row items-center'>
                    <img className="w-10 h-10 rounded-full border" src={!img?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiVlxzLVYxhm7zVUVJgitUIko_5SwNWuvpMtPaGw4qGQ&usqp=CAU&ec=48665701":img} alt='not_fnd' />
                    <label className="m-1 p-1" htmlFor='inputTag'>
                        <input type="file" ref={file} style={{ "display": "none" }} id='inputTag' onChange={setProfilePic} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                            <path fillRule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>
                    </label>
                    <div className='m-1 p-1' onClick={removeProfilePic}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </div>
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
            {type ? <AddFriendsOrGroups /> : <GroupFriendList disconnectId={userDisconneted} setDisconnectedId={setuserDisconneted} />}
        </div>
    )
}
