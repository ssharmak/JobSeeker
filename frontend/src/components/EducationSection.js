import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EducationSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    obtainedMarks: "",
    maxMarks: "",
    percentage: "",
    degreeType: "",
    cgpa: "",
    mastersDegreeType: "",
  });

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const calculatePercentage = () => {
    if (formValues.obtainedMarks && formValues.maxMarks) {
      const percent = (
        (formValues.obtainedMarks / formValues.maxMarks) *
        100
      ).toFixed(2);
      handleChange("percentage", percent);
    }
  };

  return (
    <div
      style={{
        background: "#1e1e2f",
        padding: "25px",
        margin: "20px 0",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        color: "white",
        width: "90%",
        transition: "0.3s",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Education</h3>
        <FaEdit
          style={{ cursor: "pointer", color: "orange", fontSize: "18px" }}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>

      {isEditing ? (
        <div>
          <label> Marks Obtained: </label>
          <input
            type="number"
            value={formValues.obtainedMarks}
            onChange={(e) => handleChange("obtainedMarks", e.target.value)}
          />

          <label> Max Marks: </label>
          <input
            type="number"
            value={formValues.maxMarks}
            onChange={(e) => handleChange("maxMarks", e.target.value)}
          />

          <label> Percentage: </label>
          <input type="text" value={formValues.percentage} readOnly />
          <button onClick={calculatePercentage}>Calculate</button>

          <button
            style={{
              background: "#ff9800",
              color: "white",
              padding: "8px 12px",
              borderRadius: "5px",
              border: "none",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() => setIsEditing(false)}
          >
            Save
          </button>
        </div>
      ) : (
        <p>
          Marks: {formValues.obtainedMarks}/{formValues.maxMarks} | Percentage:{" "}
          {formValues.percentage}%
        </p>
      )}
    </div>
  );
};

export default EducationSection;
