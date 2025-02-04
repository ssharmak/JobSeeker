import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    profilePicture: "",
    college: "",
    qualification: "",
    location: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    resume: "",
    profileCompletion: 69, // Simulating profile progress
  });

  useEffect(() => {
    const fetchedData = {
      name: "Shailesh Sharma K",
      profilePicture: "https://via.placeholder.com/130",
      college: "Vivekananda College of Engineering",
      qualification: "B.Tech in Computer Science",
      location: "Kasargode",
      gender: "Male",
      dob: "11th July 2004",
      phone: "6235053469",
      email: "shaileshsharmakodwakere@gmail.com",
      resume: "",
      profileCompletion: 69,
    };
    setUserData(fetchedData);
  }, []);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const resumeURL = URL.createObjectURL(file);
      setUserData((prevState) => ({
        ...prevState,
        resume: resumeURL,
      }));
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        {/* Profile Image with Progress */}
        <div style={styles.profileImageContainer}>
          <svg style={styles.progressCircle} viewBox="0 0 100 100">
            <circle
              style={styles.progressTrail}
              cx="50"
              cy="50"
              r="48.5"
            ></circle>
            <circle
              style={{
                ...styles.progressPath,
                strokeDashoffset: `${
                  304.734 * ((100 - userData.profileCompletion) / 100)
                }px`,
              }}
              cx="50"
              cy="50"
              r="48.5"
            ></circle>
          </svg>
          <div style={styles.profileImageOverlay}>
            <div style={styles.percentage}>{userData.profileCompletion}%</div>
            <img
              src={userData.profilePicture}
              alt="Profile"
              style={styles.profilePic}
            />
            <div style={styles.replacePhoto}>
              <img
                src="//static.naukimg.com/s/8/801/i/src/resources/svg/image-edit-new.aa3eb267.svg"
                height="14"
                width="14"
                alt=""
              />
              <span>Replace photo</span>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div style={styles.profileDetails}>
          <h1 style={styles.name}>
            {userData.name}
            <FaEdit style={styles.editIcon} onClick={handleEditClick} />
          </h1>
          <h2 style={styles.qualification}>{userData.qualification}</h2>
          <h2 style={styles.college}>{userData.college}</h2>

          {/* Separator */}
          <div style={styles.separator}></div>

          {/* User Details */}
          <div style={styles.userInfo}>
            <div style={styles.leftInfo}>
              <div>📍 {userData.location}</div>
              <div>🧑 {userData.gender}</div>
              <div>🎂 {userData.dob}</div>
            </div>
            <div style={styles.rightInfo}>
              <div>📞 {userData.phone} ✅</div>
              <div>📧 {userData.email} ✅</div>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div style={styles.resumeSection}>
            <h3 style={styles.resumeTitle}>Resume</h3>
            {userData.resume ? (
              <div style={styles.resumeInfo}>
                <a
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.resumeLink}
                >
                  📄 View/Download Resume
                </a>
                <button
                  style={styles.uploadButton}
                  onClick={() =>
                    document.getElementById("resumeUpload").click()
                  }
                >
                  <FaEdit /> Edit Resume
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  id="resumeUpload"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  style={styles.hiddenFileInput}
                />
                <button
                  style={styles.uploadButton}
                  onClick={() =>
                    document.getElementById("resumeUpload").click()
                  }
                >
                  📤 Upload Resume (PDF only)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <EditProfile onClose={() => setIsEditing(false)} userData={userData} />
      )}
    </div>
  );
};

/* Styles */
const styles = {
  container: {
    fontFamily: "Satoshi, sans-serif",
    colorScheme: "dark",
    backgroundColor: "#1d1c19",
    color: "#fffddd",
    padding: "20px",
    boxSizing: "border-box",
  },
  profileCard: {
    display: "flex",
    flexDirection: "row",
    background: "#21211d",
    borderRadius: "15px",
    boxShadow: "0 12px 15px rgba(0, 0, 0, 0.25)",
    padding: "40px",
    alignItems: "center",
    border: "1px solid #545149",
  },
  profileImageContainer: {
    position: "relative",
    width: "130px",
    height: "130px",
    marginRight: "30px",
  },
  progressCircle: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  profileImageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    borderRadius: "50%",
    width: "130px",
    height: "130px",
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fffddd",
  },
  qualification: {
    fontSize: "14px",
    color: "#7aa7c2",
  },
  separator: {
    height: "1px",
    backgroundColor: "#545149",
    margin: "20px 0",
  },
  userInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  resumeSection: {
    marginTop: "20px",
  },
  resumeTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#7aa7c2",
  },
  resumeInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  resumeLink: {
    color: "#7aa7c2",
    textDecoration: "underline",
  },
  uploadButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  hiddenFileInput: {
    display: "none",
  },
};

export default ProfilePage;
