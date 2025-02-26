import React, { useState, useEffect } from "react";
import "../CSS/myprojects.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useUser } from "../services/userService";

const ViewMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewBtn, setViewBtn] = useState(false);
  const [isApproveBtnClicked, setIsApproveBtnClicked] = useState(false);
  const mentorsPerPage = 5;
  const prev = "<<";
  const next = ">>";
  const { requestApproval, getAllMentors } = useUser();
  async function fetchData() {
    try {
      const mentorsData = await getAllMentors();
      setMentors(mentorsData);
    } catch (error) {
      console.error("Error fetching Mentors:", error);
    }
  }
  useEffect(() => {
  
    fetchData();
  }, []);

  async function setMentorStatus(email) {
    try {
      const res = await requestApproval(email);
    } catch (error) {
      console.error("Error approving Mentors:", error);
    }
  }


  const handleApproveMentor = async (email) => {
    
      await setMentorStatus(email);
      const mentorsData = await getAllMentors();
      setMentors(mentorsData);
    setIsApproveBtnClicked(!isApproveBtnClicked);
  
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(mentors.length / mentorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = mentors.slice(indexOfFirstMentor, indexOfLastMentor);

  return (
    <>
      <div className="projcontainer" id="projcontainer">
          <h1 className="projheading">Mentors</h1>
          <table className="project-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentMentors.map((mentor, index) => (
                <tr key={mentor.id}>
                  <td>{indexOfFirstMentor + index + 1}</td>
                  <td>{mentor.name}</td>
                  <td>{mentor.email}</td>
                  <td>{mentor.status}</td>
                  <td>
                    {mentor.status === "Pending" && (
                      <button
                        className="rowBtn"
                        onClick={() => handleApproveMentor(mentor.email)}
                      >
                        Approve
                      </button>
                    )}
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
                currentPage === Math.ceil(mentors.length / mentorsPerPage)
              }
            >
              {next}
            </button>
          </div>
      </div>
    </>
  );
};

export default ViewMentors;