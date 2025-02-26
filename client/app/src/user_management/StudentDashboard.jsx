import React, { useState, useEffect } from "react";
import "../CSS/dashboard.css";
import { useUser } from "../services/userService";
import profileImage from "../images/user (1)1.png";
import Topbar from "../components/Topbar";
import Profile from "../components/Profile";
import ViewRequest from '../components/viewRequest';
import AddProject from '../components/addProject';
import Projects from "../components/myProjects";

const StudentDashboard = () => {
  const { googleLoginUser, getUser } = useUser();
  const [user, setUser] = useState({
    name: "default",
    email: "default",
    role: "default",
    image: profileImage,
  });
  const [showProfile, setShowProfile] = useState(false);
  const [showMyProjects, setShowMyProjects] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showAddProj, setShowAddProj] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");

  const fetchUser = async (email) => {
    try {
      console.log("Email: ", email);
      let res = await googleLoginUser(email);
      console.log(res.data.user);
      if (!res.data.status) {
        // not google user
        res = await getUser(email);
      }
      console.log(res.data.user);
      if (!res.data.user.image) {
        console.log("img not found in user");
        setUser((prev) => ({
          ...prev,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          image: profileImage,
        }));
      } else {
        setUser((prev) => ({
          ...prev,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          image: res.data.user.image,
        }));
      }
    } catch (error) {
      console.log("Error getting user...", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userEmail = params.get("email");
    if (userEmail) {
      fetchUser(userEmail);
      setEmail(userEmail);
    } else {
      console.error("User email not found in URL query parameter");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email !== "default") {
      setIsLoading(false);
      console.log(isLoading);
    }
  }, [user]);

  const handleViewProfile = () => {
    if (!showProfile) {
      setShowMyProjects(false);
      setShowAddProj(false);
      setShowRequests(false);
    }
    setShowProfile(!showProfile);
  };

  const handleMyProjects = () => {
    if (!showMyProjects) {
      setShowRequests(false);
      setShowProfile(false);
      setShowAddProj(false);
    }
    setShowMyProjects(!showMyProjects);
  };

  const handleShowRequests = () => {
    if (!showRequests) {
      setShowProfile(false);
      setShowMyProjects(false);
      setShowAddProj(false);
    }
    setShowRequests(!showRequests);
  };
  const handleAddProject = () => {
    if (!showAddProj) {
      setShowProfile(false);
      setShowMyProjects(false);
      setShowRequests(false);
    }
    setShowAddProj(!showAddProj);
  };

  if (isLoading) {
    return (
      <>
     {/* <LoadingAnimation /> */}
      </>
    );
  }

  return (
    <>
      <Topbar />
      {showProfile && <Profile user={user ? user : null} />}
      {showMyProjects && <Projects email={user?.email}/>}
      {showRequests && <ViewRequest email={user?.email} />}
      {showAddProj && <AddProject email={user?.email} />}
      
      <div class="sidebar">
        <header class="menu-wrap">
          <figure class="user">
            <div class="user-avatar">
              <img
                src={user?.image}
                alt={user?.name && user?.name.split(" ").slice(0, 2).join(" ")}
              />
            </div>
            <figcaption>
              {user?.name && user?.name.split(" ").slice(0, 2).join(" ")}
            </figcaption>
          </figure>

          <nav>
            <section class="discover">
              <h3>Profile</h3>

              <ul>
                <li>
                  <a
                    onClick={handleViewProfile}
                    className={showProfile ? "active" : "default"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.855 14.365l-1.817 6.36a1.001 1.001 0 0 0 1.517 1.106L12 18.202l5.445 3.63a1 1 0 0 0 1.517-1.106l-1.817-6.36 4.48-3.584a1.001 1.001 0 0 0-.461-1.767l-5.497-.916-2.772-5.545c-.34-.678-1.449-.678-1.789 0L8.333 8.098l-5.497.916a1 1 0 0 0-.461 1.767l4.48 3.584zm2.309-4.379c.315-.053.587-.253.73-.539L12 5.236l2.105 4.211c.144.286.415.486.73.539l3.79.632-3.251 2.601a1.003 1.003 0 0 0-.337 1.056l1.253 4.385-3.736-2.491a1 1 0 0 0-1.109-.001l-3.736 2.491 1.253-4.385a1.002 1.002 0 0 0-.337-1.056l-3.251-2.601 3.79-.631z" />
                    </svg>
                    Profile
                  </a>
                </li>

                <li>
                  <a
                    onClick={handleMyProjects}
                    className={showMyProjects ? "active" : "default"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.353 2.355-6.049-.002-8.416zm-1.412 7.002L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002 1.563 1.571 1.564 4.025.002 5.588z" />
                    </svg>
                    My Projects
                  </a>
                </li>
              </ul>
            </section>

            <section class="tools">
              <h3>Tools</h3>

              <ul>
                <li>
                  <a onClick={handleShowRequests}
                  className={showRequests ? "active" : "default"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                    </svg>
                    View Request
                  </a>
                </li>

                <li>
                  <a onClick={handleAddProject}
                  className={showAddProj ? "active" : "default"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                    </svg>
                    Add Project
                  </a>
                </li>

                <li>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 14H4V9.227l7.335 6.521a1.003 1.003 0 0 0 1.33-.001L20 9.227V18zm0-11.448l-8 7.11-8-7.111V6h16v.552z" />
                    </svg>
                    Messages
                  </a>
                </li>
              </ul>
            </section>
          </nav>
        </header>
      </div>
    </>
  );
};

export default StudentDashboard;