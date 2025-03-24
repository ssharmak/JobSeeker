import React, { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSkill, setEditedSkill] = useState("");
  const [editedLevel, setEditedLevel] = useState("");

  // Add a new skill
  const addSkill = () => {
    if (newSkill && !skills.some((skill) => skill.name === newSkill)) {
      setSkills([...skills, { name: newSkill, level: skillLevel }]);
      setNewSkill("");
      setSkillLevel("Beginner");
    }
  };

  // Delete a skill
  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  // Start editing a skill
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedSkill(skills[index].name);
    setEditedLevel(skills[index].level);
  };

  // Save the edited skill
  const saveEdit = () => {
    const updatedSkills = [...skills];
    updatedSkills[editingIndex] = { name: editedSkill, level: editedLevel };
    setSkills(updatedSkills);
    setEditingIndex(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIndex(null);
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
      {/* Skills Header */}
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

      {/* Saved Skills Section */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      >
        {skills.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedSkill}
                      onChange={(e) => setEditedSkill(e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        marginRight: "10px",
                      }}
                    />
                    <select
                      value={editedLevel}
                      onChange={(e) => setEditedLevel(e.target.value)}
                      style={{
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        marginRight: "10px",
                      }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Professional">Professional</option>
                    </select>
                    <FaCheck
                      onClick={saveEdit}
                      style={{
                        color: "green",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                    />
                    <FaTimes
                      onClick={cancelEdit}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {skill.name}
                    </span>
                    <span style={{ fontSize: "14px", color: "#555" }}>
                      {skill.level}
                    </span>
                    <FaEdit
                      onClick={() => startEditing(index)}
                      style={{
                        cursor: "pointer",
                        color: "#3E91F9",
                        marginLeft: "10px",
                      }}
                    />
                    <FaTrash
                      onClick={() => deleteSkill(index)}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "10px",
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#777", fontSize: "14px" }}>
            No skills added yet.
          </p>
        )}
      </div>

      {/* Add Skill Section */}
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <h4 style={{ color: "#333", fontSize: "16px", marginBottom: "10px" }}>
          Add a Skill
        </h4>
        <input
          type="text"
          placeholder="Enter Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
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
            marginBottom: "10px",
          }}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Professional">Professional</option>
        </select>

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
      </div>
    </div>
  );
};

export default SkillsSection;
