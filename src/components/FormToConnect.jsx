import React, { useState } from "react";

function FormToConnect() {
    const [isValidPseudo, setIsValidPseudo] = useState("");
    const [isValidPassword, setIsValidPassword] = useState("");
    const [isValidVerif, setIsValidVerif] = useState("");
    const regexPassword = /^((?=\S?[A-Z])(?=\S?[a-z])(?=\S*?[0-9]).{5,})\S$/;

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target));
    const {pseudo, password, verification} = formData;
    if (regexPassword.test(password.trim()) && pseudo.length > 2 && verification === password) {
      setIsValidPseudo("is-valid")
      setIsValidPassword("is-valid")
      setIsValidVerif("is-valid")
      //TODO envoyer le formulaire à l'api
      console.log("POST: ")
      console.log(formData)
    }else{
      if (pseudo.length <= 2) {
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
    <form className="container" id="connection" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="form-label">
          Pseudo
        </label>
        <input
          type="text"
          className={`form-control ${isValidPseudo}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="pseudo"
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
      {!isValidVerif && <span className="text-danger">C'est pas bon</span>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FormToConnect;
