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
        <div className="social-media">
          <a href="https://www.instagram.com/araujo.clau18/?next=%2F" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/cláudio-araújo-31750a25b/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/Claudio712005/To-do-List.git" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
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
