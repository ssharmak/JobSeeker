import React, { useState } from "react";

const EditProfile = ({ onClose, userData, setUserData }) => {
  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setUserData(formData);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0077b6" }}>Edit Profile</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "8px 15px",
              background: "#0077b6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={onClose}
            style={{
              padding: "8px 15px",
              background: "#ccc",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
