import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [filteredSkills, setFilteredSkills] = useState([]);

  const addSkill = () => {
    if (newSkill && !skills.some((skill) => skill.name === newSkill)) {
      setSkills([...skills, { name: newSkill, level: skillLevel }]);
      setNewSkill("");
      setSkillLevel("Beginner");
    }
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setNewSkill(value);
    if (value) {
      setFilteredSkills(
        availableSkills.filter((skill) =>
          skill.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredSkills([]);
    }
  };

  return (
    <div
      style={{
        padding: "15px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        width: "500px",
        margin: "20px auto",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          color: "#333",
          fontSize: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        Skills
        <FaEdit style={{ cursor: "pointer", color: "#3E91F9" }} />
      </h3>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Enter Skill"
          value={newSkill}
          onChange={handleSkillChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            width: "100%",
            marginBottom: "10px",
            border: "1px solid #ddd",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {filteredSkills.length > 0 && newSkill && (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {filteredSkills.map((skill, index) => (
              <li
                key={index}
                onClick={() => {
                  setNewSkill(skill);
                  setFilteredSkills([]);
                }}
                style={{
                  cursor: "pointer",
                  padding: "8px",
                  color: "#333",
                  backgroundColor: "#e5e5e5",
                  borderRadius: "4px",
                  marginBottom: "5px",
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "15px" }}>
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "4px",
            width: "100%",
            fontSize: "14px",
            border: "1px solid #ddd",
            backgroundColor: "#fff",
            color: "#333",
          }}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Professional">Professional</option>
        </select>
      </div>

      <button
        onClick={addSkill}
        style={{
          backgroundColor: "#3E91F9",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          width: "100%",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Add Skill
      </button>

      <ul style={{ marginTop: "20px", paddingLeft: "0", color: "#333" }}>
        {skills.map((skill, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <span>{skill.name}</span> -{" "}
            <span style={{ fontWeight: "bold" }}>{skill.level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsSection;
