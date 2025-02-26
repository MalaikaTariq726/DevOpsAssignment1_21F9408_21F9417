import React, { useState, useEffect } from "react";
import "../CSS/profile.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useStudentProject } from "../services/studentProjectService";
import profileImage from "../images/profile.png";

const Profile = ({ user, isStudent }) => {
  const [fetchedUser, setFetchedUser] = useState({
    name: "default",
    email: "default",
    role: "default",
    image: profileImage,
  });
  const [count, setCount]=useState(0);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { getStudentProjects } = useStudentProject();

  async function calProjCount() {
    try {
      const projectsData = await getStudentProjects(user?.email);
      setCount(projectsData.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  useEffect(() => {
    calProjCount();
    setFetchedUser((prev) => ({
      ...prev,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      image: user?.image,
    }));
  }, []);

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  return (
    <>
      <div className="profilecontainer" id="profilecontainer">
        <div className="profile-img">
          <img
            src={fetchedUser?.image}
            alt={
              fetchedUser?.name &&
              fetchedUser?.name.split(" ").slice(0, 2).join(" ")
            }
          />
        </div>
        <div className={!isEditProfile ? "editProfile" : "profile"}>
          <h1 className="profileheading">Profile</h1>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              readOnly={!isEditProfile}
              value={fetchedUser?.name}
              onChange={(e) => {
                setFetchedUser({
                  ...fetchedUser,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email"
              readOnly="false"
              className="readonly-input"
              value={fetchedUser?.email}
            />
          </div>
          <div>
            <label>Role:</label>
            <input
              type="text"
              placeholder="Role"
              readOnly="false"
              className="readonly-input"
              value={fetchedUser?.role}
            />
          </div>
          {isStudent &&
          (<div>
            <label>Projects Count:</label>
            <input
              type="text"
              placeholder="Projects Count"
              readOnly="false"
              className="readonly-input"
              value={count}
            />
          </div>)}
          <button className="editProfileBtn" onClick={handleEditProfile}>
            {isEditProfile ? "Done" : "Edit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
