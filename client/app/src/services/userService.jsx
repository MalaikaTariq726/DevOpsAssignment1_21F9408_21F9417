import React, { createContext, useContext } from 'react';
import axios from 'axios';
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

  const googleLoginUser = async (data) => {
    let response = false;
    await axios
      .post('http://localhost:7373/auth/gooleLogin', data)
      .then((res) => {
        response = res.data;
        alert('Google login successfully', 'success');
      })
      .catch((error) => {
        alert(error.message, 'error');
      });
    return response;
  };

  const loginUser = async (data) => {
    let response = false;
    axios
      .post('http://localhost:7373/auth/login', data)
      .then((res) => {
        response = res.data;
        alert('Signed in successfully', 'success');
      })
      .catch((error) => {
        alert(error.message, 'error');
      });
    return response;
    };
  const signupUser = async (data) => {
    let response = false;
       await axios.post('http://localhost:7373/auth/signup', data).then((res) => {
        console.log(res.data);
        response = res.data;
        alert('Signed in successfully', 'success');
      })
      .catch((error) => {
        alert(error.message, 'error');
      });
    return response;
  };

  const verifyToken = async (token) => {
    let response = false;
    await axios
      .get('http://localhost:7373/auth/verify', {
        params: {
          token,
        },
      })
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
        alert(error.message, 'error');
      });
    return response;
  };

  const contextValues = {
    loginUser,
    verifyToken,
signupUser,
googleLoginUser,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
