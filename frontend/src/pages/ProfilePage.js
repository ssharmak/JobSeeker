import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileSection from "../components/ProfileSection";

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("education");
  const [formData, setFormData] = useState({}); // Stores all input values

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/saveProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save changes.");
    }
  };

  const profileContainerStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
  };

  const contentStyle = {
    flex: 1,
    padding: "40px",
    marginLeft: "260px",
    overflowY: "scroll",
    height: "100vh",
  };

  const saveButtonStyle = {
    background: "#28a745",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "block",
    width: "100%",
    marginTop: "20px",
  };

  return (
    <div style={profileContainerStyle}>
      <Sidebar setSelectedSection={setSelectedSection} />
      <div style={contentStyle}>
        {selectedSection === "education" && (
          <>
            <ProfileSection
              id="education-10th"
              title="10th Grade"
              educationType="10th"
              setFormData={setFormData}
            />
            <ProfileSection
              id="education-12th"
              title="12th Grade"
              educationType="12th"
              setFormData={setFormData}
            />
            <ProfileSection
              id="education-diploma"
              title="Diploma"
              educationType="Diploma"
              setFormData={setFormData}
            />
            <ProfileSection
              id="education-degree"
              title="Degree"
              educationType="Degree"
              setFormData={setFormData}
            />
            <ProfileSection
              id="education-masters"
              title="Masters Degree"
              educationType="Masters"
              setFormData={setFormData}
            />
          </>
        )}

        {/* Save Changes Button */}
        <button style={saveButtonStyle} onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
