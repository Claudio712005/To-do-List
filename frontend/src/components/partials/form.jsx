import { useEffect, useState } from "react"
import "../../style/form.sass"

function Form(){

    const usuario = {
        id: 0,
        name: "",
        email: "",
        password: ""
    }

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
          password: passwordInput
        });
      
        // Agora, envie a requisição dentro da função then do setUserObj
        // para garantir que objUser foi atualizado
        setUserObj((updatedObjUser) => {
          fetch("http://localhost:8080/createUser", {
            method: 'post',
            body: JSON.stringify(updatedObjUser), // Use o estado atualizado aqui
            headers: {
              'Content-type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then(resposta => resposta.json())
          .then(data => {
            alert('Deu certo');
            console.log(data);
          })
          .catch(error => {
            alert('Erro');
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
                {
                    changeForm 
                    ?
                    <div>
                        <h1>CREATE ACCOUNT</h1>
                        <div className="container-input">
                            <label className="label">Name</label>                
                            <input required="" type="text" name="text" className="input" id="name_input" value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                            />
                            <label className="label">Email</label>
                            <input required="" type="text" name="text" className="input" id="email_input" value={emailInput} onChange={(e) => setEmailInput(e.target.value)}
                            />
                            <label className="label">Password</label>
                            <input required="" type="text" name="text" className="input" id="password_input" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
                            />
                            <button type="button" onClick={invite}>Create account</button>
                        </div>
                        <h6 onClick={() => {setBtnForm(false)}}>I have an account</h6>
                    </div>
                    :
                    <div>
                        <h1>Login</h1>
                        <div className="container-input">
                            <label className="label">Email</label>                
                            <input required="" type="text" name="text" className="input" />
                            <label className="label">Password</label>                
                            <input required="" type="text" name="text" className="input" />
                            <button >Enter</button>
                        </div>
                        <h6 onClick={() => {setBtnForm(true)}}>I don't have an account.</h6>
                    </div>
                }
            </form>
        </div>
    )
}

export default Form