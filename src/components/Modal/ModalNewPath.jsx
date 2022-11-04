import React from 'react'
import Modal from "react-bootstrap/Modal"

const ModalNewPath = ({show, setShow, message, handleClickCreatePath, disabledBtn}) => {

  return (
    <Modal
      show={show}
      onHide={()=> setShow(false)}
      backdrop='static'
      keyboard={false}
      >
      <Modal.Header>
        <Modal.Title>Voulez-vous créer ce chemin ?</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary" onClick={handleClickCreatePath} disabled={disabledBtn}>
          {disabledBtn && <span className="spinner-grow spinner-grow-sm me-2"></span>}
            Créer le chemin
          </button>
          <button type="button" className="btn btn-danger" onClick={()=> {setShow(false)}}>
            Close
          </button>
        </Modal.Footer> 
    </Modal>
  )
}

export default ModalNewPath