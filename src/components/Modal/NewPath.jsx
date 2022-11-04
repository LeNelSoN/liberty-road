import React from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NewPath = ({showPathCreate, setShowPathCreate, setIsEdit, setAuth, auth}) => {

    const navigate = useNavigate()

    const handleSubmit= (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target));
        setIsEdit(true)
        navigate(`/`)
        setShowPathCreate(false)
        setAuth({...auth, formData})
    }
  return (
    <Modal
        show={showPathCreate}
        onHide={()=> setShowPathCreate(false)}
        backdrop='static'
        keyboard={false}>
        <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Creation de Compte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="form-label">
                    Nom du chemin
                </label>
                <input
                    placeholder='Le nom de votre chemin'
                    type="text"
                    className={`form-control mb-4`}
                    aria-describedby="emailHelp"
                    name="name"
                />  
                <label className="form-label">
                   Description
                </label>
                <textarea
                    placeholder='Description de votre chemin'
                    className={`form-control`}
                    aria-describedby="emailHelp"
                    name="description"
                    rows="7"
                />      
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" className="btn btn-success">
                    Tracer le chemin
                </button>
                <button type="button" className="btn btn-danger" onClick={()=> setShowPathCreate(false)}>
                    Fermer
                </button>
            </Modal.Footer>   
        </form>

    </Modal>
)
}

export default NewPath