import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ExperienceSection = () => {
  const [experience, setExperience] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const addExperience = () => {
    if (company && role) {
      setExperience([...experience, { company, role }]);
      setCompany("");
      setRole("");
    }
  };

  return (
    <div
      style={{ padding: "20px", background: "#1e1e2f", borderRadius: "10px" }}
    >
      <h3>
        Experience <FaEdit style={{ cursor: "pointer" }} />
      </h3>
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={addExperience}>Add</button>
      <ul>
        {experience.map((job, index) => (
          <li key={index}>
            {job.company} - {job.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceSection;
