import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const LanguagesSection = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [fluency, setFluency] = useState("");

  const addLanguage = () => {
    if (newLanguage && fluency) {
      setLanguages([...languages, { name: newLanguage, fluency }]);
      setNewLanguage("");
      setFluency("");
    }
  };

  return (
    <div style={{ padding: "20px", background: "#1e1e2f", borderRadius: "10px" }}>
      <h3>Languages <FaEdit style={{ cursor: "pointer" }} /></h3>
      <input type="text" placeholder="Enter Language" value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} />
      <select value={fluency} onChange={(e) => setFluency(e.target.value)}>
        <option value="">Select Fluency</option>
        <option value="Reading">Reading</option>
        <option value="Writing">Writing</option>
        <option value="Speaking">Speaking</option>
        <option value="Expert">Expert</option>
      </select>
      <button onClick={addLanguage}>Add</button>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang.name} - {lang.fluency}</li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagesSection;
