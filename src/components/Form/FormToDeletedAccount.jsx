import React, { useState } from 'react'
import { ToFetch } from '../Services/ToFetchClass'


const FormToDeletedAccount = ({username, id, setShow, setAuth}) => {

    const [disabledBtn, setDisabledBtn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData)
        if (formData.username === formData.usernameConfirm && formData.username === username) {
           setDisabledBtn(true)
           const toFetch = new ToFetch(`/hikkers/${id}`, 'PATCH', formData) 
           toFetch.launch()
               .then((json) => {
                 if(json){
                   console.log(json.message)
                   setShow(false)
                   setTimeout(() => {
                        setDisabledBtn(false)
                        setAuth({       
                            logged:false,
                            isAdmin:false,
                            hikkerId:0
                        })
                    document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.reload()

                   }, 2500);
                 }
               })
        } 
        
    }

  return (
        <div>
            <form onSubmit={handleSubmit} className='p-5 border-top border-danger'>
                <p className='text-danger'>Veillez renseigner deux fois votre nom d'utilisateur : {username} </p>
                <input
                type='text'
                className='form-control'
                name='username'
                />
                <input
                type='text'
                className='form-control my-4'
                name='usernameConfirm'
                />
                <button type="submit" className='btn btn-warning me-2' disabled={disabledBtn}>Confirmer ?</button>
                <button type="button" className='btn btn-danger'>Annuler</button>
            </form>
        </div>   
    )
}

export default FormToDeletedAccount