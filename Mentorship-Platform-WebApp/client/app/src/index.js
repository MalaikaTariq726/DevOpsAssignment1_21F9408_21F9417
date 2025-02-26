import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./services/authService";
import { UserProvider } from "./services/userService";
import { StudentProjectProvider } from "./services/studentProjectService";
import { MentorProjectProvider } from "./services/mentorProjectService";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <StudentProjectProvider>
          <MentorProjectProvider>
            <App />
          </MentorProjectProvider>
        </StudentProjectProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
