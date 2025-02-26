import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/roleSelection.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useUser } from "../services/userService";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { updateRole } = useUser();
  const [role, setRole] = useState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    setEmail(emailParam);
  }, []);

  const handleRole = () => {
    updateRole({ role, email });
    navigate("/signin");
  };

  return (
    <>
      <div className="rolecontainer" id="rolecontainer">
        <form action="#" className="roleSelectForm">
          <>
            <h1 className="rolesheading">Select Role</h1>
            <div className="custom-select">
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="" disabled selected hidden>
                  Choose Role...
                </option>
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
            <button className="setRoleBtn" id="signUpBtn" onClick={handleRole}>
              Set
            </button>
          </>
        </form>
      </div>
    </>
  );
};

export default RoleSelection;
