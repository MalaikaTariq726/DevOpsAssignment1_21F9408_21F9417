 import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './services/userService';
import { StudentProjectProvider } from './services/studentProjectService';
import {MentorProjectProvider} from './services/mentorProjectService';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <StudentProjectProvider>
        <MentorProjectProvider>

        <App />
        </MentorProjectProvider>
      
      </StudentProjectProvider>
    
    </UserProvider>
  </React.StrictMode>
);
