import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EmploymentSection = () => {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const addJob = () => {
    if (company && role) {
      setJobs([...jobs, { company, role }]);
      setCompany("");
      setRole("");
    }
  };

  return (
    <div
      style={{ padding: "20px", background: "#1e1e2f", borderRadius: "10px" }}
    >
      <h3>
        Employment <FaEdit style={{ cursor: "pointer" }} />
      </h3>
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={addJob}>Add</button>
    </div>
  );
};

export default EmploymentSection;
