import { useEffect, useState } from "react"
import "../../style/taskList.sass"


function TaskList(){

    const [listTask, setListTask] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8080/tasks/${sessionStorage.getItem("ID_USER")}`)
        .then(Response => {return Response.json();})
        .then(resp => {
            setListTask(resp)
        })  
    }, [])

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
        })
    }

    return (
        <div className="task-list">
            {listTask.map((obj, id) => (
                <div className="task" key={id}>
                    <div className="task-content">
                        <h2>{obj.nameTask}</h2>
                        <h6>{obj.descriptionTask}</h6>
                        <h2 className="date-task">
                            {(() => {
                                if(obj.taskDate != null){
                                    const date = new Date(obj.taskDate);
                                    const day = date.getDate();
                                    const month = date.getMonth() + 1;
                                    const year = date.getFullYear();
    
                                    const formattedDay = day < 10 ? `0${day}` : day;
                                    const formattedMonth = month < 10 ? `0${month}` : month;
    
                                    return `${formattedDay}/${formattedMonth}/${year}`;
                                } else {
                                    return `-- / -- / ----`
                                }
                            })()}
                        </h2>
                    </div>
                    <div className="div-button">
                        <label htmlFor="" name="finish">Finish Task</label>
                        <input type="checkbox" name="finish" id="" />
                        <button>OPEN</button>
                        <button onClick={deleteTask(obj.idTask, obj)}>DELETE</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList