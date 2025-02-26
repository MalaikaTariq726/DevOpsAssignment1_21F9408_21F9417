import React, { useState, useEffect } from "react";
import "../CSS/dashboard.css";
import { useUser } from "../services/userService";
import profileImage from "../images/profile.png";
import Topbar from "../components/Topbar";
import Profile from "../components/Profile";
import LoadingAnimation from "../components/LoadingAnimation";
import ViewMentors from "../components/ViewMentors";
import ViewStudents from "./../components/ViewStudents";
import AllProjects from './../components/AllProjects';

const AdminDashboard = () => {
  const { getUser } = useUser();
  const [admin, setAdmin] = useState({
    name: "default",
    email: "default",
    role: "default",
    image: profileImage,
  });
  const [showProfile, setShowProfile] = useState(false);
  const [showMentors, setShowMentors] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (email) => {
    try {
      console.log("Email: ", email);
      let res = await getUser(email);
      console.log(res.data.user);
      if (!res.data.user.image) {
        console.log("img not found in user");
        setAdmin((prev) => ({
          ...prev,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          image: profileImage,
        }));
      } else {
        setAdmin((prev) => ({
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
    } else {
      console.error("User email not found in URL query parameter");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (admin?.email !== "default") {
      setIsLoading(false);
      console.log(isLoading);
    }
  }, [admin]);

  const handleViewProfile = () => {
    if (!showProfile) {
      setShowProjects(false);
      setShowStudents(false);
      setShowMentors(false);
    }
    setShowProfile(!showProfile);
  };
  const handleViewMentors = () => {
    if (!showMentors) {
      setShowProfile(false);
      setShowStudents(false);
      setShowProjects(false);
    }
    setShowMentors(!showMentors);
  };

  const handleViewStudents = () => {
    if (!showStudents) {
      setShowProfile(false);
      setShowMentors(false);
      setShowProjects(false);
    }
    setShowStudents(!showStudents);
  };

  const handleViewProjects = () => {
    if (!showProjects) {
      setShowProfile(false);
      setShowMentors(false);
      setShowStudents(false);
    }
    setShowProjects(!showProjects);
  };

  if (isLoading) {
    return (
      <>
        <LoadingAnimation />
      </>
    );
  }

  return (
    <>
      <Topbar />
      {showProfile && <Profile user={admin ? admin : null} isStudent={false}/>}
      {showMentors && <ViewMentors />}
      {showStudents && <ViewStudents />}
      {showProjects && <AllProjects email={""} isallProj={false} />}
      <div class="sidebar">
        <header class="menu-wrap">
          <figure class="user">
            <div class="user-avatar">
              <img
                src={admin?.image}
                alt={
                  admin?.name && admin?.name.split(" ").slice(0, 2).join(" ")
                }
              />
            </div>
            <figcaption>
              {admin?.name && admin?.name.split(" ").slice(0, 2).join(" ")}
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
              </ul>
            </section>

            <section class="tools">
              <h3>Tools</h3>

              <ul>
                <li>
                  <a
                    onClick={handleViewProjects}
                    className={showProjects ? "active" : "default"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                    </svg>
                    View Projects
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleViewMentors}
                    className={showMentors ? "active" : "default"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                    </svg>
                    View Mentors
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleViewStudents}
                    className={showStudents ? "active" : "default"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                    </svg>
                    View Students
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

export default AdminDashboard;
