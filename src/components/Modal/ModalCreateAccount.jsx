import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal"
import ModalHeader from 'react-bootstrap/ModalHeader'
import { regexEmailPattern, regexNamePattern, regexPasswordPattern } from '../../components/Services/regexp'
import { doFetch } from '../Services/doFetch'
import Confirm from './Confirm'

const ModalCreateAccount = ({show, setShowModalCreate}) => {

  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target));
        if (formData.login !=="") {
          setDisabledBtn(true)
        } 
        
          doFetch("/registration", 'POST', formData)
            .then((json) => {
              if(json){
                console.log(json.message)
                setShowModalCreate(false)
                setShowConfirm(true)
                setTimeout(() => {
                  setShowConfirm(false)
                  setDisabledBtn(false)
                }, 2500);
                setMessage(json.message)
              }
            })
            .catch(err => console.log(err))
    }

  return (
    <>
    <Confirm show={showConfirm} setShow={setShowConfirm} message={message} title={'Creation de Compte'}/>
    <Modal
      show={show}
      onHide={()=> setShowModalCreate(false)}
      backdrop='static'
      keyboard={false}>
      <form onSubmit={handleSubmit}>
        <ModalHeader closeButton >
          <Modal.Title>Creation de Compte</Modal.Title>
        </ModalHeader>
        <Modal.Body>
          <label className="form-label">
            Email
          </label>
          <input
            placeholder='Votre mail: Exemple@mail.com'
            type="email"
            className={`form-control `}
            aria-describedby="emailHelp"
            name="login"
            pattern={regexEmailPattern}
          />       
          <label className="form-label">
            Pseudo
          </label>
          <input
            placeholder='Jean Neige'
            type="text"
            className={`form-control `}
            name="pseudo"
            pattern={regexNamePattern}
          />  
          <label className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            className={`form-control `}
            name="password"
            pattern={regexPasswordPattern}
          />  
          <label className="form-label">
            Votre adresse postal
          </label>
          <input
            type="text"
            className={`form-control `}
            name="address"
          />   
          </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary" disabled={disabledBtn}>
            {disabledBtn && <span className="spinner-grow spinner-grow-sm me-2"></span>}
            Créer le compte
          </button>
          <button type="button" className="btn btn-danger" onClick={()=> {setShowModalCreate(false)}}>
            Close
          </button>
        </Modal.Footer>   
      </form>
      </Modal>
    </>
  )
}

export default ModalCreateAccount