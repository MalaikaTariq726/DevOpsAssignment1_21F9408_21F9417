import React, { createContext, useContext } from "react";
import axios from "axios";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {

  const googleLoginUser = async (email) => {
    const response = await axios.get(
      `http://localhost:7373/googleLogin/success?email=${email}`,
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
      .post("http://localhost:3001/authAdmin/verifyToken")
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

  const contextValues = {
    loginUser,
    verifyToken,
    signupUser,
    googleLoginUser,
    forgotPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider as AuthProvider, useAuth as useAuth };
