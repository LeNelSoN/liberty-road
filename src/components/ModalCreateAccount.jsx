import React from 'react'
import Modal from "react-bootstrap/Modal"
import { regexEmailPattern, regexNamePattern, regexPasswordPattern } from '../services/regexp'

const ModalCreateAccount = ({show, setShow}) => {


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target));
        fetch("http://localhost:5000/api/registration", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)  })
            .then( res => res.ok ? res.json(): null
            )
            .then((json) => {
              if(json){
                console.log(json)
                setShow(false)
              }
            })
            .catch(err => console.log(err))
    }

  return (
    <>

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
            type="text"
            className={`form-control `}
            aria-describedby="emailHelp"
            name="login"
            pattern={regexEmailPattern}
          />       
          <label className="form-label">
            Pseudo
          </label>
          <input
            type="text"
            className={`form-control `}
            name="pseudo"
            pattern={regexNamePattern}
          />  
          <label className="form-label">
            Mot de passe
          </label>
          <input
            type="text"
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
          <button className="btn btn-danger" onClick={()=> setShow(false)}>
            Close
          </button>
        </Modal.Footer>   
      </form>
      </Modal>
    </>
  )
}

export default ModalCreateAccount