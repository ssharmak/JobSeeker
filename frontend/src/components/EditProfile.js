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
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ background: "white", padding: "20px", borderRadius: "10px" }}
      >
        <h2>Edit Profile</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfile;
