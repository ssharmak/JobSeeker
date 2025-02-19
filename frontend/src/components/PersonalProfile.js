import React, { useState } from "react";

const PersonalProfile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [resumeError, setResumeError] = useState(""); // Track resume file format errors

  // Regex Patterns for Validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/; // Only @gmail.com & @outlook.com allowed
  const phoneRegex = /^[0-9]{10}$/; // 10-digit Phone Number

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (
        today <
        new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
      ) {
        age--;
      }
      setUser((prev) => ({ ...prev, age: age > 0 ? age : "" }));
    }
  };

  // Handle Resume Upload (Only PDF Allowed)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.endsWith(".pdf")) {
      setResumeError("❌ Only PDF files are allowed.");
      setUser({ ...user, resume: "" });
    } else {
      setResumeError("");
      setUser({ ...user, resume: file ? file.name : "" });
    }
  };

  // Check if all required fields are valid
  const isFormValid =
    user.name.match(nameRegex) &&
    user.email.match(emailRegex) &&
    user.phone.match(phoneRegex) &&
    user.dob &&
    user.address &&
    user.github &&
    user.linkedin &&
    user.resume &&
    !resumeError;

  // Handle Save Profile
  const handleSave = () => {
    if (!isFormValid) return;

    setIsEditing(false);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          {isEditing ? "Edit Profile" : "Profile Details"}
        </h2>

        {isEditing ? (
          <form>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              style={inputStyle}
            />
            {!user.name.match(nameRegex) && user.name && (
              <p style={errorStyle}>❌ Name must contain only letters</p>
            )}

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              style={inputStyle}
            />
            {!user.email.match(emailRegex) && user.email && (
              <p style={errorStyle}>
                ❌ Email must end with @gmail.com or @outlook.com
              </p>
            )}

            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              style={inputStyle}
            />
            {!user.phone.match(phoneRegex) && user.phone && (
              <p style={errorStyle}>❌ Enter a valid 10-digit phone number</p>
            )}

            <input
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="age"
              value={user.age}
              readOnly
              placeholder="Age"
              style={{ ...inputStyle, background: "#f5f5f5" }}
            />

            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              placeholder="Address"
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="github"
              value={user.github}
              onChange={handleChange}
              placeholder="GitHub Link"
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="linkedin"
              value={user.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Link"
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="hackerrank"
              value={user.hackerrank}
              onChange={handleChange}
              placeholder="HackerRank Link (Optional)"
              style={inputStyle}
            />

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              style={inputStyle}
            />
            {resumeError && <p style={errorStyle}>{resumeError}</p>}
            {user.resume && !resumeError && (
              <p style={{ fontSize: "14px", color: "#0077b6" }}>
                Uploaded: {user.resume}
              </p>
            )}

            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleSave}
              style={saveButtonStyle}
            >
              Save Profile
            </button>
          </form>
        ) : (
          <div style={profileCardStyle}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>DOB:</strong> {user.dob} (Age: {user.age})
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>GitHub:</strong> {user.github}
            </p>
            <p>
              <strong>LinkedIn:</strong> {user.linkedin}
            </p>
            {user.hackerrank && (
              <p>
                <strong>HackerRank:</strong> {user.hackerrank}
              </p>
            )}
            <p>
              <strong>Resume:</strong> {user.resume}
            </p>
            <button onClick={() => setIsEditing(true)} style={editButtonStyle}>
              Edit Profile
            </button>
          </div>
        )}

        {/* Success Popup */}
        {showPopup && (
          <div style={popupStyle}>✅ Profile saved successfully! 🎉</div>
        )}
      </div>
    </div>
  );
};

// ✅ Styles
const containerStyle = {
  padding: "30px",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "inherit",
  color: "inherit",
};
const cardStyle = {
  maxWidth: "800px",
  width: "100%",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  border: "1px solid #ddd",
  color: "#000",
};
const titleStyle = {
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#0077b6",
};
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
};
const errorStyle = { color: "red", fontSize: "12px", marginBottom: "10px" };
const saveButtonStyle = {
  width: "100%",
  background: "#28a745",
  color: "white",
  padding: "12px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "6px",
  transition: "0.3s",
};
const profileCardStyle = {
  background: "#f9f9f9",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  textAlign: "left",
};
const editButtonStyle = {
  width: "100%",
  background: "#0077b6",
  color: "white",
  padding: "12px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "6px",
  transition: "0.3s",
  marginTop: "10px",
};
const popupStyle = {
  position: "fixed",
  top: "10px",
  right: "10px",
  background: "#28a745",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
};

export default PersonalProfile;
