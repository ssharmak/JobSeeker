import React, { useState } from "react";

const LandingPage = ({ user }) => {
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5", // Light background
        color: "#333", // Dark text for readability
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          background: "#fff", // White card background
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ddd",
          color: "#000", // Ensuring text stays dark
          textAlign: "center",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#0077b6",
          }}
        >
          Profile Overview
        </h2>

        {/* Profile Image Section */}
        <div>
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #0077b6",
              padding: "5px",
              cursor: "pointer",
            }}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="profileImageInput"
            onChange={handleImageChange}
          />
          <label
            htmlFor="profileImageInput"
            style={{
              cursor: "pointer",
              color: "#0077b6",
              fontSize: "14px",
              marginTop: "10px",
              display: "block",
            }}
          >
            Change Profile Picture
          </label>
        </div>

        {/* User Details */}
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>
            {user.name}
          </h3>

          <div style={{ textAlign: "left", padding: "0 20px" }}>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0077b6", textDecoration: "none" }}
              >
                {user.linkedin}
              </a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href={user.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0077b6", textDecoration: "none" }}
              >
                {user.github}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
