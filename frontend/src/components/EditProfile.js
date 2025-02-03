import React, { useState } from "react";

const EditProfile = ({ onClose, userData }) => {
  const [formData, setFormData] = useState({ ...userData });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Simulating saving to the database (console log for now)
    console.log("Saving updated data: ", formData);
    onClose(); // Close the edit modal after saving
  };

  const styles = {
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "300px",
    },
    input: {
      width: "100%",
      padding: "8px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },
    saveButton: {
      background: "#28a745",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.modal}>
      <div style={styles.content}>
        <h2>Edit Profile</h2>
        <label>Name:</label>
        <input
          style={styles.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>College:</label>
        <input
          style={styles.input}
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
        />

        <label>Qualification:</label>
        <input
          style={styles.input}
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
        />

        <label>Location:</label>
        <input
          style={styles.input}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label>Gender:</label>
        <input
          style={styles.input}
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />

        <label>DOB:</label>
        <input
          style={styles.input}
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          style={styles.input}
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <button style={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
