import React, { useContext } from 'react'
import FormToConnect from '../components/FormToConnect'
import UserCard from '../components/UserCard'
import { AuthContext } from '../controllers/AuthContext'

const Profil = ({setIsEdit}) => {
  const {auth} = useContext(AuthContext)
  return (
    <div className='form-container d-flex align-items-center justify-content-center'>
    {auth.logged ?
      <UserCard setIsEdit={setIsEdit}/>
      :
      <FormToConnect/>
    }  
    </div>
  )
}

export default Profil