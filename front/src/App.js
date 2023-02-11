import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import StudentForm from './StudentForm'
import StudentList from './StudentList';
import { Card,  CardTitle, CardBody, Spinner, Button } from "reactstrap";
import './App.css';


function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState({ id: uuid(), name: '', email: '' });
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const toggle = () =>{
    setShow(!show)
    setIsUpdate(!isUpdate)
  }

  useEffect(()=>{
    if(!isUpdate) 
      setStudent({ id: uuid(), name: '', email: '' });
  }, [isUpdate])



  useEffect(() => {
    axios
      .get('http://localhost:3000/students')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    let newStudent = { ...student };
    newStudent[name] = value;
    setStudent(newStudent);
};

  const handleAddStudent = e => {
    axios
      .post('http://localhost:3000/students', student,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
      })
      .then(res => {
        setStudents([...students, student]);
        setShow(!show)
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleDelete = id => {
    axios
      .delete(`http://localhost:3000/students/${id}`)
      .then(res => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleUpdateStudent = (e) => {
    axios
      .put(`http://localhost:3000/students/${student.id}`, student,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        setStudents(
          students.map(s => (student.id === s.id ? student : s))
        );
        toggle()
      })
      .catch(error => {
        setError(error);
      });
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  } 
  return (
    <Card >
      <CardTitle className="cardheader" >
          <div className="containerheader">
              <div>
                  <h3>Student Management</h3>
              </div>
              <div className="add-search-buttons">
                  {
                    !show? <Button onClick={() => {setShow(true)}}>
                    Add
                </Button> : <></>
                  }
              </div>
              </div>
      </CardTitle>
      <CardBody style={{ height: "700px", overflow: "scroll" }}>
          {loading && <Spinner style={{ width: '2rem', height: '2rem' }} />}
          {error && <div>{error.message}</div>}
          {
                  show ? 
                  <StudentForm toggle={toggle} show={show} student={student} setStudent={setStudent} isUpdate={isUpdate} handleChange={handleChange} handleSubmit={isUpdate? handleUpdateStudent : handleAddStudent}/>
                  :
                  <></>
                 }
          {loading ? (
                  <p>Loading...</p>
                ) : (
                  !show?
                  <StudentList students={students} handleDelete={handleDelete} setStudent={setStudent} setIsUpdate={setIsUpdate} setShow={setShow} />
                  :
                  <></>
                  )
                  }
      </CardBody>
    </Card>
  );
  
}

export default App;