import React, { useState } from "react";

function Form() {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [verification, setVerification] = useState('');
    const [isValidPseudo, setIsValidPseudo] = useState("");
    const [isValidPassword, setIsValidPassword] = useState("");
    const [isValidVerif, setIsValidVerif] = useState("");
    const [isDisabled, setisDisabled] = useState(true)
    const regexPassword = /^((?=\S?[A-Z])(?=\S?[a-z])(?=\S*?[0-9]).{5,})\S$/;

  const handleChangePseudo = (e) => {
    setPseudo(e.target.value);
    setIsValidPseudo(e.target.value.length > 2 ? "is-valid": "is-invalid");
  };


  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    setIsValidPassword(regexPassword.test(e.target.value.trim()) ? "is-valid": "is-invalid");
  };

  const handleChangeVerification = (e) => {
    setVerification(e.target.value)
    setIsValidVerif(regexPassword.test(e.target.value.trim()) ? "is-valid": "is-invalid");
    setisDisabled(password === verification ? true : false)
  };

  return (
    <form className="container">
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Pseudo
        </label>
        <input
          type="text"
          value={pseudo}
          onChange={handleChangePseudo}
          className={`form-control ${isValidPseudo}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={handleChangePassword}
          className={`form-control ${isValidPassword}`}
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Verification
        </label>
        <input
          type="text"
          value={verification}
          onChange={handleChangeVerification}
          className={`form-control ${isValidVerif}`}
          id="exampleInputPassword1"
        />
      {isDisabled && <span className="text-danger">C'est pas bon</span>}
      </div>
      <button disabled={isDisabled} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Form;
