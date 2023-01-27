import React ,{ createContext, useState } from 'react'
import { users } from '../users';
type getData = {
    isSmallScreen:boolean
    data: users | null
    callback: (e:users|null) => void
}
type UserContextProvider={
    children:React.ReactNode
}
export const UseContext = createContext<getData>({isSmallScreen:false, data:null, callback: () => { } });
export default function ProviderOfContext({children}:UserContextProvider) {
    const [user, setuser] = useState<users|null>(null)
    const [isSmallScreen, setisSmallScreen] = useState(false)
    return (
        <UseContext.Provider value={
            {
                data:user,
                isSmallScreen:isSmallScreen,
                callback:(e)=>{
                    setuser(e);
                    setisSmallScreen(!isSmallScreen);
                }
            }
        }>
            {children}
        </UseContext.Provider>
    )
}
