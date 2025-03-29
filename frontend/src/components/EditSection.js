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
        <h2 style={styles.title}>Edit {section.replace(/([A-Z])/g, " $1")}</h2>
        {Object.keys(userData).map((key) =>
          section === key || (section === "skills" && key === "skills") ? (
            <div key={key} style={styles.inputGroup}>
              <label style={styles.label}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          ) : null
        )}
        <div style={styles.buttonContainer}>
          <button style={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button style={styles.closeButton} onClick={onClose}>
            Cancel
          </button>
        </div>
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
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  title: {
    color: "#0077b6",
    marginBottom: "15px",
  },
  inputGroup: {
    marginBottom: "12px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  saveButton: {
    background: "#007bff",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    flex: 1,
    marginRight: "5px",
  },
  closeButton: {
    background: "#dc3545",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    flex: 1,
    marginLeft: "5px",
  },
};

export default EditSection;
