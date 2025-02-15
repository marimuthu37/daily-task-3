import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const StudentForm = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState({ english: "", maths: "", physics: "", chemistry: "" });
  const [editingId, setEditingId] = useState(null); 

  const fetchStudents = () => {
    axios.get("http://localhost:5000/students")
      .then(response => {
        console.log("Students fetched:", response.data);
        setStudents(response.data);
      })
      .catch(error => console.error("Error fetching students:", error.message));
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
      if (editingId) {
        await axios.put(`http://localhost:5000/students/${editingId}`, { name, ...marks });
        console.log(" Student updated successfully");
      } else {
        await axios.post("http://localhost:5000/students", { name, ...marks });
        console.log(" Student added successfully");
      }

      fetchStudents(); 
      resetForm();
    } catch (error) {
      console.error("Error submitting student:", error.message);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setName(student.name);
    setMarks({
      english: student.english,
      maths: student.maths,
      physics: student.physics,
      chemistry: student.chemistry,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:5000/students/${id}`);
        console.log(" Student deleted successfully");
        fetchStudents(); 
      } catch (error) {
        console.error(" Error deleting student:", error.message);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setMarks({ english: "", maths: "", physics: "", chemistry: "" });
  };

  return (
    <div className="container">
      <h2>{editingId ? "Edit Student Details" : "Enter Student Details"}</h2>
      <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
      {Object.keys(marks).map((subject) => (
        <input key={subject} type="number" placeholder={subject} value={marks[subject]} onChange={(e) => setMarks({ ...marks, [subject]: e.target.value })} />
      ))}
      <button onClick={handleSubmit}>{editingId ? "Update Student" : "Add Student"}</button>
      {editingId && <button onClick={resetForm} style={{ backgroundColor: "gray" }}>Cancel</button>}

      <h2>Student Marks List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>English</th>
            <th>Maths</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.english}</td>
              <td>{student.maths}</td>
              <td>{student.physics}</td>
              <td>{student.chemistry}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)} style={{ backgroundColor: "red" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentForm;
