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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = emailRegex.test(emailInput);

    let msg = ""
    if (emailInput == "") msg += `<h5>THE USER EMAIL CANNOT BE EMPTY</h5><br></br>`;
    else if (!isValidEmail) msg += `<h5>THE USER EMAIL CANNOT BE USED</h5><br></br>`;
    if(passwordInput == "") msg += `<h5>THE USER PASSWORD CANNOT BE EMPTY</h5><br></br>`;
    if(nameInput == "") msg += `<h5>THE USER NAME CANNOT BE EMPTY</h5><br></br>`;
    else if(nameInput.length > 30) msg += "<h5>THE USER NAME CANNOT BE LONGER THAN 30 CHARACTERS</h5><br>"

    let containerForm = document.getElementById("container_form");
    let popup = document.createElement("div");
    popup.className = "popup";

    if(msg !== ""){
      popup.innerHTML = msg;
  
      containerForm.appendChild(popup);
  
      setTimeout(() => {
        popup.style.animation = "slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both";
        popup.addEventListener("animationend", () => {
          popup.remove();
        });
      }, 3000);
    } else{
      const updatedObjUser = {
        ...objUser,
        name: nameInput,
        email: emailInput,
        password: passwordInput,
      };
  
      fetch("http://localhost:8080/createUser", {
        method: "post",
        body: JSON.stringify(updatedObjUser),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBtnForm(false)
          console.log(data);
        })
        .catch((error) => {
          if (error && error.message) {
            popup.innerHTML = "There is already a user with this email registered";
        
            containerForm.appendChild(popup);
        
            setTimeout(() => {
              popup.style.animation = "slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both";
              popup.addEventListener("animationend", () => {
                popup.remove();
              });
            }, 3000);
          } else {
            alert("Unknow error");
          }
          console.error(error);
        });
    }
  };

  const objLogin = {
    email: "",
    password: "",
  };

  const [objLoginUser, setLoginObj] = useState(objLogin);
  const [loginEmail, setEmailInputLogin] = useState("");
  const [loginPassword, setPasswordInputLogin] = useState("");

  const enter = () => {

    let msg = ""
    if (loginEmail == "") msg += `<h5>THE LOGIN USER EMAIL CANNOT BE EMPTY</h5><br></br>`;
    if(loginPassword == "") msg += `<h5>THE LOGIN USER PASSWORD CANNOT BE EMPTY</h5><br></br>`;

    const objLogin = {
      ...objLoginUser,
      email: loginEmail,
      password: loginPassword,
    };

    let containerForm = document.getElementById("container_form");
    let popup = document.createElement("div");
    popup.className = "popup";

    if(msg !== ""){
      popup.innerHTML = msg;
  
      containerForm.appendChild(popup);
  
      setTimeout(() => {
        popup.style.animation = "slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both";
        popup.addEventListener("animationend", () => {
          popup.remove();
        });
      }, 3000);

    } else{

      fetch("http://localhost:8080/autenticate", {
        method: "post",
        body: JSON.stringify(objLogin),
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
          popup.innerHTML = "NOT FOUND USER";
          containerForm.appendChild(popup);
          setTimeout(() => {
            popup.style.animation = "slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both";
            popup.addEventListener("animationend", () => {
              popup.remove();
            });
          }, 3000);
          console.error(error);
        });
    }


  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div id="container_form" className="formContainer">
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
