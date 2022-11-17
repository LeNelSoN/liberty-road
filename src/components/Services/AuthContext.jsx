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
                fetch('http://localhost:8080/api/check',{
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }})
                    .then(res => res.ok ? res.json():null)
                    .then(({data:{isAdmin, hikkerId}}) => {
                        setAuth({isAdmin, logged: true, hikkerId:0})
                        console.log(auth)
                    })
                    .catch(err=>console.log(err))
                }else{
                    setAuth({isAdmin:false, logged: false, hikkerId:0})
                    console.log(auth)
                }
    }, [])
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

