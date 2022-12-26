import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import BtnDisconnect from '../components/Button/BtnDisconnect';
import { doFetch } from '../components/Services/doFetch';
import User from '../components/User'

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    doFetch('/hikkers', 'GET')
      .then(({data}) => {
      setUsers(data);
      setLoading(false);
    })
  }, [])

  return (
  <div className='container my-5 pb-3'>
    <BtnDisconnect/>
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