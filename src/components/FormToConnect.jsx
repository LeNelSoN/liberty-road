import React, { useState } from "react";

function FormToConnect({setAuth}) {
    const [isValidPseudo, setIsValidPseudo] = useState("");
    const [isValidPassword, setIsValidPassword] = useState("");
    const [isValidVerif, setIsValidVerif] = useState("");
    const regexPassword = /^((?=\S?[A-Z])(?=\S?[a-z]).{4,})\S$/;

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target));
    const {login, password, verification} = formData;

    if (regexPassword.test(password.trim()) && login.length > 2 && verification === password) {
      setIsValidPseudo("is-valid")
      setIsValidPassword("is-valid")
      setIsValidVerif("is-valid")
      fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)  })
        .then( res => res.ok ? res.json(): null
        )
        .then((data) => {
          if(data){
            console.log(data)
            const {token} = data
            document.cookie = `Bearer=${token.access_token}; path="/"`
            setAuth(true)
          }
        })
        .catch(err => console.log(err))
    }else{
      if (login.length <= 2) {
        setIsValidPseudo("is-invalid")
      }else{
        setIsValidPseudo("is-valid")
      }
      if (!regexPassword.test(password.trim()) || verification !== password) {
        setIsValidPassword("is-invalid")
      }else{
        setIsValidPassword("is-valid")
      }
      if (verification !== password || password.length === 0 ){
        setIsValidVerif("is-invalid")
      }else{
        setIsValidVerif("is-valid")
      }
    }
  }

  return (
    <form className="container col-12 col-lg-4 rounded bg-white bg-opacity-50 py-4" id="connection" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="form-label">
          Pseudo
        </label>
        <input
          type="text"
          className={`form-control ${isValidPseudo}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="login"
        />
      </div>
      <div className="mb-5">
        <label  className="form-label">
          Password
        </label>
        <input
          type="text"
          name="password"
          className={`form-control ${isValidPassword}`}
          id="exampleInputPassword1"
        />
      </div>
      <div className="my-5">
        <label  className="form-label">
          Verification
        </label>
        <input
          type="text"
          name="verification"
          className={`form-control ${isValidVerif}`}
          id="exampleInputPassword1"
        />
      {!isValidVerif && <small>La verification doit correspondre au mot de passe</small>}
      </div>
      <button type="submit" className="btn btn-primary">
        Connection
      </button>
    </form>
  );
}

export default FormToConnect;
