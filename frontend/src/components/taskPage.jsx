import CreateTask from "./partials/createTask"
import "../style/taskPage.sass"

function TaskPage(){

    return(
        <div className="contentTask">
            <CreateTask />
        </div>
    )
}

export default TaskPage