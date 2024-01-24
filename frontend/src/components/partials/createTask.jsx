import "../../style/createTask.sass"

function CreateTask(){
    return(
        <div className="containerCreator">
            <h2>Create your task</h2>
            <label htmlFor="" name="name">Task Name</label>
            <input type="text" name="name"/>
            <label htmlFor="" name="description">Task description</label>
            <textarea name="description" id="" cols="30" rows="10"></textarea>
            <label htmlFor="" name="Task date">Task date</label>
            <input type="date" name="taskDate" id=""/>
            <div className="button-container">
                <button>CREATE</button>
                <button>CANCEL</button>
            </div>
        </div>
    )
}

export default CreateTask;