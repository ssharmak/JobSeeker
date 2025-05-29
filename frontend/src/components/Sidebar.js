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

const Sidebar = ({ setSelectedSection, selectedSection }) => {
  const menuItems = [
    { section: "landing", icon: <FaUser />, label: "Profile Overview" },
    { section: "personalProfile", icon: <FaFileAlt />, label: "Personal Profile" },
    { section: "education", icon: <FaUserGraduate />, label: "Education" },
    { section: "experience", icon: <FaBriefcase />, label: "Experience" },
    { section: "skills", icon: <FaTools />, label: "Skills" },
    { section: "languages", icon: <FaLanguage />, label: "Languages" },
    { section: "profileSummary", icon: <FaUser />, label: "Profile Summary" },
    { section: "workPreferences", icon: <FaClipboardList />, label: "Work Preferences" },
    { section: "internships", icon: <FaBuilding />, label: "Internships" },
  ];

  return (
    <>
      <style>
        {`
          .layout-container {
            display: flex;
            flex-direction: row;
          }

          .sidebar {
            width: 260px;
            background-color: #ffff;
            color: #f0f0f0;
            padding: 1.5rem 1rem;
            border-right: 1px solid #ffff;
            height: calc(100vh - 120px); /* viewport minus navbar and footer */
            overflow-y: auto;
            position: sticky;
            top: 60px; /* start below navbar */
            align-self: flex-start;
          }

          .sidebar-title {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color:#000;
            border-bottom: 2px solid #444;
            padding-bottom: 0.75rem;
            text-align: center;
          }

          .sidebar-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .sidebar-item {
            display: flex;
            align-items: center;
            padding: 0.8rem 1rem;
            margin: 0.4rem 0;
            cursor: pointer;
            border-radius: 8px;
            transition: background-color 0.2s ease;
            font-size: 1rem;
            font-weight: 500;
            color: #000;
          }

          .sidebar-item:hover {
            background-color: #ccc;
            color: #000;
          }

          .sidebar-item.active {
            background-color: #ccc;
            color: #000;
            font-weight: 600;
          }

          .sidebar-item .icon {
            margin-right: 0.75rem;
            font-size: 1.2rem;
          }

          @media screen and (max-width: 768px) {
            .layout-container {
              flex-direction: column;
            }

            .sidebar {
              width: 100%;
              height: auto;
              position: relative;
              top: 0;
              border-right: none;
              border-bottom: 1px solid #000;
              padding: 1rem 0.5rem;
            }

            .sidebar-title {
              display: none;
            }

            .sidebar-list {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }

            .sidebar-item {
              flex: 1 1 45%;
              justify-content: center;
              margin: 0.25rem;
            }
          }
        `}
      </style>

      <div className="sidebar">
        <h2 className="sidebar-title">Quick Links</h2>
        <ul className="sidebar-list">
          {menuItems.map(({ section, icon, label }) => (
            <li
              key={section}
              className={`sidebar-item ${selectedSection === section ? "active" : ""}`}
              onClick={() => setSelectedSection(section)}
            >
              <span className="icon">{icon}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
