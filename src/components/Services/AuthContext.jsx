import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        logged:false,
        isAdmin:false,
        hikkerId:0
    })

    useEffect(() => {
        
        const token = document.cookie?.split(';').filter(value => value.includes('Bearer'))[0]?.split('=')[1]
            if(token){
                fetch('http://localhost:5000/api/check',{
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }})
                    .then(res => res.ok ? res.json():null)
                    .then(({data:{isAdmin, hikkerId}}) => {
                        document.cookie = `Bearer=${token}; path="/"; max-age=${60*60*24}`;
                        setAuth({isAdmin, logged: true, hikkerId})
                    })
                }else{
                    setAuth({isAdmin:false, logged: false, hikkerId:0})
                }
    }, [])
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

