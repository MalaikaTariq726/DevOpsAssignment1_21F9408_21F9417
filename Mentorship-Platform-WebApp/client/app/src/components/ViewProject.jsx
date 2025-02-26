import React, { useState, useEffect } from "react";
import "../CSS/viewproj.css";
import { useStudentProject } from "../services/studentProjectService";

const ViewProject = ({ name, email }) => {
  const [isApproved, setIsApproved] = useState(true);
  const [updatedName, setUpdatedName] = useState("");
  const [technology, setTechnology] = useState("");
  const [userStory, setUserStory] = useState("");
  const [isEditProject, setIsEditProject] = useState(false);
  const [approvedData, setApprovedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isApprovedClicked, setIsApprovedClicked] = useState(false);

  const [itemsPerPage] = useState(5);
  const {
    getProjectDetails,
    updateProject,
    approvementor,
    pendingmentor,
    approverequest,
  } = useStudentProject();

  const handleToggleClick = () => {
    setIsApproved(!isApproved);
  };
  async function fetchApprovedData() {
    try {
      const data = await approvementor(name);
      return data;
    } catch (error) {
      console.error("Error fetching approved mentors:", error);
      return [];
    }
  }
  async function fetchPendingData() {
    try {
      const data = await pendingmentor(name);
      return data;
    } catch (error) {
      console.error("Error fetching pending mentors:", error);
      return [];
    }
  }
  useEffect(() => {
    async function setData() {
      const approvedDataResponse = await fetchApprovedData();
      const pendingDataResponse = await fetchPendingData();
      setApprovedData(approvedDataResponse);
      setPendingData(pendingDataResponse);
    }

    setData();
  }, [isApproved]);
  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await getProjectDetails(name);
        setUpdatedName(projectData.name);
        setTechnology(projectData.technology);
        setUserStory(projectData.userStory);
        const approvedDataResponse = await fetchApprovedData();
        const pendingDataResponse = await fetchPendingData();
        setApprovedData(approvedDataResponse);
        setPendingData(pendingDataResponse);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    }

    fetchData();
  }, []);

  const totalPagesApproved = Math.ceil(approvedData.length / itemsPerPage);
  const totalPagesPending = Math.ceil(pendingData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const temp = async (email) => {
    const res = await approverequest({ name, email });
    console.log(res);
    if (res.status) {
      const pendingDataResponse = await fetchPendingData();
      setPendingData(pendingDataResponse);
    } else {
      alert(res.message);
    }
  };
  const handleApproveBtn = (email) => {
    console.log("in approve btn", email);
    temp(email);
    setIsApprovedClicked(!isApprovedClicked);
  };

  const handleEditButtonClick = async () => {
    try {
      if (isEditProject) {
        const data = await updateProject({
          name,
          technology,
          userStory,
          updatedName,
        });
        setUpdatedName(data.name);
        setTechnology(data.technology);
        setUserStory(data.userStory);
        name = updatedName;
      }
      setIsEditProject(!isEditProject);
    } catch (error) {
      console.error("Error updating project details:", error);
    }
  };

  return (
    <div className="viewprojcontainer" id="viewprojcontainer">
      <h1 className="viewprojheading"> Project Details </h1>
      <div className="viewproj">
        <div className={!isEditProject ? "projDetails" : "editProfileDetails"}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              readOnly={!isEditProject}
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <div>
            <label>Technology:</label>
            <input
              type="text"
              placeholder="Technology"
              readOnly={!isEditProject}
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
          </div>
          <div>
            <label>User Story:</label>
            <textarea
              name="userStory"
              rows="10"
              cols="30"
              readOnly={!isEditProject}
              className="readonly-input"
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              style={{ maxHeight: "400px", overflowY: "auto" }}
            />
          </div>
          <button className="editProjBtn" onClick={handleEditButtonClick}>
            {isEditProject ? "Done" : "Edit"}
          </button>
        </div>
        <div className="projToggle">
          <div className="toggletable">
            <input type="checkbox" id="toggle" className="toggleCheckbox" />
            <label
              htmlFor="toggle"
              className="toggleContainer"
              onClick={handleToggleClick}
            >
              <div>Approved Request</div>
              <div>Pending Request</div>
            </label>
          </div>

          {isApproved ? (
            <table className="approved-table">
              {/* Table headers */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mentor Email</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {approvedData
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <table className="pending-table">
              {/* Table headers */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mentor Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody>
                {pendingData
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item}</td>
                      <td>
                        <button
                          className="rowBtn"
                          onClick={() => handleApproveBtn(item)}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {/* Next and previous buttons */}
          <div>
            {currentPage > 1 && (
              <button className="rowBtn" onClick={handlePrevPage}>
                Previous
              </button>
            )}
            {isApproved
              ? totalPagesApproved > currentPage && (
                  <button className="rowBtn" onClick={handleNextPage}>
                    Next
                  </button>
                )
              : totalPagesPending > currentPage && (
                  <button className="rowBtn" onClick={handleNextPage}>
                    Next
                  </button>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
