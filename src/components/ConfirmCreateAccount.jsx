import React from 'react'
import Modal from "react-bootstrap/Modal"

const ConfirmCreateAccount = ({show, setShow, message}) => {



  return (
    <Modal
      show={show}
      onHide={()=> setShow(false)}
      backdrop='static'
      keyboard={false}
      >
      <Modal.Header>
        <Modal.Title>Création de Compte</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>

    </Modal>
  )
}

export default ConfirmCreateAccount