import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Services/AuthContext";
import ModalCreateAccount from "../Modal/ModalCreateAccount";
import { regexPassword } from "../Services/regexp";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import ModalNewPassword from "../Modal/ModalNewPassword";
import { doFetch } from "../Services/doFetch";


function FormToConnect() {
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalNewPassword, setShowModalNewPassword] = useState(false);
    const [errMsgId, setErrMsgId] = useState("")
    const [errMsgPassword, setErrMsgPassword] = useState("")
    const [errMsgVerrif, setErrMsgVerrif] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isVerificationVisible, setIsVerificationVisible] = useState(false)
    const [login, setLogin] = useState('')

    const {setAuth} = useContext(AuthContext)

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    setLogin(params.get("login")) 
    setErrMsgId(params.get("err")) 
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target));
    const {login, password, verification} = formData;
    
    login.length > 2 ? setErrMsgId(''): setErrMsgId("Identifiant incorrect")
    regexPassword.test(password.trim()) ? setErrMsgPassword(''): setErrMsgPassword("Mot de passe non-valide")
    verification === password ? setErrMsgVerrif('') : setErrMsgVerrif('text-danger h6')

    if (regexPassword.test(password.trim()) && login.length > 2 && verification === password) {
      doFetch( '/login', 'POST', formData)
        .then((json) => {
          console.log(json)
          setErrMsgPassword(json.message)
          if(json){
            const {token, data:{hikkerId, isAdmin}} = json
            document.cookie = `Bearer=${token.access_token}; path="/"; max-age=${60*60*24}`;
            setAuth({isAdmin,hikkerId,logged:true})
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <ModalCreateAccount show={showModalCreate}  setShowModalCreate={setShowModalCreate}/>
      <ModalNewPassword show={showModalNewPassword}  setShowModalNewPassword={setShowModalNewPassword}/>
      <form className="container col-11 col-lg-4 rounded bg-white bg-opacity-50 py-4" onSubmit={handleSubmit}>
        <h2 className="mb-3">Vous n'étes pas connecté...</h2>
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
              placeholder="Votre Mot de passe"
              id="password"
              className={`form-control `}
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
        <button type='button' className="btn btn-link" onClick={()=>setShowModalNewPassword(true)}>Mot de passe oublié</button>
        <hr/>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Connection
          </button>
          <button type="button" className="btn" onClick={()=>setShowModalCreate(true)}>Créer un compte</button>
        </div>
      </form>  
    </>
  );
}

export default FormToConnect;
