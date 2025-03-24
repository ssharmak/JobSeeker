// import React, { useState } from "react";
import {
  FaUser,
  FaUserGraduate,
  FaBriefcase,
  FaTools,
  FaLanguage,
  FaClipboardList,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";

const Sidebar = ({ setSelectedSection }) => {
  // const [isDarkMode] = useState(false); // Dark mode is disabled

  // Styles
  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#ffffff", // Always light mode
    color: "black",
    padding: "20px",
    position: "fixed",
    left: "0",
    top: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
    transition: "background 0.3s ease",
  };

  const listStyle = { listStyle: "none", padding: "0", width: "100%" };

  const listItemStyle = {
    padding: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    borderRadius: "5px",
    transition: "background 0.3s, transform 0.2s",
    color: "black",
  };

  const listItemHoverStyle = {
    backgroundColor: "#ddd",
  };

  // const iconStyle = { marginRight: "10px" };

  return (
    <div style={sidebarStyle}>
      <h2
        style={{
          marginBottom: "15px",
          fontSize: "20px",
          color: "#0077b6",
          transition: "color 0.3s ease",
        }}
      >
        Quick Links
      </h2>

      <ul style={listStyle}>
        {[
          { section: "landing", icon: <FaUser />, label: "Profile Overview" },
          {
            section: "personalProfile",
            icon: <FaFileAlt />,
            label: "Personal Profile",
          },
          {
            section: "education",
            icon: <FaUserGraduate />,
            label: "Education",
          },
          { section: "experience", icon: <FaBriefcase />, label: "Experience" },
          { section: "skills", icon: <FaTools />, label: "Skills" },
          { section: "languages", icon: <FaLanguage />, label: "Languages" },
          {
            section: "profileSummary",
            icon: <FaUser />,
            label: "Profile Summary",
          },
          {
            section: "workPreferences",
            icon: <FaClipboardList />,
            label: "Work Preferences",
          },
          {
            section: "internships",
            icon: <FaBuilding />,
            label: "Internships",
          },
        ].map(({ section, icon, label }) => (
          <li
            key={section}
            style={listItemStyle}
            onClick={() => setSelectedSection(section)}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                listItemHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {icon} {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
