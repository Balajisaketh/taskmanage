import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Correct import

import TaskTable from "./components/Tasktable";
import Register from '../src/components/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />  {/* Main route displaying task list */}
        <Route path="/dashboard" element={<TaskTable/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
