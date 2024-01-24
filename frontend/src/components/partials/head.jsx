import React from 'react';
import '../../style/head.sass';
import { useLocation } from 'react-router-dom';

function Head({ toggleFormVisibility, formVisibility }) {
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <div className="head">
        <h1>CLÁUDIO ARAÚJO</h1>
        <h2>TO do List project</h2>
      </div>
    );
  } else if (location.pathname === '/tasks') {
    return (
      <div onClick={toggleFormVisibility} className="head-task">
        {formVisibility ? 'SHOW MY TASKS' : 'CREATE NEW TASK'}
      </div>
    );
  }

  return null;
}

export default Head;
