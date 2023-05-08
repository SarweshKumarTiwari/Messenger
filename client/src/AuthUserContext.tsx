import React, { createContext, useState } from "react";

type UserContextProvider = {
    children: React.ReactNode
}
type user = {
    name: string
    email: string
    id: string
    iat?: number
}
type isAuth = {
    user_data: user | null
    setuserData: React.Dispatch<React.SetStateAction<user | null>>
}
export const authUser = createContext<isAuth|null>({user_data:null,setuserData:useState});
export default function AuthUserContext({children}:UserContextProvider) {
    const [user_data, setuserData] = useState<user|null>(null);
    return (
        <authUser.Provider value={{user_data,setuserData}}>
            {children}
        </authUser.Provider>
    )
}
