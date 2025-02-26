import React, { useState, useEffect } from "react";
import "../CSS/myprojects.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useMentorProject } from "../services/mentorProjectService";
import MentorProj from '../components/MentorView';

const AllProjects = ({email ,isallProj}) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const[name,setName]=useState('');
  const[viewDetails,setViewDetails]=useState(false);
  const projectsPerPage = 5;
  const prev = "<<";
  const next = ">>";
  const { getAllProjects } = useMentorProject();

  useEffect(() => {
    async function fetchData() {
      try {
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    fetchData();
  }, []);

  const handleViewProject = (name) => {
    console.log(name);
    setName(name);
    setViewDetails(!viewDetails);
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
      {viewDetails ? (
         <MentorProj name={name} show={isallProj}  email={email}/>

        ) : (
            <>
        <h1 className="projheading">All Projects</h1>
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
        </>)}
      </div>
    </>
  );
};

export default AllProjects;