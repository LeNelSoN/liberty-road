import React, { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import ModalCreateAccount from "./ModalCreateAccount";
import { regexPassword } from "../services/regexp";

function FormToConnect() {
    const [show, setShow] = useState(false);

    const {auth, setAuth} = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target));
    const {login, password, verification} = formData;

    if (regexPassword.test(password.trim()) && login.length > 2 && verification === password) {
      fetch("http://localhost:5000/api/login", {
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
            const {token, data:{hikkerId, isAdmin}} = json
            document.cookie = `Bearer=${token.access_token}; path="/"`
            setAuth({...auth,isAdmin,hikkerId,logged:true})
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
          <small>La verification doit correspondre au mot de passe</small>
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
