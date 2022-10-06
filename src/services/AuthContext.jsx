import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({
        logged:false,
        isAdmin:false,
        hikkerId:0
    })

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

