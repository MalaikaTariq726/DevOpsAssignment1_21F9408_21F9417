import React, { useState, useEffect } from "react";
import "../CSS/addProject.css";
import { useStudentProject } from "../services/studentProjectService";

const AddProject = (email) => {
  const [name, setName] = useState('');
  const [technology, setTechnology] = useState('');
  const [userStory, setUserStory] = useState('');;

  const { addProject } = useStudentProject();
 
  const handleAddButtonClick = async () => {
    try {
    const res=await addProject({name,technology,userStory},email);
    alert("Project Added Succesfully ");
    } catch (error) {
      console.error("Error adding project details:", error);
    }
  };

  return (
    <div className="addprojcontainer" id="addprojcontainer">
      <h1 className="addprojheading"> Add a Project </h1>
        <div className="addProj">
          <div >
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Technology:</label>
            <input
              type="text"
              placeholder="Technology"
              onChange={(e) => setTechnology(e.target.value)}
            />
          </div>
          <div>
            <label>User Story:</label>
            <textarea
              name="userStory"
              rows="10"
              cols="30"
              onChange={(e) => setUserStory(e.target.value)}
              style={{ maxHeight: "400px", overflowY: "auto" }}
            />
          </div>
          <button className="addProjBtn" onClick={handleAddButtonClick}>
           Add
          </button>
        </div>
      </div>
    
  );
};

export default AddProject;