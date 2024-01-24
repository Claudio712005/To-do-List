import { useCallback, useState } from 'react';
import {BrowserRouter as  Router, Route, Routes} from  'react-router-dom';
import CreateUserComponent from './components/createUser.jsx';
import TaskPage from './components/taskPage.jsx';
import './Global.sass'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateUserComponent />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
