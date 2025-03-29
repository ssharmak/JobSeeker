import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const EducationSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [education, setEducation] = useState([]);
  const [formValues, setFormValues] = useState({
    tenthObtained: "",
    tenthMax: "",
    tenthPercentage: "",
    tenthSchool: "",
    tenthPassingYearMonth: "",

    twelfthObtained: "",
    twelfthMax: "",
    twelfthPercentage: "",
    twelfthSchool: "",
    twelfthPassingYearMonth: "",

    degreeType: "",
    degreePercentage: "",
    cgpa: "",
    aggregate: "",
    degreeCollege: "",
    degreePassingYearMonth: "",
    degreePursuing: false,

    mastersDegreeType: "",
    mastersPercentage: "",
    mastersCollege: "",
    mastersPassingYearMonth: "",
    mastersPursuing: false,

    diplomaPercentage: "",
    diplomaCollege: "",
    diplomaPassingYearMonth: "",
    diplomaPursuing: false,
  });

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handlePursuingChange = (field, value) => {
    if (value) {
      setFormValues((prev) => ({
        ...prev,
        degreePursuing: field === "degreePursuing" ? value : false,
        mastersPursuing: field === "mastersPursuing" ? value : false,
        diplomaPursuing: field === "diplomaPursuing" ? value : false,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const calculatePercentage = (obtained, max, key) => {
    if (obtained && max) {
      const percent = ((obtained / max) * 100).toFixed(2);
      handleChange(key, percent);
    }
  };

  const saveEducation = (section) => {
    // You can choose to save data in a different state or call an API to save it
    console.log(`${section} saved`, formValues);
    alert(`${section} saved successfully!`);
  };

  return (
    <div
      style={{
        background: "#f4f4f9",
        padding: "30px",
        margin: "20px 0",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        color: "#333",
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
        <h3 style={{ fontSize: "24px", fontWeight: "600" }}>Education</h3>
        <FaEdit
          style={{ cursor: "pointer", color: "#ff6f61", fontSize: "20px" }}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>

      {isEditing ? (
        <div>
          {/* 10th Marks */}
          <h4>10th Marks</h4>
          <input
            type="number"
            placeholder="Obtained Marks"
            value={formValues.tenthObtained}
            onChange={(e) => handleChange("tenthObtained", e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Total Marks"
            value={formValues.tenthMax}
            onChange={(e) => handleChange("tenthMax", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            value={formValues.tenthPercentage}
            readOnly
            style={inputStyle}
          />
          <button
            onClick={() =>
              calculatePercentage(
                formValues.tenthObtained,
                formValues.tenthMax,
                "tenthPercentage"
              )
            }
            style={buttonStyle}
          >
            Calculate
          </button>
          <input
            type="text"
            placeholder="School Name"
            value={formValues.tenthSchool}
            onChange={(e) => handleChange("tenthSchool", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Passing Year and Month"
            value={formValues.tenthPassingYearMonth}
            onChange={(e) =>
              handleChange("tenthPassingYearMonth", e.target.value)
            }
            title="Enter the passing year and month"
            style={inputStyle}
          />
          <button onClick={() => saveEducation("10th")} style={saveButtonStyle}>
            Save 10th Education
          </button>

          {/* 12th Marks */}
          <h4>12th Marks</h4>
          <input
            type="number"
            placeholder="Obtained Marks"
            value={formValues.twelfthObtained}
            onChange={(e) => handleChange("twelfthObtained", e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Total Marks"
            value={formValues.twelfthMax}
            onChange={(e) => handleChange("twelfthMax", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            value={formValues.twelfthPercentage}
            readOnly
            style={inputStyle}
          />
          <button
            onClick={() =>
              calculatePercentage(
                formValues.twelfthObtained,
                formValues.twelfthMax,
                "twelfthPercentage"
              )
            }
            style={buttonStyle}
          >
            Calculate
          </button>
          <input
            type="text"
            placeholder="College Name"
            value={formValues.twelfthSchool}
            onChange={(e) => handleChange("twelfthSchool", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Passing Year and Month"
            value={formValues.twelfthPassingYearMonth}
            onChange={(e) =>
              handleChange("twelfthPassingYearMonth", e.target.value)
            }
            title="Enter the passing year and month"
            style={inputStyle}
          />
          <button onClick={() => saveEducation("12th")} style={saveButtonStyle}>
            Save 12th Education
          </button>

          {/* Degree Section */}
          <h4>Degree</h4>
          <select
            value={formValues.degreeType}
            onChange={(e) => handleChange("degreeType", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Degree</option>
            <option value="BE/BTech">BE/BTech</option>
            <option value="BSc">BSc</option>
            <option value="BCom">BCom</option>
            <option value="BA">BA</option>
            <option value="Other">Other</option>
          </select>

          {formValues.degreeType === "BE/BTech" ? (
            <>
              <input
                type="number"
                placeholder="CGPA"
                value={formValues.cgpa}
                onChange={(e) => handleChange("cgpa", e.target.value)}
                style={inputStyle}
              />
              <input
                type="number"
                placeholder="Aggregate"
                value={formValues.aggregate}
                onChange={(e) => handleChange("aggregate", e.target.value)}
                style={inputStyle}
              />
            </>
          ) : (
            <input
              type="number"
              placeholder="Percentage"
              value={formValues.degreePercentage}
              onChange={(e) => handleChange("degreePercentage", e.target.value)}
              style={inputStyle}
            />
          )}

          <input
            type="text"
            placeholder="College Name"
            value={formValues.degreeCollege}
            onChange={(e) => handleChange("degreeCollege", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Passing Year and Month"
            value={formValues.degreePassingYearMonth}
            onChange={(e) =>
              handleChange("degreePassingYearMonth", e.target.value)
            }
            title="Enter the passing year and month"
            style={inputStyle}
          />
          <label>
            Currently Pursuing:
            <input
              type="checkbox"
              checked={formValues.degreePursuing}
              onChange={(e) =>
                handlePursuingChange("degreePursuing", e.target.checked)
              }
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button
            onClick={() => saveEducation("Degree")}
            style={saveButtonStyle}
          >
            Save Degree Education
          </button>

          {/* Masters Section */}
          <h4>Masters</h4>
          <select
            value={formValues.mastersDegreeType}
            onChange={(e) => handleChange("mastersDegreeType", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Degree</option>
            <option value="MTech">MTech</option>
            <option value="MSc">MSc</option>
            <option value="MBA">MBA</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Percentage"
            value={formValues.mastersPercentage}
            onChange={(e) => handleChange("mastersPercentage", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="College Name"
            value={formValues.mastersCollege}
            onChange={(e) => handleChange("mastersCollege", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Passing Year and Month"
            value={formValues.mastersPassingYearMonth}
            onChange={(e) =>
              handleChange("mastersPassingYearMonth", e.target.value)
            }
            title="Enter the passing year and month"
            style={inputStyle}
          />
          <label>
            Currently Pursuing:
            <input
              type="checkbox"
              checked={formValues.mastersPursuing}
              onChange={(e) =>
                handlePursuingChange("mastersPursuing", e.target.checked)
              }
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button
            onClick={() => saveEducation("Masters")}
            style={saveButtonStyle}
          >
            Save Masters Education
          </button>

          {/* Diploma Section */}
          <h4>Diploma</h4>
          <input
            type="number"
            placeholder="Percentage"
            value={formValues.diplomaPercentage}
            onChange={(e) => handleChange("diplomaPercentage", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="College Name"
            value={formValues.diplomaCollege}
            onChange={(e) => handleChange("diplomaCollege", e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Passing Year and Month"
            value={formValues.diplomaPassingYearMonth}
            onChange={(e) =>
              handleChange("diplomaPassingYearMonth", e.target.value)
            }
            title="Enter the passing year and month"
            style={inputStyle}
          />
          <label>
            Currently Pursuing:
            <input
              type="checkbox"
              checked={formValues.diplomaPursuing}
              onChange={(e) =>
                handlePursuingChange("diplomaPursuing", e.target.checked)
              }
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button
            onClick={() => saveEducation("Diploma")}
            style={saveButtonStyle}
          >
            Save Diploma Education
          </button>
        </div>
      ) : (
        <div>
          {education.map((item, index) => (
            <h4 key={index}>
              {item.degreeType} - {item.degreeCollege}{" "}
              <span>({item.degreePassingYearMonth})</span>
            </h4>
          ))}
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  marginTop: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#ff6f61",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "15px",
  display: "inline-block",
};

const saveButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#4CAF50",
  border: "none",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "15px",
  display: "inline-block",
};

export default EducationSection;
