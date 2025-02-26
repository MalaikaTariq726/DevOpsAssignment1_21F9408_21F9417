import React, { useState, useEffect } from "react";
import "../CSS/myprojects.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useStudentProject } from "../services/studentProjectService";
import ViewProject from "./viewProject";

const Projects = ({ email }) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewBtn, setViewBtn] = useState(false);
  const [name,setName]=useState('');
  const projectsPerPage = 5;
  const prev = "<<";
  const next = ">>";
  const { getStudentProjects } = useStudentProject();

  useEffect(() => {
    async function fetchData() {
      try {
        const projectsData = await getStudentProjects(email);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchData();
  }, [email]);

  const handleViewProject = (name) => {
    setViewBtn(!viewBtn);
    console.log("View", name);
    setName(name);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  return (
    <>
      <div className="projcontainer" id="projcontainer">
        {viewBtn ? (
         <ViewProject name={name} email={email}/>

        ) : (
          <>
            <h1 className="projheading">My Projects</h1>
            <table className="project-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Technology</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProjects.map((project, index) => (
                  <tr key={project.id}>
                    <td>{indexOfFirstProject + index + 1}</td>
                    <td>{project.name}</td>
                    <td>{project.technology}</td>
                    <td>
                      <button
                        className="rowBtn"
                        onClick={() => handleViewProject(project.name)}
                      >
                        View
                      </button>
                      <button
                        className="rowBtn"
                        onClick={() => console.log("Delete", project)}
                      >
                        Delete
                      </button>
                    </td>
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
                  currentPage === Math.ceil(projects.length / projectsPerPage)
                }
              >
                {next}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Projects;