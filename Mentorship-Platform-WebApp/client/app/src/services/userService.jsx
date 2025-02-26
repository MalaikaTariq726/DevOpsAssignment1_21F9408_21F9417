import React, { createContext, useContext } from "react";
import axios from "axios";
const UserContext = createContext();
const UserProvider = ({ children }) => {

  const updateRole = async (data) => {
    let response;
    await axios
      .put("http://localhost:7373/user/updateRole", data)
      .then((res) => {
        response = res.data;
        alert("Role set successfully", "success");
      })
      .catch((error) => {
        alert(error.message, "error");
      });
    return response;
  };

  const getUser = async (data) => {
    const response = await axios.get(
      `http://localhost:7373/user/getUser?email=${data}`
    );
    return response;
  };

  const getAllMentors = async () => {
    const response = await axios.get(`http://localhost:7373/user/mentor`);
    return response.data;
  };

  const getAllStudents = async () => {
    const response = await axios.get(`http://localhost:7373/user/student`);
    return response.data;
  };

  const requestApproval = async (data) => {
    let response;
    await axios
      .put("http://localhost:7373/user/requestApproval", { email: data })
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
        alert(error.message, "error");
      });
    return response;
  };

  const contextValues = {
    updateRole,
    getUser,
    requestApproval,
    getAllMentors,
    getAllStudents,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
