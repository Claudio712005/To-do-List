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
    let errorMessage = "";
    if (nameTaskInput === "") {
      errorMessage += "<h5>THE TASK NAME CANNOT BE EMPTY</h5><br>";
    } else if (nameTaskInput.length > 20) {
      errorMessage += "<h5>THE TASK NAME IS TOO LONG</h5><br>";
    }
    if (descriptionTaskInput.length > 250) {
      errorMessage += "<h5>THE DESCRIPTION CANNOT BE LONGER THAN 250 CHARACTERS</h5><br>";
    }
    if (taskDateInput === "") {
      errorMessage += "<h5>THE TASK DATE CANNOT BE EMPTY</h5><br>";
    }
    if (taskPriority === "") {
      errorMessage += "<h5>CHOOSE ONE PRIORITY</h5><br>";
    }
  
    let container = document.getElementById("container_creator");
    let popup = document.createElement("div");
    popup.className = "popup";
    if (errorMessage !== "") {
      popup.innerHTML = errorMessage;
  
      container.appendChild(popup);
  
      setTimeout(() => {
        popup.style.animation = "slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both";
        popup.addEventListener("animationend", () => {
          popup.remove();
        });
      }, 3000);
      
    } else{
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
          popup.innerHTML = "YOUR TASK HAS BEEN CREATED!";
  
          container.appendChild(popup);
      
          setTimeout(() => {
            popup.style.animation = "slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both";
            popup.addEventListener("animationend", () => {
              popup.remove();
            });
          }, 3000);
          cancel()
        })
        .catch((error) => {
          alert("Erro");
          console.error(error);
        });
      };
    }


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

  function cancel(){
    const painel = document.getElementById("painel")
    const nameInput = document.getElementById("name_input")
    const despTask = document.getElementById("desp_task")
    const dateTask = document.getElementById("data_task");

    painel.style.background = "#fff"
    nameInput.value = ""
    despTask.value = ""
    dateTask.value = ""

    setDescriptionTaskInput("")
    setNameTaskInput("")
    setTaskDateInput("")
    setTaskPriority("")

  }
  return(
      <div id="container_creator" className="containerCreator">
        <h2>Create your task</h2>
        <label htmlFor="" name="name">Task Name</label>
        <input type="text" name="name" id="name_input" onChange={(e) => setNameTaskInput(e.target.value)}/>
        <label htmlFor="" name="description">Task description</label>
        <textarea name="description" id="desp_task" cols="30" rows="10" onChange={e => setDescriptionTaskInput(e.target.value)}></textarea>
        <label htmlFor="">Priority</label>
        <div id="painel" className="level">
          <button  onClick={() => {chgPainel(3)}}>HIGH PRIORITY</button>
          <button  onClick={() => {chgPainel(2)}}>MEDIUM PRIORITY</button>
          <button onClick={() => {chgPainel(1)}}>LOW PRIORITY</button>
        </div>
        <label htmlFor="" name="Task date">Task date limit</label>
        <input type="date" id="data_task" name="taskDate" onChange={(e) => setTaskDateInput(e.target.value)}/>
        <div className="button-container">
          <button onClick={createTask}>CREATE</button>
          <button onClick={() => {cancel()}}>CANCEL</button>
        </div>
      </div>
    )
}

export default CreateTask;