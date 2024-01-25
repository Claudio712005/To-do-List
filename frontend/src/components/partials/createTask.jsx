import { useState } from "react";
import "../../style/createTask.sass";

function CreateTask() {
  const objCreateTask = {
    id_task: 0,
    description_task: "",
    name_task: "",
    task_date: "",
    fk_user: 0,
  };

  const [nameTaskInput, setNameTaskInput] = useState("");
  const [descriptionTaskInput, setDescriptionTaskInput] = useState("");
  const [taskDateInput, setTaskDateInput] = useState("");

  const createTask = () => {
    const taskObj = {
      ...objCreateTask,
      descriptionTask: descriptionTaskInput,
      nameTask: nameTaskInput,
      taskDate: taskDateInput,
      fkUser: sessionStorage.getItem("ID_USER")
    };

    console.log(taskObj)

    fetch(`http://localhost:8080/tasks/${sessionStorage.getItem("ID_USER")}`, {
        method: "post",
        body: JSON.stringify(taskObj),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        console.log(data);
        alert("Deu certo");
      })
      .catch((error) => {
        alert("Erro");
        console.error(error);
      });
  };

    return(
        <div className="containerCreator">
            <h2>Create your task</h2>
            <label htmlFor="" name="name">Task Name</label>
            <input type="text" name="name" onChange={(e) => setNameTaskInput(e.target.value)}/>
            <label htmlFor="" name="description">Task description</label>
            <textarea name="description" id="" cols="30" rows="10" onChange={e => setDescriptionTaskInput(e.target.value)}></textarea>
            <label htmlFor="" name="Task date">Task date</label>
            <input type="date" name="taskDate" id="" onChange={(e) => setTaskDateInput(e.target.value)}/>
            <div className="button-container">
                <button onClick={createTask}>CREATE</button>
                <button>CANCEL</button>
            </div>
        </div>
    )
}

export default CreateTask;