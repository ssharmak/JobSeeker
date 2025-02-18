import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const PersonalInfo = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    alert("Personal Info Updated!");
  };

  return (
    <div
      style={{
        background: "#1e1e2f",
        padding: "25px",
        margin: "20px 0",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        color: "white",
        width: "90%",
        transition: "0.3s",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Personal Information</h3>
        <FaEdit
          style={{ cursor: "pointer", color: "orange", fontSize: "18px" }}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>

      {isEditing ? (
        <div>
          <label>Full Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone: </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>LinkedIn: </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />

          <label>GitHub: </label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />

          <label>Portfolio Website: </label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
          />

          <button
            style={{
              background: "#ff9800",
              color: "white",
              padding: "8px 12px",
              borderRadius: "5px",
              border: "none",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={handleSave}
          >
            Save Info
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a href={userData.linkedin} target="_blank" rel="noreferrer">
              {userData.linkedin || "Not provided"}
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={userData.github} target="_blank" rel="noreferrer">
              {userData.github || "Not provided"}
            </a>
          </p>
          <p>
            <strong>Portfolio:</strong>{" "}
            <a href={userData.portfolio} target="_blank" rel="noreferrer">
              {userData.portfolio || "Not provided"}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
