import React, { useContext, useState } from "react";
import { AuthContext } from "../controllers/AuthContext";
import ModalCreateAccount from "./ModalCreateAccount";
import { regexPassword } from "../controllers/regexp";

function FormToConnect() {
    const [show, setShow] = useState(false);
    const [errMsgId, setErrMsgId] = useState("")
    const [errMsgPassword, setErrMsgPassword] = useState("")
    const [errMsgVerrif, setErrMsgVerrif] = useState("")

    const {setAuth} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target));
    const {login, password, verification} = formData;
    
    login.length > 2 ? setErrMsgId(''): setErrMsgId("Identifiant incorrect")
    regexPassword.test(password.trim()) ? setErrMsgPassword(''): setErrMsgPassword("Mot de passe non-valide")
    verification === password ? setErrMsgVerrif('') : setErrMsgVerrif('text-danger h6')

    if (regexPassword.test(password.trim()) && login.length > 2 && verification === password) {
      fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)  })
        .then( res => res.json()
        )
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
      <ModalCreateAccount show={show} setShow={setShow} />
      <form className="container col-11 col-lg-4 rounded bg-white bg-opacity-50 py-4" onSubmit={handleSubmit}>
        <h2 className="mb-5">Vous n'étes pas connecté...</h2>
        <div className="mb-5">
          <h4>
            Connection
          </h4>
          <label className="form-label">
            Identifiant de connection
          </label>
          <input
            type="text"
            className={`form-control `}
            aria-describedby="emailHelp"
            name="login"
          />
        {errMsgId && <h6 className="text-danger">
          {errMsgId}
        </h6>}
        </div>
        <div className="mb-5">
          <label  className="form-label">
            Mot de passe
          </label>
          <input
            type="text"
            name="password"
            className={`form-control `}
          />
          {errMsgPassword && <h6 className="text-danger">
          {errMsgPassword}
        </h6>}
        </div>
        <div className="my-5">
          <label  className="form-label">
            Saisissez à nouveau le mot de passe
          </label>
          <input
            type="text"
            name="verification"
            className={`form-control `}
          />
          <small className={`${errMsgVerrif}`}>La verification doit correspondre au mot de passe</small>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Connection
          </button>
          <button className="btn" onClick={()=>setShow(true)}>Créer un compte</button>
        </div>
      </form>  
    </>
  );
}

export default FormToConnect;
