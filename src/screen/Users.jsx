import React, { useEffect, useState } from 'react'
import { ToFetch } from '../components/Services/ToFetchClass'
import User from '../components/User'

const Users = () => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const doFetch = new ToFetch('/hikkers', 'GET')
    doFetch.launch().then(({data}) => {
      setUsers(data);
      console.log(data);
    })
  }, [])

  return (
  <div className='container mt-5'>
    {users?.map(({id,username, address, appUser:{login}}) => <User key={id} id={id} username={username} address={address} login={login}/>)}
  </div>
  )
}

export default Users