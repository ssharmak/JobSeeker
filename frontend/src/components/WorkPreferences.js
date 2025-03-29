import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Select from "react-select";
import Modal from "react-modal";

// Custom styles for react-select dropdown
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    color: "#333",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#ddd",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#333",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#666",
  }),
};

const roleOptions = [
  { value: "Full Stack Developer", label: "Full Stack Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "AI/ML Engineer", label: "AI/ML Engineer" },
  { value: "Data Scientist", label: "Data Scientist" },
];

const locationOptions = [
  { value: "Bangalore", label: "Bangalore" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Pune", label: "Pune" },
  { value: "Delhi", label: "Delhi" },
];

const WorkPreferences = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [relocate, setRelocate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSavePreferences = () => {
    console.log("Saved Preferences:", {
      roles: selectedRoles.map((r) => r.value),
      locations: selectedLocations.map((l) => l.value),
      relocate,
    });

    setModalIsOpen(true); // Show the popup message
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#fff", // ✅ White background
        borderRadius: "10px",
        marginBottom: "20px",
        color: "#333", // ✅ Dark text
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // ✅ Subtle shadow
      }}
    >
      {/* Header with Edit Icon */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #ff9800",
          paddingBottom: "10px",
        }}
      >
        <h3>Work Preferences</h3>
        <FaEdit style={{ cursor: "pointer", color: "#ff9800" }} />
      </div>

      {/* Multi-select for Preferred Roles */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontSize: "16px", color: "#ff9800" }}>
          Preferred Roles:
        </label>
        <Select
          options={roleOptions}
          isMulti
          value={selectedRoles}
          onChange={setSelectedRoles}
          styles={customStyles}
          placeholder="Select Roles"
        />
      </div>

      {/* Multi-select for Preferred Locations */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontSize: "16px", color: "#ff9800" }}>
          Preferred Locations:
        </label>
        <Select
          options={locationOptions}
          isMulti
          value={selectedLocations}
          onChange={setSelectedLocations}
          styles={customStyles}
          placeholder="Select Locations"
        />
      </div>

      {/* Relocation Preference */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontSize: "16px", color: "#ff9800" }}>
          Willing to Relocate:
        </label>
        <div>
          <label>
            <input
              type="radio"
              name="relocate"
              checked={relocate === true}
              onChange={() => setRelocate(true)}
              style={{ marginRight: "10px" }}
            />
            Yes
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="relocate"
              checked={relocate === false}
              onChange={() => setRelocate(false)}
              style={{ marginRight: "10px" }}
            />
            No
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSavePreferences}
        style={{
          background: "#ff9800",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        Save Preferences
      </button>

      {/* Modal for Save Confirmation */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: "300px",
            height: "150px",
            margin: "auto",
            textAlign: "center",
            background: "#fff", // ✅ White modal background
            color: "#333", // ✅ Dark text
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // ✅ Subtle shadow
          },
        }}
      >
        <h3 style={{ color: "#ff9800" }}>Preferences Saved!</h3>
        <p>Your work preferences have been updated.</p>
        <button
          onClick={() => setModalIsOpen(false)}
          style={{
            background: "#ff9800",
            color: "#fff",
            padding: "8px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          OK
        </button>
      </Modal>
    </div>
  );
};

export default WorkPreferences;
