import React, { useContext } from 'react'
import { AuthContext } from '../../components/Services/AuthContext'

const BtnDisconnect = () => {

  const {auth, setAuth} = useContext(AuthContext)


  const handleDisconnect = () => {
    setAuth({       
        logged:false,
        isAdmin:false,
        hikkerId:0
    })
    document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

  return (
    <button className='btn btn-danger mt-3' onClick={handleDisconnect}>Déconnection</button>  )
}

export default BtnDisconnect