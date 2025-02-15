import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import StudentForm from "./StudentForm";
import "../index.css";

const App = () => {
  const [students, setStudents] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student-form" element={<StudentForm students={students} setStudents={setStudents} />} />
      </Routes>
    </Router>
  );
};

export default App;
