import React from 'react'
import Modal from "react-bootstrap/Modal"

const Confirm = ({show, setShow, message, title}) => {



  return (
    <Modal
      show={show}
      onHide={()=> setShow(false)}
      backdrop='static'
      keyboard={false}
      >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>

    </Modal>
  )
}

export default Confirm