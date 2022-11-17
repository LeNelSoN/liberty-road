import React from 'react'
import { Modal } from 'react-bootstrap'
import logo from '../../assets/EkiRoad.webp'

const Loading = ({show}) => {
  return (
    <Modal
      show={show}
      backdrop='static'
      keyboard={false}
      >
      <div className='text-center d-flex flex-column align-items-center'>
        <img src={logo} alt='logo'/>
        <p className='text-success'>les Chemins de la liberté</p>
        <div className="spinner-grow text-success mb-3">
        </div>
      </div>
    </Modal>  )
}

export default Loading