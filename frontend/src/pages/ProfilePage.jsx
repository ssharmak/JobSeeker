import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LandingPage from "../components/LandingPage";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import SkillsSection from "../components/SkillsSection";
import LanguagesSection from "../components/LanguagesSection";
import ProfileSummary from "../components/ProfileSummary";
import WorkPreferences from "../components/WorkPreferences";
import InternshipsSection from "../components/InternshipsSection";
import EmploymentSection from "../components/EmploymentSection";
import PersonalProfile from "../components/PersonalProfile";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("landing");

  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    address: "",
    github: "",
    linkedin: "",
    hackerrank: "",
    resume: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No access token found. Please log in.");
        }

        const response = await axios.get(
          "https://app.teachersearch.in/api/profile/getCandprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);

        if (response.data && "candidate" in response.data) {
          const candidateData = response.data.candidate;
          if (candidateData) {
            setUser(candidateData);
          } else {
            throw new Error("Candidate profile is empty.");
          }
        } else {
          throw new Error("Candidate not found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while fetching the profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const profileContainerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    color: "#333",
  };

  const contentStyle = {
    flex: 1,
    padding: "40px",
    marginLeft: "260px",
    overflowY: "auto",
    maxHeight: "calc(100vh - 120px)", // Adjust for navbar/footer height
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "landing":
        return <LandingPage user={user} />;
      case "personalProfile":
        return <PersonalProfile user={user} setUser={setUser} />;
      case "education":
        return <EducationSection />;
      case "experience":
        return <ExperienceSection />;
      case "skills":
        return <SkillsSection />;
      case "languages":
        return <LanguagesSection />;
      case "profileSummary":
        return <ProfileSummary />;
      case "workPreferences":
        return <WorkPreferences />;
      case "internships":
        return <InternshipsSection />;
      case "employment":
        return <EmploymentSection />;
      default:
        return <LandingPage user={user} />;
    }
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <p style={{ padding: "20px", textAlign: "center" }}>Loading profile...</p>
      ) : error ? (
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div style={profileContainerStyle}>
          <Sidebar setSelectedSection={setSelectedSection} />
          <div style={contentStyle}>{renderSection()}</div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProfilePage;
