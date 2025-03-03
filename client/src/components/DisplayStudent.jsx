import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Display.css"

function DisplayStudent() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(7);

  useEffect(() => {
    axios.get("http://localhost:3001/authStudent/display")
      .then(response => {
        setStudents(response.data); 
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        alert("Error fetching data:", error);
      });
  }, []);

  const lastStudentIndex = currentPage * studentsPerPage;
  const firstStudentIndex = lastStudentIndex - studentsPerPage;
  const currentStudents = students.slice(firstStudentIndex, lastStudentIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <table id="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {currentStudents.map((student, index) => (
            <tr key={index + 1}>
              <td>{firstStudentIndex + index + 1}</td>
              <td>{student.email}</td>
              <td>{student.rollno}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DisplayStudent;
