import React, { createContext, useContext } from "react";
import axios from "axios";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  //   const getStoredToken = () => {
  //     try {
  //       let adminDataString = localStorage.getItem('adminData');
  //       if (!adminDataString) {
  //         adminDataString = localStorage.getItem('iAdminData');
  //       }
  //       if (adminDataString) {
  //         const adminData = JSON.parse(adminDataString);
  //         return adminData.result;
  //       }
  //     } catch (error) {
  //       console.error('Error parsing admin data from local storage:', error);
  //     }
  //     return null; // Return null if there's no token or in case of an error
  //   };

  //   const jwt = getStoredToken();

  const googleLoginUser = async (email) => {
    const response = await axios.get(
     ` http://localhost:7373/googleLogin/success?email=${email}`,
      { withCredentials: true }
    );
    return response;
  };

  const loginUser = async (data) => {
    let response;
    await axios.post("http://localhost:7373/auth/login", data).then((res) => {
      response = res.data.result;
    });
    return response;
  };

  const signupUser = async (data) => {
    let response;
    await axios
      .post("http://localhost:7373/auth/signup", data)
      .then((res) => {
        response = res.data;
        alert("Account created successfully", "success");
      })
      .catch((error) => {
        alert(error.response.data.message, "error");
      });
    return response;
  };

  const updateRole = async (data) => {
    let response;
    await axios
      .put("http://localhost:7373/auth/updateRole", data)
      .then((res) => {
        response = res.data;
        alert("Role set successfully", "success");
      })
      .catch((error) => {
        alert(error.message, "error");
      });
    return response;
  };

  const forgotPassword = async (data) => {
    let response;
    await axios
      .put("http://localhost:7373/auth/forgotPassword", data)
      .then((res) => {
        response = res.data;
        alert("Password changed successfully", "success");
      })
      .catch((error) => {
        alert(error.message, "error");
      });
    return response;
  };
  const verifyToken = async () => {
    console.log("Verifying Token....");
    let response = false;
    await axios
      .post("http://localhost:3001/auth/verifyToken")
      .then((res) => {
        console.log("Token verification response:", res.data);
        response = res.data.status;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return response;
  };

  const logout = async () => {
    let res = await axios.get("http://localhost:7373/auth/logout");
    return res.data.logout;
  };

  const getUser = async (data) => {
    const response = await axios.get(
     ` http://localhost:7373/auth/getUser?email=${data}`
    );
    return response;
  };

  const getAllMentors = async () => {
    const response = await axios.get(`http://localhost:7373/user/mentor`);
    return response.data;
  };

  const getAllStudents = async () => {
    try{
    const response = await axios.get(`http://localhost:7373/user/student`);
    return response;}
    catch(error){
      console.log(error);
    }
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
    loginUser,
    verifyToken,
    signupUser,
    googleLoginUser,
    updateRole,
    forgotPassword,
    logout,
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