import React, { useState } from "react";

const EditSection = ({ section, userData, setUserData, onClose }) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    setUserData(formData);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit {section.replace(/([A-Z])/g, " $1")}</h2>
        {Object.keys(userData).map((key) =>
          section === key || (section === "skills" && key === "skills") ? (
            <div key={key} style={styles.inputGroup}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ) : null
        )}
        <button style={styles.saveButton} onClick={handleSave}>
          Save
        </button>
        <button style={styles.closeButton} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },
  inputGroup: { marginBottom: "10px" },
  saveButton: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    marginRight: "10px",
  },
  closeButton: {
    background: "#dc3545",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default EditSection;
