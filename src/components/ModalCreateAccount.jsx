import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal"
import { regexEmailPattern, regexNamePattern, regexPasswordPattern } from '../controllers/regexp'
import ConfirmCreateAccount from './ConfirmCreateAccount'

const ModalCreateAccount = ({show, setShow}) => {

  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState('')
  

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target));
        fetch("http://localhost:5000/api/registration", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)  })
            .then( res => res.json()
            )
            .then((json) => {
              if(json){
                console.log(json.message)
                setShow(false)
                setShowConfirm(true)
                setTimeout(() => {
                  setShowConfirm(false)
                }, 2500);
                setMessage(json.message)
              }
            })
            .catch(err => console.log(err))
    }

  return (
    <>
    <ConfirmCreateAccount show={showConfirm} setShow={setShowConfirm} message={message}/>
    <Modal
      show={show}
      onHide={()=> setShow(false)}
      backdrop='static'
      keyboard={false}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Creation de Compte</Modal.Title>
        </Modal.Header>
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
          <button type="submit" className="btn btn-primary">
            Créer le compte
          </button>
          <button type="button" className="btn btn-danger" onClick={()=> setShow(false)}>
            Close
          </button>
        </Modal.Footer>   
      </form>
      </Modal>
    </>
  )
}

export default ModalCreateAccount