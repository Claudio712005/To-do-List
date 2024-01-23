import { useState } from "react"
import "../../style/form.sass"

function Form(){

    const [changeForm, setBtnForm] = useState(true)

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
                            <input required="" type="text" name="text" className="input" />
                            <label className="label">Email</label>                
                            <input required="" type="text" name="text" className="input" />
                            <label className="label">Password</label>                
                            <input required="" type="text" name="text" className="input" />
                            <button >Create account</button>
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