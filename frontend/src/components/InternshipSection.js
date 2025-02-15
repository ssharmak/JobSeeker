import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const InternshipSection = () => {
  const [internships, setInternships] = useState([]);
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addInternship = () => {
    if (company && startDate && endDate && startDate !== endDate) {
      setInternships([...internships, { company, startDate, endDate }]);
      setCompany("");
      setStartDate("");
      setEndDate("");
    } else {
      alert(
        "Invalid dates. Start and End date should not be the same or empty."
      );
    }
  };

  return (
    <div
      style={{ padding: "20px", background: "#1e1e2f", borderRadius: "10px" }}
    >
      <h3>
        Internships <FaEdit style={{ cursor: "pointer" }} />
      </h3>
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={addInternship}>Add</button>
    </div>
  );
};

export default InternshipSection;
