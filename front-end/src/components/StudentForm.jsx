import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState({ english: "", maths: "", physics: "", chemistry: "" });

  const fetchStudents = () => {
    axios.get("http://localhost:5000/students")
      .then(response => {
        console.log("📢 Students fetched:", response.data);
        setStudents(response.data);
      })
      .catch(error => console.error("❌ Error fetching students:", error.message));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || Object.values(marks).some(mark => mark === "")) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/students", { name, ...marks });
      console.log("Student added successfully");

      fetchStudents();

      setName("");
      setMarks({ english: "", maths: "", physics: "", chemistry: "" });
    } catch (error) {
      console.error("Error adding student:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2>Enter Student Details</h2>
      <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
      {Object.keys(marks).map((subject) => (
        <input key={subject} type="number" placeholder={subject} value={marks[subject]} onChange={(e) => setMarks({ ...marks, [subject]: e.target.value })} />
      ))}
      <button onClick={handleSubmit}>Add Student</button>

      <h2>Student Marks List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>English</th>
            <th>Maths</th>
            <th>Physics</th>
            <th>Chemistry</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.english}</td>
              <td>{student.maths}</td>
              <td>{student.physics}</td>
              <td>{student.chemistry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentForm;
