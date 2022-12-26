import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { doFetch } from '../Services/doFetch'
import Confirm from './Confirm'

const ModalNewPassword = ({show, setShowModalNewPassword}) => {

    const [showConfirm, setShowConfirm] = useState(false)
    const [message, setMessage] = useState('')  
    const [login, setLogin] = useState('')
    const [disabledBtn, setDisabledBtn] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target));
        if (formData.login !=="") {
          setDisabledBtn(true)
        } 
        doFetch(`/recuperation`, 'POST', formData) 
          .then((json) => {
            if(json){
              console.log(json.message)
              setShowModalNewPassword(false)
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
            onHide={()=> setShowModalNewPassword(false)}
            backdrop='static'
            keyboard={false}>
            <Modal.Header closeButton>
            <Modal.Title>Mot de passe oublié</Modal.Title>
            </Modal.Header>    
            <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                <label className="form-label" htmlFor="login">
                    Identifiant de connection
                </label>
                <input
                    type="text"
                    className={`form-control `}
                    id='login'
                    name="login"
                    value={login}
                    onChange={(e)=> setLogin(e.target.value)}
                    placeholder="L'adresse Email utilisé pour créer le compte"
                />
                </div>
                <Modal.Footer>
                    <button type="submit" className="btn btn-primary" disabled={disabledBtn}>
                        {disabledBtn && <span className="spinner-grow spinner-grow-sm me-2"></span>}
                        Confirmer
                    </button>
                    <button type="button" className="btn btn-danger" onClick={()=> {setShowModalNewPassword(false)}}>
                        Fermer
                    </button>
                </Modal.Footer>  
            </form>
            </Modal.Body>

        </Modal>
    </>
  )
}

export default ModalNewPassword