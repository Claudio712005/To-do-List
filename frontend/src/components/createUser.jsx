import Head from "./partials/head.jsx";
import Form from "./partials/form.jsx";
import '../style/createUser.sass'

function CreateUserComponent(){
    return(
        <div className="container">
            <Head />
            <Form />
        </div>
    );
}

export default CreateUserComponent