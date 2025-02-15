import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ProfileSection = ({ id, title, educationType, setFormData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    obtainedMarks: "",
    maxMarks: "",
    percentage: "",
    degreeType: "",
    cgpa: "",
    mastersDegreeType: "", // New field for Master's degree
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setFormData((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  // Calculate percentage dynamically
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
        <h3>{title}</h3>
        <FaEdit
          style={{ cursor: "pointer", color: "orange", fontSize: "18px" }}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>

      {isEditing ? (
        <div>
          {/* For 10th, 12th, Diploma - Marks Entry */}
          {["10th", "12th", "Diploma"].includes(educationType) && (
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
            </div>
          )}

          {/* For Degree Section */}
          {educationType === "Degree" && (
            <div>
              <label> Select Degree: </label>
              <select
                value={formValues.degreeType}
                onChange={(e) => handleChange("degreeType", e.target.value)}
              >
                <option value="">-- Select Degree --</option>
                <option value="B.E / B.Tech">B.E / B.Tech</option>
                <option value="BSc">BSc</option>
                <option value="B.Com">B.Com</option>
                <option value="B.A">B.A</option>
                <option value="BBA">BBA</option>
                <option value="BCA">BCA</option>
                <option value="B.Pharm">B.Pharm</option>
                <option value="B.Arch">B.Arch</option>
                <option value="B.Ed">B.Ed</option>
                <option value="B.LLB">B.LLB</option>
                <option value="B.Des">B.Des</option>
              </select>

              <label> Percentage: </label>
              <input
                type="number"
                value={formValues.percentage}
                onChange={(e) => handleChange("percentage", e.target.value)}
              />

              {formValues.degreeType === "B.E / B.Tech" && (
                <>
                  <label> CGPA: </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formValues.cgpa}
                    onChange={(e) => handleChange("cgpa", e.target.value)}
                  />
                </>
              )}
            </div>
          )}

          {/* For Masters Degree Section */}
          {educationType === "Masters" && (
            <div>
              <label> Select Master's Degree: </label>
              <select
                value={formValues.mastersDegreeType}
                onChange={(e) =>
                  handleChange("mastersDegreeType", e.target.value)
                }
              >
                <option value="">-- Select Master's Degree --</option>
                <option value="M.E / M.Tech">M.E / M.Tech</option>
                <option value="MSc">MSc</option>
                <option value="M.Com">M.Com</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
                <option value="M.Pharm">M.Pharm</option>
                <option value="M.Arch">M.Arch</option>
                <option value="LLM">LLM</option>
                <option value="M.Des">M.Des</option>
              </select>

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
            </div>
          )}

          {/* Save Button inside Section to Update Locally */}
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
            onClick={() => setIsEditing(false)} // Close edit mode after saving
          >
            Save Section
          </button>
        </div>
      ) : (
        <p>
          {["10th", "12th", "Diploma"].includes(educationType)
            ? `Marks: ${formValues.obtainedMarks}/${formValues.maxMarks} | Percentage: ${formValues.percentage}%`
            : educationType === "Degree"
            ? `Degree: ${formValues.degreeType} | Percentage: ${
                formValues.percentage
              }% ${
                formValues.degreeType === "B.E / B.Tech"
                  ? `| CGPA: ${formValues.cgpa}`
                  : ""
              }`
            : educationType === "Masters"
            ? `Master's Degree: ${formValues.mastersDegreeType} | Marks: ${formValues.obtainedMarks}/${formValues.maxMarks} | Percentage: ${formValues.percentage}%`
            : ""}
        </p>
      )}
    </div>
  );
};

export default ProfileSection;
