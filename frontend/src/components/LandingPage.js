import React, { useState } from "react";

const LandingPage = ({ user }) => {
  // State to store the selected profile image
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150" // Default image
  );

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Update the profile image state with the selected image
      };
      reader.readAsDataURL(file); // Convert the selected file to a base64 string
    }
  };

  const profileCardStyle = {
    display: "flex",
    alignItems: "center",
    background: "#2c2c3e",
    borderRadius: "15px",
    padding: "30px", // Increased padding for a larger card
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Enhanced shadow for more depth
    color: "white",
    width: "90%",
    maxWidth: "800px", // Increased the max width for a larger card
    margin: "0 auto",
    textAlign: "left",
    gap: "40px", // Added gap to increase space between picture and details
  };

  const profilePictureStyle = {
    width: "150px", // Increased size for the profile picture
    height: "150px",
    borderRadius: "50%", // Circular shape
    objectFit: "cover",
    border: "5px solid #ff9800", // Added border for the circular profile picture
    padding: "5px", // Space between image and border
    cursor: "pointer", // Indicate that the image is clickable
  };

  const detailsContainerStyle = {
    flex: 1, // Takes the rest of the space next to the profile picture
  };

  const nameStyle = {
    fontSize: "28px", // Increased font size for the name
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const roleStyle = {
    fontSize: "20px", // Increased font size for the role
    color: "#ff9800",
    marginBottom: "15px",
  };

  const contactStyle = {
    fontSize: "16px", // Adjusted font size for contact details
    marginBottom: "15px",
  };

  const linkStyle = {
    color: "#ff9800",
    textDecoration: "none",
  };

  return (
    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={profileCardStyle}>
        <div>
          {/* Profile Picture */}
          <img
            src={profileImage} // Display the selected profile image
            alt="Profile"
            style={profilePictureStyle}
          />
          {/* File input for changing profile picture */}
          <input
            type="file"
            accept="image/*" // Accept only image files
            style={{ display: "none" }} // Hide the default file input
            id="profileImageInput"
            onChange={handleImageChange} // Handle file selection
          />
          <label
            htmlFor="profileImageInput"
            style={{
              cursor: "pointer",
              color: "#ff9800",
              fontSize: "14px",
              marginTop: "10px",
              display: "block",
              textAlign: "center",
            }}
          >
            Change Profile Picture
          </label>
        </div>

        <div style={detailsContainerStyle}>
          <div style={nameStyle}>{user.name}</div>
          <div style={roleStyle}>Web Developer</div>
          <div style={contactStyle}>
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
                style={linkStyle}
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
                style={linkStyle}
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
