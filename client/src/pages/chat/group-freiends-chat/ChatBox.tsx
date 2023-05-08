import {useState,useContext,useEffect} from 'react';
import { UseContext } from '../context/ProviderOfContext';
import { BubbleBox } from '../users'; 
import { useQuery } from 'react-query';
import { authUser } from '../../../AuthUserContext';
import { SocketProvider } from '../../../SocketConfig';

import ChatBottomNav from './ChatBottomNav';
import ChatNav from './ChatNav';
import InitialPage from './InitialPage';
import IncomingMessages from './Components/IncomingMessages';
import OutgoingMesswges from './Components/OutgoingMesswges';
import ChatRequests from "../Requests/ChatRequests";


export default function ChatBox() {
    
    const sendmsg=(e:BubbleBox)=>{
        socket.emit("send_message",data?._id as string,e.user||{});
        setchat(prev=>{
            return [...prev,e]
        });
        return;
    }
    const {isSmall,data}= useContext(UseContext);
    const isAuth=useContext(authUser);
    const [chat,setchat] = useState<BubbleBox[]>([]);
    const socket=useContext(SocketProvider);
    const {isLoading}=useQuery({
        queryKey:["getall_chats",data?._id],
        queryFn:()=>ChatRequests.getAllChatsOf({
            userid:isAuth?.user_data?.id,
            groupid:data?._id
        }),
        enabled:data!==null,
        onSuccess:(result)=>{
            if (result.data.success.length>0) {
                setchat(result.data.success);
                return;
            }
            setchat([{category:2,message:"No chats yet send chat to create room"}])
        },
        retry:false,
    });
    useEffect(()=>{
        const userConnected=(messages:{
            userId?:string
            name?: string
            image?:string
            file?:string
            message?: string
            date?: {date:string,time:string}
        })=>{
            setchat(prev=>{
                return [...prev,{
                    category:1,
                    user:messages
                }]
            });
        }
        socket.on("message_sent",userConnected);
        return ()=>{
            socket.off("message_sent",userConnected);
        };
    },[data?.members, socket])
    if (data===null) {
        return <InitialPage/>
    }
    return (
        <div className={`w-2/3 max-md:${isSmall?"w-full":"w-0"}  border flex flex-col overflow-auto relative`}>
            <ChatNav sendmsg={sendmsg}/>
            <div className="flex-1 overflow-auto relative" style={{"scrollbarWidth":"thin"}}>
                {!isLoading&&<div className="py-2 px-3 justify-content-end">
                    {chat.map((e,i) => {
                        if (e.category ===2) {
                            return (
                                <div className="flex justify-center mb-4" key={Math.random()}>
                                    <div className="rounded-3xl py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 ... text-white">
                                        <p className="text-xs">
                                            {e.message}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        if (!i||e.user?.date?.date!==chat[i-1].user?.date?.date){
                            return (
                                <>
                                <div className="flex justify-center mb-2 sticky top-2" key={e._id+"rrrr535"}>
                                    <div className="rounded bg-sky-100 shadow-md py-2 px-4">
                                        <p className="text-sm uppercase">
                                            {e.user?.date?.date}
                                        </p>
                                    </div>
                                </div>
                                {e.category?<IncomingMessages message={e.user?.message as string} date={e.user?.date} name={data.type?e.user?.name:undefined} image={e.user?.image} key={e._id}/>:
                                <OutgoingMesswges message={e.user?.message as string} date={e.user?.date} image={e.user?.image} key={e._id}/>}
                                </>
                            )
                        }
                        if (e.category === 0) {
                            return (
                                <OutgoingMesswges message={e.user?.message as string} date={e.user?.date} image={e.user?.image} key={e._id}/>
                            )
                        }
                        return <IncomingMessages message={e.user?.message as string} date={e.user?.date} name={data.type?e.user?.name:undefined} image={e.user?.image} key={e._id}/>
                    })}
                </div>}
            </div>
            <ChatBottomNav sendmsg={sendmsg}/>
        </div>
    )
}
