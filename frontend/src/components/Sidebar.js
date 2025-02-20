import React from "react";
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

const Sidebar = ({ setSelectedSection, theme }) => {
  // Theme-based Styles
  const isDarkMode = theme === "dark";

  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: isDarkMode ? "#1E1E1E" : "#f4f4f4", // Dark Mode / Light Mode
    color: isDarkMode ? "white" : "black",
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
    color: isDarkMode ? "white" : "black",
  };

  const listItemHoverStyle = {
    backgroundColor: isDarkMode ? "#333" : "#ddd", // Hover effect based on theme
  };

  const iconStyle = { marginRight: "10px" };

  return (
    <div style={sidebarStyle}>
      <h2
        style={{
          marginBottom: "15px",
          fontSize: "20px",
          color: isDarkMode ? "#FF9800" : "#0077b6", // Different colors for dark/light mode
          transition: "color 0.3s ease",
        }}
      >
        Quick Links
      </h2>

      <ul style={listStyle}>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("landing")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaUser style={iconStyle} /> Profile Overview
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("personalProfile")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaFileAlt style={iconStyle} /> Personal Profile
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("education")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaUserGraduate style={iconStyle} /> Education
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("experience")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaBriefcase style={iconStyle} /> Experience
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("skills")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaTools style={iconStyle} /> Skills
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("languages")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaLanguage style={iconStyle} /> Languages
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("profileSummary")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaUser style={iconStyle} /> Profile Summary
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("workPreferences")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaClipboardList style={iconStyle} /> Work Preferences
        </li>

        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("internships")}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              listItemHoverStyle.backgroundColor)
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <FaBuilding style={iconStyle} /> Internships
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
