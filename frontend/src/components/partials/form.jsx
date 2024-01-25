import { useEffect, useState } from "react";
import "../../style/form.sass";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  const usuario = {
    id: 0,
    name: "",
    email: "",
    password: "",
  };

  const [changeForm, setBtnForm] = useState(true);
  const [objUser, setUserObj] = useState(usuario);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const invite = () => {
    setUserObj({
      ...objUser,
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });

    setUserObj((updatedObjUser) => {
      fetch("http://localhost:8080/createUser", {
        method: "post",
        body: JSON.stringify(updatedObjUser),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          alert("Erro");
          console.error(error);
        });
    });
  };

  const objLogin = {
    email: "",
    password: "",
  };

  const [objLoginUser, setLoginObj] = useState(objLogin);
  const [loginEmail, setEmailInputLogin] = useState("");
  const [loginPassword, setPasswordInputLogin] = useState("");

  const enter = () => {
    setLoginObj({
      ...objLoginUser,
      email: loginEmail,
      password: loginPassword,
    });

    setLoginObj((loginDataUser) => {
      fetch("http://localhost:8080/autenticate", {
        method: "post",
        body: JSON.stringify(loginDataUser),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          console.log(data);
          sessionStorage.NAME_USER = data[0].name
          sessionStorage.ID_USER = data[0].id
          navigate('/tasks')
        })
        .catch((error) => {
          alert("Erro");
          console.error(error);
        });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        {changeForm ? (
          <div>
            <h1>CREATE ACCOUNT</h1>
            <div className="container-input">
              <label className="label">Name</label>
              <input required="" type="text" name="text" className="input" id="name_input" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
              <label className="label">Email</label>
              <input required="" type="text" name="text" className="input" id="email_input" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              <label className="label">Password</label>
              <input required="" type="text" name="text" className="input" id="password_input" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
              <button type="button" onClick={invite}> Create account</button>
            </div>
            <h6 onClick={() => { setBtnForm(false);}}>I have an account</h6>
          </div>
        ) : (
          <div>
            <h1>Login</h1>
            <div className="container-input">
              <label className="label">Email</label>
              <input required="" type="text" name="text" className="input" onChange={(e) => {setEmailInputLogin(e.target.value); }}/>
              <label className="label">Password</label>
              <input required="" type="text" name="text" className="input" onChange={(e) => {setPasswordInputLogin(e.target.value); }}/>
              <button onClick={enter}>Enter</button>
            </div>
            <h6 onClick={() => {setBtnForm(true);}}>I don't have an account.</h6>
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
