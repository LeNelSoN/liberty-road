import React, { useState } from 'react'
import Confirm from '../Modal/Confirm'
import { ToFetch } from '../Services/ToFetchClass';

const BtnDelete = ({id}) => {

    const [show, setShow] = useState('')
    const [message, setMessage] = useState('')

    const handleClick = () => {

    const toFetch = new ToFetch(`/paths/${id}`, 'PATCH')
    toFetch.launch()
      .then( (json) => {
          if(json){
            setShow(false)
            setShow(true)
            setTimeout(() => {
              setShow(false)
              document.location.reload()
            }, 2500);
            setMessage(json.message)
          }
        })
      .catch(err => console.error(err))    
        }

  return (
    <>
        <Confirm show={show} setShow={setShow} message={message} title={'Creation de Chemin'}/>
        <button className="btn btn-danger m-1" onClick={handleClick}>Supprimer</button>
    </>
  )
}

export default BtnDelete