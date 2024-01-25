import { useState } from "react";
import "../../style/createTask.sass";

function CreateTask() {
  const objCreateTask = {
    id_task: 0,
    description_task: "",
    name_task: "",
    task_date: "",
    fk_user: 0,
    priority: 0,
  };

  const [nameTaskInput, setNameTaskInput] = useState("");
  const [descriptionTaskInput, setDescriptionTaskInput] = useState("");
  const [taskDateInput, setTaskDateInput] = useState("");
  const [taskPriority, setTaskPriority] = useState("")

  const createTask = () => {
    const taskObj = {
      ...objCreateTask,
      descriptionTask: descriptionTaskInput,
      nameTask: nameTaskInput,
      taskDate: taskDateInput,
      fkUser: sessionStorage.getItem("ID_USER"),
      priority: taskPriority
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

  const chgPainel = (value) => {
    const painel = document.getElementById("painel")
    if(value == 3){
      painel.style.background = "linear-gradient(90deg, rgba(52,17,17,1) 0%, rgba(131,30,14,1) 35%, rgba(255,0,0,1) 100%)"
    } else if(value == 2){
      painel.style.background = "linear-gradient(90deg, rgba(252,89,0,1) 0%, rgba(218,136,20,1) 35%, rgba(243,255,59,1) 100%)"
    }else{
      painel.style.background = "linear-gradient(90deg, rgba(10,51,138,1) 0%, rgba(84,84,246,1) 35%, rgba(0,212,255,1) 100%)"
    }
    setTaskPriority(value);
  }

    return(
        <div className="containerCreator">
            <h2>Create your task</h2>
            <label htmlFor="" name="name">Task Name</label>
            <input type="text" name="name" onChange={(e) => setNameTaskInput(e.target.value)}/>
            <label htmlFor="" name="description">Task description</label>
            <textarea name="description" id="" cols="30" rows="10" onChange={e => setDescriptionTaskInput(e.target.value)}></textarea>
            <label htmlFor="">Priority</label>
            <div id="painel" className="level">
              <button  onClick={() => {chgPainel(3)}}>HIGH PRIORITY</button>
              <button  onClick={() => {chgPainel(2)}}>MEDIUM PRIORITY</button>
              <button onClick={() => {chgPainel(1)}}>LOW PRIORITY</button>
            </div>
            <label htmlFor="" name="Task date">Task date limit</label>
            <input type="date" name="taskDate" id="" onChange={(e) => setTaskDateInput(e.target.value)}/>
            <div className="button-container">
                <button onClick={createTask}>CREATE</button>
                <button>CANCEL</button>
            </div>
        </div>
    )
}

export default CreateTask;