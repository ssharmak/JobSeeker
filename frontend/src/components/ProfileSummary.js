import React, { useState } from "react";

const ProfileSummary = ({ userId, onSaveSummary }) => {
  const [summary, setSummary] = useState("");

  const handleSave = () => {
    // Call the onSaveSummary function passed via props to save the summary
    onSaveSummary(userId, summary);
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            margin: "0",
          }}
        >
          Profile Summary
        </h3>
        {/* Add Edit button if needed */}
      </div>

      <textarea
        rows="4"
        cols="50"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write a brief summary about your skills, experience, and goals..."
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "14px",
          borderRadius: "5px",
          border: "1px solid #ddd",
          resize: "vertical",
          boxSizing: "border-box",
          backgroundColor: "#fafafa",
          color: "#333",
          lineHeight: "1.5",
        }}
      />

      <button
        onClick={handleSave}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#ff9800",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
};

export default ProfileSummary;
