import React, { useState } from "react";
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

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("landing");

  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "123-456-7890",
    profilePic: "https://via.placeholder.com/150",
    skills: ["React.js", "Node.js", "JavaScript", "CSS"],
    experience: "5 years in web development",
  };

  const profileContainerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
  };

  const contentStyle = {
    flex: 1,
    padding: "40px",
    marginLeft: "260px",
    overflowY: "scroll",
    height: "100vh",
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "landing":
        return <LandingPage user={user} />;
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
    <div style={profileContainerStyle}>
      <Sidebar setSelectedSection={setSelectedSection} />
      <div style={contentStyle}>{renderSection()}</div>
    </div>
  );
};

export default ProfilePage;
