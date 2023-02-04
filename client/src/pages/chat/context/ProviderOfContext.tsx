import React ,{ createContext, useState } from 'react'
import { users } from '../users';
type getData = {
    data: users | null
    callback: (e:users|null) => void
}
type UserContextProvider={
    children:React.ReactNode
}
export const UseContext = createContext<getData>({ data:null, callback: () => { } });
export default function ProviderOfContext({children}:UserContextProvider) {
    const [user, setuser] = useState<users|null>(null)
    return (
        <UseContext.Provider value={
            {
                data:user,
                callback:(e)=>{
                    setuser(e);
                }
            }
        }>
            {children}
        </UseContext.Provider>
    )
}
