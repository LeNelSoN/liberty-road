import React from 'react'
import FormToConnect from '../components/FormToConnect'
import UserCard from '../components/UserCard'

const Profil = ({setIsEdit, auth, setAuth}) => {

  return (
    <div className='form-container d-flex align-items-center justify-content-center'>
    {auth ? 
      <UserCard setIsEdit={setIsEdit} setAuth={setAuth}/>
      :
      <FormToConnect setAuth={setAuth}/>
    }
    </div>
  )
}

export default Profil