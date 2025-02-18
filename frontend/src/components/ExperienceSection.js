import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ExperienceSection = () => {
  const [experience, setExperience] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDuration, setTotalDuration] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Helper function to check if a date is a Sunday
  const isSunday = (date) => new Date(date).getDay() === 0; // 0 represents Sunday

  // Helper function to calculate duration between two dates
  const calculateDuration = (start, end) => {
    if (!start || !end) return "";

    const startObj = new Date(start);
    const endObj = new Date(end);
    const diffTime = endObj - startObj;

    if (diffTime < 0) return "Invalid dates";

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const days = diffDays % 365;

    return { years, days, totalDays: diffDays };
  };

  // Helper function to calculate total experience
  const calculateTotalExperience = (experiences) => {
    const totalDays = experiences.reduce((acc, job) => {
      const duration = calculateDuration(job.startDate, job.endDate);
      return acc + duration.totalDays;
    }, 0);

    const years = Math.floor(totalDays / 365);
    const days = totalDays % 365;

    return `${years} year(s) and ${days} day(s)`;
  };

  const addExperience = () => {
    if (!company || !role || !startDate || !endDate) {
      alert("Please fill all fields!");
      return;
    }

    if (isSunday(startDate) || isSunday(endDate)) {
      alert("Start and End dates cannot be Sundays!");
      return;
    }

    if (startDate > today) {
      alert("Start date cannot be in the future!");
      return;
    }

    if (endDate > today) {
      alert("End date cannot be in the future!");
      return;
    }

    const duration = calculateDuration(startDate, endDate);

    if (duration === "Invalid dates") {
      alert("End date must be after Start date!");
      return;
    }

    const newExperience = { company, role, startDate, endDate, duration };
    const updatedExperience = [...experience, newExperience];
    setExperience(updatedExperience);

    // Clear input fields
    setCompany("");
    setRole("");
    setStartDate("");
    setEndDate("");

    // Update total experience
    setTotalDuration(calculateTotalExperience(updatedExperience));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        color: "#333",
        width: "90%",
        margin: "20px auto",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3
          style={{
            color: "#444",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Experience
        </h3>
        <FaEdit
          style={{ cursor: "pointer", color: "#f59e0b", fontSize: "20px" }}
        />
      </div>

      {/* Input Fields */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{
            padding: "10px",
            width: "45%",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />
        <input
          type="text"
          placeholder="Job Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "10px",
            width: "45%",
            borderRadius: "5px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <div>
          <label
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "5px",
              display: "block",
            }}
          >
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
            max={today}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "5px",
              display: "block",
            }}
          >
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
            max={today}
          />
        </div>
      </div>

      {/* Add Experience Button */}
      <button
        onClick={addExperience}
        style={{
          padding: "10px 15px",
          backgroundColor: "#f59e0b",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        Add Experience
      </button>

      {/* Experience List */}
      <ul style={{ paddingLeft: "0", marginTop: "20px" }}>
        {experience.map((job, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <strong style={{ fontSize: "16px", color: "#333" }}>
              {job.company}
            </strong>{" "}
            - {job.role}
            <br />
            <span
              style={{
                fontSize: "12px",
                color: "#888",
                marginTop: "8px",
                display: "block",
              }}
            >
              {job.startDate} to {job.endDate} ({job.duration.years} year(s) and{" "}
              {job.duration.days} day(s))
            </span>
          </li>
        ))}
      </ul>

      {/* Total Work Experience */}
      {experience.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            border: "1px solid #f8d7da",
            textAlign: "center",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4
            style={{
              color: "#856404",
              fontWeight: "bold",
            }}
          >
            Total Work Experience: {totalDuration}
          </h4>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
