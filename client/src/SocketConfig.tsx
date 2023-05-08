import React, { createContext, useContext, useEffect,useRef} from "react";
import { Socket,io} from "socket.io-client";
import { ClientToServerEmits, ServerToClientEmits } from
    "../../server/websocket/Server_Client_configs"
import { authUser } from "./AuthUserContext";

type UserContextProvider = {
    children: React.ReactNode
}
type SocketIO=Socket<ServerToClientEmits,ClientToServerEmits>


export const SocketProvider = createContext<SocketIO>(io());
export default function SocketConfig({children}:UserContextProvider) {
    const socket= useRef<SocketIO>(io("http://localhost:4000"));
    const isAuth=useContext(authUser)
    useEffect(()=>{
        socket.current.emit("connected",isAuth?.user_data?.id as string)
      },[isAuth?.user_data?.id, socket])
    
    return (
        <SocketProvider.Provider value={socket.current}>
            {children}
        </SocketProvider.Provider>
    )
}
