import React, { useState } from "react";
import { regexPassword } from "../components/Services/regexp";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { ToFetch } from "../components/Services/ToFetchClass";

function Recuperation() {
    const [errMsgId, setErrMsgId] = useState("")
    const [errMsgPassword, setErrMsgPassword] = useState("")
    const [errMsgVerrif, setErrMsgVerrif] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isVerificationVisible, setIsVerificationVisible] = useState(false)
    const [login, setLogin] = useState('')

    const {token} = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData)
    const {login, password, verification} = formData;

    login.length > 2 ? setErrMsgId(''): setErrMsgId("Identifiant incorrect")
    regexPassword.test(password.trim()) ? setErrMsgPassword(''): setErrMsgPassword("Mot de passe non-valide")
    verification === password ? setErrMsgVerrif('') : setErrMsgVerrif('text-danger h6')
    if (regexPassword.test(password.trim()) && login.length > 2 && verification === password) {
      
      const toFetch = new ToFetch('/reset', 'POST', {login, password}, token)
      toFetch.launch()
          .then((json) => {
            console.log(json)
          })
          .catch(err => console.log(err))
      }
    }
  
  return (
    <>
      <form className="container col-11 col-lg-4 rounded bg-white bg-opacity-50 py-4" onSubmit={handleSubmit}>
        <h2 className="mb-3">Récupération de mot de passe</h2>
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
        {errMsgId && <h6 className="text-danger">
          {errMsgId}
        </h6>}
        </div>
        <div className="mb-2">
          <label  className="form-label" htmlFor="password">
            Mot de passe
          </label>
          <div className="input-group mb-3">
            <button 
              type='button' 
              className="input-group-text" 
              onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>
                {isPasswordVisible ? <FaRegEye/>:<FaRegEyeSlash/>}
            </button>
            <input
              type={isPasswordVisible ? 'text':'password'}
              name="password"
              placeholder="Votre nouveau Mot de passe"
              id="password"
              className='form-control'
            />
          </div>
          {errMsgPassword && <h6 className="text-danger">
          {errMsgPassword}
          </h6>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="verification">
            Saisissez à nouveau le mot de passe
          </label>
          <div className="input-group mb-3">
            <button 
              type='button' 
              className="input-group-text" 
              onClick={()=>setIsVerificationVisible(!isVerificationVisible)}>
                {isVerificationVisible ? <FaRegEye/>:<FaRegEyeSlash/>}
            </button>
            <input
              type={isVerificationVisible ? 'text':'password'}            
              name="verification"
              placeholder="Veuillez saisir à nouveau le mot de passe"
              id="verification"
              className='form-control'
            />
          </div>
            <small className={`${errMsgVerrif}`}>La verification doit correspondre au mot de passe</small>
        </div>
        <hr/>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </div>
      </form>  
    </>
  );
}

export default Recuperation;
