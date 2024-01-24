import React, { useState } from 'react';
import '../style/taskPage.sass';
import Head from './partials/head';
import CreateTask from './partials/createTask';

function TaskPage() {
  const [formVisibility, setFormVisibility] = useState(true );

  const toggleFormVisibility = () => {
    setFormVisibility(!formVisibility);
  };

  return (
    <div className="contentTask">
      <Head toggleFormVisibility={toggleFormVisibility} formVisibility={formVisibility} />
      {formVisibility ? <CreateTask /> : null}
    </div>
  );
}

export default TaskPage;
