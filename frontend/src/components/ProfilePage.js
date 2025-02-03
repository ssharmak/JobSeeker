import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa"; // Pencil icon for editing
import EditProfile from "./EditProfile";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Toggle state for dark/light mode
  const [userData, setUserData] = useState({
    name: "",
    profilePicture: "", // Placeholder for the profile picture
    college: "",
    qualification: "",
    location: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    resume: "", // Added field for resume
  });

  // Simulate fetching data from a database
  useEffect(() => {
    const fetchedData = {
      name: "Shailesh Sharma",
      profilePicture: "https://via.placeholder.com/150", // Replace with dynamic image URL
      college: "Vivekananda College of Engineering",
      qualification: "B.Tech in Computer Science",
      location: "India",
      gender: "Male",
      dob: "2004-05-12",
      phone: "+91 9876543210",
      email: "shaileshsharmakodwakere@gmail.com",
      resume: "", // Simulated resume field
    };
    setUserData(fetchedData);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle file upload (resume)
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const resumeURL = URL.createObjectURL(file);
      setUserData((prevState) => ({
        ...prevState,
        resume: resumeURL, // Store the file URL
      }));
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: isDarkMode ? "#121212" : "#f4f7fa", // Background color for dark/light mode
      fontFamily: "Arial, sans-serif",
    },
    card: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#fff",
      backgroundImage: isDarkMode
        ? "none"
        : "linear-gradient(135deg, #6e7dff, #b5e1fc)", // Colorful card in light mode
      borderRadius: "15px", // Curved edges for the card
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      width: "80%",
      maxWidth: "1000px",
      padding: "30px",
      alignItems: "center",
      border: "1px solid #ccc", // Light border for card
      transition: "all 0.3s ease-in-out",
    },
    leftSection: {
      flex: 1,
      paddingRight: "20px",
      display: "flex",
      justifyContent: "center",
    },
    profilePic: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `5px solid ${isDarkMode ? "#fff" : "#007bff"}`, // Highlighted border for dark/light mode
    },
    rightSection: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    name: {
      fontSize: "24px",
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#333", // Name color for dark/light mode
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    collegeQualification: {
      fontSize: "14px",
      color: isDarkMode ? "#bbb" : "#777", // Text color for dark/light mode
      marginTop: "5px",
    },
    separatorLine: {
      marginTop: "10px",
      height: "1px",
      backgroundColor: isDarkMode ? "#444" : "#ccc", // Line color for dark/light mode
      opacity: 0.5,
    },
    infoContainer: {
      display: "flex",
      marginTop: "15px",
      alignItems: "flex-start",
    },
    leftInfo: {
      display: "flex",
      flexDirection: "column",
      fontSize: "14px",
      color: isDarkMode ? "#bbb" : "#555", // Info text color for dark/light mode
    },
    rightInfo: {
      display: "flex",
      flexDirection: "column",
      fontSize: "14px",
      color: isDarkMode ? "#bbb" : "#555", // Info text color for dark/light mode
    },
    verticalLine: {
      borderLeft: "1px solid #ccc",
      height: "100%",
      margin: "0 20px",
    },
    editButton: {
      backgroundColor: isDarkMode ? "#007bff" : "#007bff",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
    },
    editIcon: {
      cursor: "pointer",
      marginLeft: "10px",
    },
    toggleButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      backgroundColor: isDarkMode ? "#fff" : "#333", // Toggle button color for dark/light mode
      color: isDarkMode ? "#333" : "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    resumeSection: {
      marginTop: "20px",
      fontSize: "16px",
      color: isDarkMode ? "#bbb" : "#555", // Text color for dark/light mode
    },
    resumeLink: {
      color: "#007bff",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "10px",
    },
    fileInput: {
      marginTop: "10px",
      padding: "8px",
      backgroundColor: "#f4f7fa",
      borderRadius: "5px",
    },
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Section: Profile Picture */}
        <div style={styles.leftSection}>
          <img
            src={userData.profilePicture}
            alt="Profile"
            style={styles.profilePic}
          />
        </div>

        {/* Right Section: Personal Info */}
        <div style={styles.rightSection}>
          <div style={styles.name}>
            {userData.name}
            <FaEdit style={styles.editIcon} onClick={handleEditClick} />
          </div>
          <div style={styles.collegeQualification}>
            {userData.college}, {userData.qualification}
          </div>

          {/* Separator Line */}
          <div style={styles.separatorLine}></div>

          {/* Info Container: Left (Location, Gender, DOB) */}
          <div style={styles.infoContainer}>
            <div style={styles.leftInfo}>
              <div>
                Location: <span>{userData.location}</span>
              </div>
              <div>
                Gender: <span>{userData.gender}</span>
              </div>
              <div>
                DOB: <span>{userData.dob}</span>
              </div>
            </div>

            {/* Vertical Line */}
            <div style={styles.verticalLine}></div>

            {/* Info Container: Right (Phone, Email) */}
            <div style={styles.rightInfo}>
              <div>
                Phone: <span>{userData.phone}</span>
              </div>
              <div>
                Email: <span>{userData.email}</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button style={styles.editButton} onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div style={styles.resumeSection}>
        <div>Current Resume:</div>
        {userData.resume ? (
          <a
            href={userData.resume}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.resumeLink}
          >
            View or Download Resume
          </a>
        ) : (
          <p>No resume uploaded yet.</p>
        )}

        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          style={styles.fileInput}
        />
        <div>
          <small>Upload a new resume (PDF format only).</small>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <EditProfile onClose={() => setIsEditing(false)} userData={userData} />
      )}
    </div>
  );
};

export default ProfilePage;
