import { createElement, useEffect, useState } from "react"
import "../../style/taskList.sass"


function TaskList(){
    const objCreateTask = {
        id_task: 0,
        description_task: "",
        name_task: "",
        task_date: "",
        fk_user: 0,
        priority: 0,
    };

    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [newDescription, setNewDescription] = useState("");

    const [listTask, setListTask] = useState([])
    const [navInfo, setNavInfo] = useState(true)

    useEffect(() => {
        fetchTasks()
    }, [])

    function fetchTasks() {
        fetch(`http://localhost:8080/tasks/${sessionStorage.getItem("ID_USER")}`)
        .then(Response => Response.json())
        .then(resp => {
            setListTask(resp);
        })
    }

    function deleteTask(id, obj) {
        console.log('Deleting task:', id, obj);
    
        fetch(`http://localhost:8080/tasks/${id}`, {
            method: "delete",
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            console.log(res)
        })
        .then((data) => {
            console.log('Task deleted:', data);
            fetchTasks();
        })
        .catch((error) => {
            console.error('Error deleting task:', error);
        });
    }
    
    

    function doneTask(id, obj){

        if(obj.done) obj.done = false
        else obj.done = true
        
        fetch("http://localhost:8080/tasks/" + id, {
            method: "put",
            body: JSON.stringify(obj),
            headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            },
        })
        .then((resposta) => resposta.json())
        .then((data) => {
            console.log(data);
            fetchTasks()
        })
        .catch((error) => {
            console.error(error);
        });
    }

    function showInfo(){
        setNavInfo(!navInfo)
        const navBar = document.getElementById("nav_bar")
        const topBar = document.getElementById("top")
        const infoDiv = document.getElementById("info")

        const heightNav = navBar.style.height

        if(navInfo){
            navBar.style.height = "15%"    
            topBar.style.height = "40.95px"
            infoDiv.style.height = "40%"
            infoDiv.innerHTML = `
                <h4 id="content_info">PRIORITY</h4>
                <div id="content_info" class="content-info">
                    <div class="colorBall1"></div>
                    <h6>DONE</h6>
                </div>
                <div id="content_info" class="content-info">
                    <div class="colorBall2"></div>
                    <h6>LOW</h6>
                </div>
                <div id="content_info" class="content-info">
                    <div class="colorBall3"></div>
                    <h6>MEDIUM</h6>
                </div>
                <div id="content_info" class="content-info">
                    <div class="colorBall4"></div>
                    <h6>HIGH</h6>
                </div>
            `;
            
        } else{
            const contentInfo = document.querySelectorAll("#content_info")
            navBar.style.height = "7%" 
            infoDiv.style.height="0%"
            contentInfo.forEach((element, index) => {
                element.style.animation = `fade-out 0.2s ease-out both`;
            });    

            setTimeout(() => {
                contentInfo.forEach((element) => {
                    element.remove();
                });
            }, 1500)  
        }


    }

    function notDone() {
        fetch(`http://localhost:8080/tasks/notDone/${sessionStorage.getItem("ID_USER")}`)
            .then((Response) => Response.json())
            .then((resp) => {
                setListTask(resp);
            });

    }
    
    function orderedPriority() {
        fetch(`http://localhost:8080/tasks/orderedPriority/${sessionStorage.getItem("ID_USER")}`)
            .then((Response) => Response.json())
            .then((resp) => {
                setListTask(resp);
            });
    }

    function editTask(h6Descp){
        const index = listTask.findIndex((task, i) => `desc_${i}` === h6Descp);
        
        if (index !== -1) {
            setEditingTaskIndex(index);
            setNewDescription(listTask[index].descriptionTask);
        }
    }

    function saveDescriptionChanges(id, obj) {
        if (editingTaskIndex !== null) {
            if(newDescription.length > 250){
                let container = document.getElementById("task_list_container");
                let popup = document.createElement("div");
                popup.className = "popup";
                popup.innerHTML = "YOUR TASK CANNOT BE SAVED BECAUSE IT EXCEEDS 250 CHARACTERS";
                container.appendChild(popup);
            
                setTimeout(() => {
                    popup.style.animation = "slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both";
                    popup.addEventListener("animationend", () => {
                    popup.remove();
                    });
                }, 3000);
                return
            }
            const updatedList = [...listTask];
            updatedList[editingTaskIndex].descriptionTask = newDescription;
            setListTask(updatedList);
            setEditingTaskIndex(null);
        
            fetch("http://localhost:8080/tasks/editDescp/" + obj.idTask, {
                method: "put",
                body: newDescription, 
                headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                },
            })
                .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
                })
                .then((data) => {
                console.log("Succes:", data);
                fetchTasks();
                })
                .catch((error) => {
                console.error(error);
                });
            }
      }
      
      

    return (
        <div id="task_list_container" className="task-list">
            <div className="nav-bar-task" id="nav_bar">
                <div className="top" id="top">
                    <h1>Welcome {sessionStorage.getItem("NAME_USER")}</h1>
                    <button id="btn_ord_pr" onClick={() => {orderedPriority()}}>ORDER BY PRIORITY (ALL)</button>
                    <button id="btn_nt_done" onClick={() => {notDone()}}>NOT DONE</button>
                    <button id="btn_default" onClick={() => {fetchTasks()}}>DEFAULT</button>
                    <button onClick={() => {showInfo()}}>INFO</button>
                </div>
                <div className="info" id="info"></div>
            </div>
            {listTask.map((obj, id) => (
                    <div style={
                        obj.done
                        ? { background: "linear-gradient(90deg, rgba(10,179,38,1) 0%, rgba(75,161,31,1) 35%, rgba(51,231,69,1) 100%)" }
                            :obj.priority === 1
                            ? { background: "linear-gradient(90deg, rgba(10,51,138,1) 0%, rgba(84,84,246,1) 35%, rgba(0,212,255,1) 100%)" }
                            : obj.priority === 2
                            ? { background: "linear-gradient(90deg, rgba(252,89,0,1) 0%, rgba(218,136,20,1) 35%, rgba(243,255,59,1) 100%)" }
                            : { background: "linear-gradient(90deg, rgba(52,17,17,1) 0%, rgba(131,30,14,1) 35%, rgba(255,0,0,1) 100%)" }
                        } className="task" key={id} 
                    >
                    <div className="task-content">
                        <h2>{obj.nameTask}<br/>Priority: {
                            obj.priority === 1
                            ? "Low"
                            : obj.priority === 2
                            ? "Medium"
                            : "High"

                        }</h2>
                        {
                            editingTaskIndex !== null && editingTaskIndex === id
                            ? (
                            <>
                                <textarea
                                type="text"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className={
                                    obj.done
                                    ? "doneTextArea"
                                    :obj.priority === 1
                                    ? "lowTextArea"
                                    : obj.priority === 2
                                    ? "mediumTextArea"
                                    : "highTextArea"
                                }
                                ></textarea>
                                <button className="saveNewDescp" onClick={() => {saveDescriptionChanges(id, obj)}}>Save</button>
                            </>
                            )
                            : <h6 id={`desc_${id}`}>{obj.descriptionTask}</h6>
                        }
                        <h2 className="date-task">
                            {(() => {
                                if(obj.taskDate != null){
                                    const now = new Date();

                                    const date = new Date(obj.taskDate);
                                    const day = date.getDate();
                                    const month = date.getMonth() + 1;
                                    const year = date.getFullYear();
                                    
                                    const formattedDay = day < 10 ? `0${day}` : day;
                                    const formattedMonth = month < 10 ? `0${month}` : month;
                                    
                                    let timeDiff = date - now;
                                    
                                    let daysToDo = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                                    if(daysToDo > 0){
                                        return `${formattedDay}/${formattedMonth}/${year} | remaim ${daysToDo} days`;
                                    } else{
                                        timeDiff = now - date;
                                        const daysDelayed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                                        return `${formattedDay}/${formattedMonth}/${year} | task delayed by ${daysDelayed} days`;
                                    }
                                    
                                } else {
                                    return `-- / -- / ----`
                                }
                            })()}
                        </h2>
                    </div>
                    <div className="div-button">
                        <label htmlFor="" name="finish">Finish Task</label>
                        {
                            obj.done 
                            ?
                            <input onClick={() => {doneTask(obj.idTask, obj)}} type="checkbox" name="finish" id="" checked disabled="true" />
                            :
                            <input onClick={() => {doneTask(obj.idTask, obj)}} type="checkbox" name="finish" id="" />
                        }
                        <button onClick={() => {deleteTask(obj.idTask, obj)}}>DELETE</button>
                    </div>
                    <i class="fa-solid fa-pen-to-square" onClick={() => {editTask("desc_" + id)}}></i>
                </div>
            ))}
        </div>
    );
}

export default TaskList