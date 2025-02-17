import React from "react";
import {
  FaUserGraduate,
  FaBriefcase,
  FaFileAlt,
  FaTools,
  FaLanguage,
  FaUser,
  FaClipboardList,
  FaBuilding,
} from "react-icons/fa";

const Sidebar = ({ setSelectedSection }) => {
  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#1E1E1E",
    color: "white",
    padding: "20px",
    position: "fixed",
    left: "0",
    top: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const listStyle = { listStyle: "none", padding: "0", width: "100%" };
  const listItemStyle = {
    padding: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    borderRadius: "5px",
    transition: "background 0.3s",
  };

  const iconStyle = { marginRight: "10px" };

  return (
    <div style={sidebarStyle}>
      <h2>Quick Links</h2>
      <ul style={listStyle}>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("education")}
        >
          <FaUserGraduate style={iconStyle} /> Education
        </li>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("experience")}
        >
          <FaBriefcase style={iconStyle} /> Experience
        </li>
        <li style={listItemStyle} onClick={() => setSelectedSection("skills")}>
          <FaTools style={iconStyle} /> Skills
        </li>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("languages")}
        >
          <FaLanguage style={iconStyle} /> Languages
        </li>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("profileSummary")}
        >
          <FaUser style={iconStyle} /> Profile Summary
        </li>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("workPreference")}
        >
          <FaClipboardList style={iconStyle} /> Work Preference
        </li>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("internships")}
        >
          <FaBuilding style={iconStyle} /> Internships
        </li>
        <li
          style={listItemStyle}
          onClick={() => setSelectedSection("employment")}
        >
          <FaBriefcase style={iconStyle} /> Employment
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
