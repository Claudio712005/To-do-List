import React, { useState } from 'react';
import '../style/taskPage.sass';
import Head from './partials/head';
import CreateTask from './partials/createTask';
import { useNavigate } from "react-router-dom";
import TaskList from './partials/taskList';

function TaskPage() {
  const [formVisibility, setFormVisibility] = useState(true );

  const toggleFormVisibility = () => {
    setFormVisibility(!formVisibility);
  };

  const idUser = sessionStorage.getItem("ID_USER")
  const navigate = useNavigate();

  if(!idUser){
    setTimeout(() => {
      navigate("/")
    }, 1000);
  } else{
    return (
      <div className="contentTask">
        <Head toggleFormVisibility={toggleFormVisibility} formVisibility={formVisibility} />
        {formVisibility ? <CreateTask /> : <TaskList />}
      </div>
    );
  }

}

export default TaskPage;
