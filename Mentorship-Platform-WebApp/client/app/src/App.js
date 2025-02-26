import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SetRole from './pages/RoleSelection';
import './App.css';
import ForgotPassword from './pages/ForgotPassword';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/setrole" element={<SetRole/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/studdash" element={<StudentDashboard/>} />
        <Route path="/mentdash" element={<MentorDashboard/>} />
        <Route path="/admindash" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;