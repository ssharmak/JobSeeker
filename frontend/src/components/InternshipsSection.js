import React, { useState } from "react";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

const InternshipSection = () => {
  const [internships, setInternships] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Get today's date and tomorrow's date
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Format date in YYYY-MM-DD for comparison
  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isSunday = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDay() === 0; // Sunday is 0 in JS Date
  };

  const isInvalidDate = (dateStr) => {
    const selectedDate = new Date(dateStr);
    return selectedDate.getTime() === tomorrow.getTime(); // Compare with tomorrow
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !formData.company ||
      !formData.role ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.description
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    if (isSunday(formData.startDate) || isSunday(formData.endDate)) {
      alert("Start Date or End Date cannot be a Sunday.");
      return;
    }

    if (isInvalidDate(formData.startDate) || isInvalidDate(formData.endDate)) {
      alert("Start Date or End Date cannot be the next day from today.");
      return;
    }

    setInternships([...internships, { ...formData, id: Date.now() }]);
    setFormData({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsAdding(false);
  };

  const deleteInternship = (id) => {
    setInternships(internships.filter((internship) => internship.id !== id));
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "inherit",
        color: "inherit",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ddd",
          color: "#000",
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
          Internship Details
        </h2>

        {/* Add Internship Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => setIsAdding(!isAdding)}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#0077b6",
              color: "white",
              padding: "10px 18px",
              fontSize: "16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <FaPlusCircle style={{ marginRight: "5px" }} />
            {isAdding ? "Close Form" : "Add Internship"}
          </button>
        </div>

        {/* Internship Form */}
        {isAdding && (
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#f9f9f9",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "15px",
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Enter company name"
                value={formData.company}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Role
              </label>
              <input
                type="text"
                name="role"
                placeholder="Enter your role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your internship experience"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background: "#28a745",
                color: "white",
                padding: "10px",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "6px",
                transition: "0.3s",
              }}
            >
              Save Internship
            </button>
          </form>
        )}

        {/* Display Added Internships */}
        <div>
          {internships.map((internship) => (
            <div
              key={internship.id}
              style={{
                background: "#fff",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{internship.company}</strong> - {internship.role}
                <p style={{ fontSize: "14px", color: "#555" }}>
                  {internship.startDate} to {internship.endDate}
                </p>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  {internship.description}
                </p>
              </div>
              <button
                onClick={() => deleteInternship(internship.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InternshipSection;
