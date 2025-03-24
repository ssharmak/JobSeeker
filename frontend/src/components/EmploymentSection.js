import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmploymentSection = () => {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const addJob = () => {
    const trimmedCompany = company.trim();
    const trimmedRole = role.trim();

    if (trimmedCompany && trimmedRole) {
      // Check for duplicates
      const isDuplicate = jobs.some(
        (job) => job.company === trimmedCompany && job.role === trimmedRole
      );
      if (!isDuplicate) {
        setJobs([...jobs, { company: trimmedCompany, role: trimmedRole }]);
        setCompany("");
        setRole("");
      } else {
        alert("This job entry already exists.");
      }
    } else {
      alert("Please enter both company name and job role.");
    }
  };

  const removeJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#1e1e2f",
        borderRadius: "10px",
        color: "#fff",
      }}
    >
      <h3>
        Employment <FaEdit style={{ cursor: "pointer" }} />
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
          }}
        />
        <input
          type="text"
          placeholder="Job Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
          }}
        />
        <button
          onClick={addJob}
          style={{
            padding: "8px",
            background: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Add Job
        </button>
      </div>

      {/* Display Added Jobs */}
      <ul style={{ marginTop: "15px", listStyle: "none", padding: 0 }}>
        {jobs.map((job, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#2e2e40",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            <span>
              {job.company} - {job.role}
            </span>
            <FaTrash
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => removeJob(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmploymentSection;
