import React from 'react'
import { Link } from 'react-router-dom'

const ErrConnected = ({description}) => {

  return (
    <div className='d-flex align-items-end container pt-5 h-75'>
      <div className='bg-success bg-opacity-75 mt-5 p-3 w-75'>
        <p className='text-light h1'>
          {description}
        </p> 
        <div className='d-flex justify-content-end w-100'>
          <Link to='/profil' className='btn btn-secondary'>Retour</Link>      
        </div>
      </div>
    </div>
  )
}

export default ErrConnected