const express = require('express');
const cors = require('cors');

const fs = require('fs');
const app = express();
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000;

// Read data from db.json file
let rawData = fs.readFileSync('db.json');
let students = JSON.parse(rawData);

// API endpoint to get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// API endpoint to add a new student
app.post('/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  fs.writeFileSync('db.json', JSON.stringify(students));
  res.json(students);
});

// API endpoint to update a student
app.put('/students/:id', (req, res) => {
  const updatedStudent = req.body;
  const studentId = req.params.id;
  students.forEach((student, index) => {
    if (student.id === studentId) {
      students[index] = updatedStudent;
    }
  });
  fs.writeFileSync('db.json', JSON.stringify(students));
  res.json(students);
});

// API endpoint to delete a student
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  students = students.filter(student => student.id !== studentId);
  fs.writeFileSync('db.json', JSON.stringify(students));
  res.json(students);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
