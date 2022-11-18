import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { ToFetch } from '../components/Services/ToFetchClass'
import User from '../components/User'

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doFetch = new ToFetch('/hikkers', 'GET')
    setLoading(true);
    doFetch.launch().then(({data}) => {
      setUsers(data);
      setLoading(false);
    })
  }, [])

  return (
  <div className='container my-5 pb-3'>
    {
      loading ?
        <Spinner/>
        :
        users?.map(({id,username, address, appUser:{login}}) => 
          <User 
            key={id} 
            id={id} 
            username={username} 
            address={address} 
            login={login}
          />)
    }
        
  </div>
  )
}

export default Users