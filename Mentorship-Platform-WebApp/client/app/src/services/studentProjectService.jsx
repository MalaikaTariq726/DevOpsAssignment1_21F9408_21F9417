import React, { createContext, useContext } from "react";
import axios from "axios";
const StudentprojectContext = createContext();
const StudentProjectProvider = ({ children }) => {
  const BASE_URL = "http://localhost:7373";

  const getStudentProjects = async (email) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/studentprojects/${email}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching student projects: ${error.message}`);
    }
  };
  const getProjectDetails = async (name) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/getProjByName/${name}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching project details: ${error.message}`);
    }
  };
  const updateProject = async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/project/updateProject`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error updating project : ${error.message}`);
    }
  };

  const approvementor = async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}/project/projment/${name}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching project details: ${error.message}`);
    }
  };
  const pendingmentor = async (name) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/pendingreq/${name}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching project details: ${error.message}`);
    }
  };

  const approverequest = async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/project/approve`, data);

      return response;
    } catch (error) {
      throw new Error(`Error approving project mentor: ${error.message}`);
    }
  };
  const getRequest = async (email) => {
    try {
      const response = await axios.get(`${BASE_URL}/project/pendreq/${email}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching project request: ${error.message}`);
    }
  };
  const addProject = async (data, email) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/project/addProject/${email.email}`,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Error adding project: ${error.message}`);
    }
  };

  const deleteProject = async (name) => {
    try {
      const response = await axios.delete(`${BASE_URL}/project/delete/${name}`);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(`Error deleting project: ${error.message}`);
    }
  };

  const contextValues = {
    getStudentProjects,
    getProjectDetails,
    updateProject,
    approvementor,
    pendingmentor,
    approverequest,
    getRequest,
    addProject,
    deleteProject,
  };

  return (
    <StudentprojectContext.Provider value={contextValues}>
      {children}
    </StudentprojectContext.Provider>
  );
};
const useStudentProject = () => useContext(StudentprojectContext);

export { StudentProjectProvider, useStudentProject };
