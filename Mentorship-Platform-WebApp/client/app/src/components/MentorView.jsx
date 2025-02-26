import React, { useState, useEffect } from "react";
import "../CSS/viewproj.css";
import { useMentorProject } from "../services/mentorProjectService";

const MentorProj = ({ name,show,email}) => {
  const [technology, setTechnology] = useState('');
  const [userStory, setUserStory] = useState('');
  const [studentMail,setStudentMail]=useState('');
  const { getProjectDetails ,sendRequest } = useMentorProject();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const projectData = await getProjectDetails(name);
        setTechnology(projectData.technology);
        setUserStory(projectData.userStory);
        setStudentMail(projectData.studentEmail);

      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    }
    
    fetchData(); 
  }, []);
  const handleRequest = async () => {
    try {
      const projectData = await sendRequest(email, name);
      alert(projectData.data.success);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };
  

  return (
    <div className="viewprojcontainer" id="viewprojcontainer">
      <h1 className="viewprojheading"> {name}   Details </h1>

        <div className="projDetails">
         
          <div>
            <label>Technology:</label>
            <input
              type="text"
              placeholder="Technology"
              readOnly
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
          </div>
          <div>
            <label>Student Email:</label>
            <input
              type="text"
              placeholder="Student Email"
              readOnly
              value={studentMail}
              onChange={(e) => setStudentMail(e.target.value)}
            />
          </div>
          <div>
            <label>User Story:</label>
            <textarea
              name="userStory"
              rows="10"
              cols="30"
              readOnly
              className="readonly-input"
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              style={{ maxHeight: "400px", overflowY: "auto" }}
            />
          </div>
          {
            show && <button className="rowBtn" onClick={handleRequest}>Request</button>
          }


        </div>
      </div>
  );
};

export default MentorProj;