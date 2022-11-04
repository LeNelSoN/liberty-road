import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { regexNamePattern } from '../../components/Services/regexp'
import Confirm from './Confirm'
import { ToFetch } from '../../components/Services/ToFetchClass';
import FormToDeletedAccount from '../Form/FormToDeletedAccount';


const ModalUpdate = ({show, setShow, username, address, id, setAuth}) => {
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [onDeleted, setOnDeleted] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = () => {
      setShow(!show)
    }

    const handleClickDeleteAccount = () => {
      setOnDeleted(!onDeleted)
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData)
        if (formData.username !=="" ||formData.address !=="") {
          setDisabledBtn(true)
        } 
        
        const toFetch = new ToFetch(`/hikkers/${id}`, 'PUT', formData) 
        toFetch.launch()
            .then((json) => {
              if(json){
                console.log(json.message)
                setShow(false)
                setShowConfirm(true)
                setTimeout(() => {
                  setShowConfirm(false)
                  setDisabledBtn(false)
                  window.location.reload()
                }, 2500);
                setMessage(json.message)
              }
            })
    }
  return (
    <>
    <Confirm show={showConfirm} setShow={setShowConfirm} message={message} title={'Mise à jour'}/>
    <Modal show={show} onHide={handleClose}>
    <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
        <Modal.Title>Mise à jour</Modal.Title>
        </Modal.Header>
        <Modal.Body>      
        <label className="form-label">
            Pseudo
        </label>
        <input
            placeholder={username}
            type="text"
            className={`form-control mb-2`}
            name="username"
            pattern={regexNamePattern}
        />  
        <label className="form-label">
            Votre adresse postal
        </label>
        <input
            type="text"
            className={`form-control `}
            name="address"
            placeholder={address}
        />   
        </Modal.Body>
        <Modal.Footer>
        <button type="button" className='btn btn-warning' onClick={handleClickDeleteAccount}>Supprimer le compte</button>
        <button type="submit" className="btn btn-success" disabled={disabledBtn}>
          {disabledBtn && <span className="spinner-grow spinner-grow-sm me-2"></span>}
          Mettre à jour
        </button>
        <button type="button" className="btn btn-danger" onClick={()=> {setShow(false)}}>
            Fermer
        </button>
        </Modal.Footer>   
    </form>
    {onDeleted && 
      <FormToDeletedAccount username={username} id={id} setShow={setShow} setAuth={setAuth}/>
    }
    </Modal>  

    </>
      )
}

export default ModalUpdate