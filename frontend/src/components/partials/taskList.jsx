import { createElement, useEffect, useState } from "react"
import "../../style/taskList.sass"


function TaskList(){

    const [listTask, setListTask] = useState([])
    const [navInfo, setNavInfo] = useState(true)
    const [btnNotDone, setBtnNotDone] = useState(false)
    const [btnOrdPr, setBtnOrdPr] = useState(false)

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

    function deleteTask(id, obj){    
        fetch("http://localhost:8080/tasks/"+ id,{
            method: "delete",
            body: JSON.stringify(obj),
            headers: {
              'Content-type':'application/json',
              'Accept':'application/json'
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
            fetchTasks()
        })
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

    let click = 0

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

    function notDone(){
        const btnFilterNotDone = document.getElementById("btn_nt_done");

        setBtnNotDone(!btnNotDone);

        if(btnNotDone){
            btnFilterNotDone.style.color = "red"
            btnFilterNotDone.style.fontSize = "17px"
        } else{
            btnFilterNotDone.style.color = "black"
            btnFilterNotDone.style.fontSize = "13.333px"
            fetchTasks()
        }

        fetch(`http://localhost:8080/tasks/notDone/${sessionStorage.getItem("ID_USER")}`)
        .then(Response => Response.json())
        .then(resp => {
            setListTask(resp);
        })
    }

    return (
        <div className="task-list">
            <div className="nav-bar-task" id="nav_bar">
                <div className="top" id="top">
                    <h1>Welcome {sessionStorage.getItem("NAME_USER")}</h1>
                    <button>ORDER BY PRIORITY (ALL)</button>
                    <button id="btn_nt_done" onClick={() => {notDone()}}>NOT DONE</button>
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
                        <h6>{obj.descriptionTask}</h6>
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
                </div>
            ))}
        </div>
    );
}

export default TaskList