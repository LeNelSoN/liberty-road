import React from 'react'

const User = ({id, username, address, login}) => {
    return (
        <div className='card text-center my-3'>
            <div className='card-header'>
                <p className='card-title'>Id utilisateur: {id}</p>
                <p className='card-subtitle'>Username: {username}</p>
            </div>
            <div className='card-body'>
                <p>Address: {address}</p>
                <p>Email: {login}</p>
            </div>
        </div>
  )
}

export default User