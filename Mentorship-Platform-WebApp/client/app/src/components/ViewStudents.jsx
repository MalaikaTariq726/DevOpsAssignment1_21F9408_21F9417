import React, { useState, useEffect } from "react";
import "../CSS/myprojects.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useUser } from "../services/userService";
import { useStudentProject } from "../services/studentProjectService";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState([]);
  const studentsPerPage = 5;
  const prev = "<<";
  const next = ">>";
  const { getAllStudents } = useUser();
  const { getStudentProjects } = useStudentProject();

  useEffect(() => {
    async function fetchData() {
      try {
        const studentsData = await getAllStudents();
        const projectCounts = await Promise.all(
          studentsData.map(async (student) => {
            try {
              const projectsData = await getStudentProjects(student.email);
              return projectsData.length;
            } catch (error) {
              console.error(
                `Error fetching projects for student ${student.name}:`,
                error
              );
              return 0;
            }
          })
        );
        setStudents(studentsData);
        setCount(projectCounts);
      } catch (error) {
        console.error("Error fetching Students:", error);
      }
    }
    fetchData();
  }, []);

  const nextPage = () => {
    if (currentPage < Math.ceil(students.length / studentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <>
      <div className="projcontainer" id="projcontainer">
        <h1 className="projheading">Students</h1>
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Projects Count</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{indexOfFirstStudent + index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{count[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="prevnext"
            id="prev"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            {prev}
          </button>
          <button
            className="prevnext"
            id="next"
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(students.length / studentsPerPage)
            }
          >
            {next}
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewStudents;
