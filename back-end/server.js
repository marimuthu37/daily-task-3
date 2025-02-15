import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#mari37", 
    database: "students_db",
  });
  

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL Database");
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/students", (req, res) => {
  const { name, english, maths, physics, chemistry } = req.body;
  if (!name || !english || !maths || !physics || !chemistry) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = "INSERT INTO students (name, english, maths, physics, chemistry) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, english, maths, physics, chemistry], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Student added successfully", id: result.insertId });
  });
});

app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { name, english, maths, physics, chemistry } = req.body;
  
    if (!name || !english || !maths || !physics || !chemistry) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    const sql = "UPDATE students SET name=?, english=?, maths=?, physics=?, chemistry=? WHERE id=?";
    db.query(sql, [name, english, maths, physics, chemistry, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Student updated successfully" });
    });
  });
  
  app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
  
    db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Student deleted successfully" });
    });
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
