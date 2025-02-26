import React, { createContext, useContext } from "react";
import axios from "axios";
const MentorprojectContext = createContext();
const  MentorProjectProvider = ({ children }) => {

  const BASE_URL = 'http://localhost:7373';
const getMyProjects =async(email)=>{
    try {
        const response = await axios.get(`${BASE_URL}/project/mentorprojects/${email}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching project request: ${error.message}`);
      }

}
const  getProjectDetails=async(name)=>{
  try {
    const response = await axios.get(`${BASE_URL}/project/getprojdetailbyname/${name}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching project request: ${error.message}`);
  }
}
const getAllProjects=async()=>{
  try {
    const response = await axios.get(`${BASE_URL}/project/getAllProj`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching project request: ${error.message}`);
  }
}
const sendRequest=async(email,name)=>{
 try {
  console.log(email);
  console.log(name);
    const response = await axios.post(`${BASE_URL}/project/request/${email}`,{name:name});
    return response;
  } catch (error) {
    throw new Error(`Error fetching project request: ${error.message}`);
  }
}

const contextValues = {
    getMyProjects,getProjectDetails,getAllProjects,sendRequest,
  };
 return (
   <MentorprojectContext.Provider value={contextValues}>
     {children}
   </MentorprojectContext.Provider>
 );
};
const useMentorProject = () => useContext(MentorprojectContext);

export { MentorProjectProvider as  MentorProjectProvider,useMentorProject };