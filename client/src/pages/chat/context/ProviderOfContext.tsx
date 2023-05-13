import React ,{ createContext, useState,useContext} from 'react'
import { groups} from '../users';
import { SocketProvider } from '../../../SocketConfig';
type getData = {
    isSmall:boolean
    setSmall:()=>void
    data: groups | null
    callback: (e:groups|null,userId?:string) => void
}
type UserContextProvider={
    children:React.ReactNode
}
export const UseContext = createContext<getData>({ data:null, callback: () => { },isSmall:false,setSmall:()=>{}});
export default function ProviderOfContext({children}:UserContextProvider) {
    const [user, setuser] = useState<groups|null>(null);
    const [isSmall,setSmall]=useState<boolean>(false);
    const socket=useContext(SocketProvider);
    return (
        <UseContext.Provider value={
            {
                data:user,
                callback:(e,userId)=>{
                    setuser(prev=>{
                        if (prev!==null) {
                            socket.emit("leave_room",e?._id as string)
                        }
                        socket.emit("new_room",userId as string ,e?._id as string);
                        return e;
                    });
                },
                isSmall:isSmall,
                setSmall:()=>{
                    setSmall(!isSmall);
                }
            }
        }>
            {children}
        </UseContext.Provider>
    )
}
