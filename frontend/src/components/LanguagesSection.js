import React, { useState } from "react";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

const LanguagesSection = () => {
  const [languages, setLanguages] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [fluency, setFluency] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState([]);

  // List of Google-Recognized Languages
  const allLanguages = [
    "Afrikaans",
    "Arabic",
    "Bengali",
    "Chinese",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "French",
    "German",
    "Greek",
    "Hindi",
    "Hungarian",
    "Italian",
    "Japanese",
    "Kannada",
    "Korean",
    "Malayalam",
    "Marathi",
    "Norwegian",
    "Persian",
    "Polish",
    "Portuguese",
    "Russian",
    "Spanish",
    "Swedish",
    "Tamil",
    "Telugu",
    "Thai",
    "Tulu",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Vietnamese",
    "Zulu",
  ];

  const addLanguage = () => {
    if (newLanguage && fluency) {
      setLanguages([...languages, { name: newLanguage, fluency }]);
      setNewLanguage("");
      setFluency("");
      setFilteredLanguages([]);
      setIsAdding(false);
    }
  };

  const handleLanguageChange = (e) => {
    const input = e.target.value;
    setNewLanguage(input);
    setFilteredLanguages(
      input
        ? allLanguages.filter((lang) =>
            lang.toLowerCase().includes(input.toLowerCase())
          )
        : []
    );
  };

  const handleSelectLanguage = (lang) => {
    setNewLanguage(lang);
    setFilteredLanguages([]);
  };

  const deleteLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
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
            color: "#FF5722",
          }}
        >
          Languages Known
        </h2>

        {/* Add Language Button */}
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
            {isAdding ? "Close Form" : "Add Language"}
          </button>
        </div>

        {/* Language Form */}
        {isAdding && (
          <form
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
                Language
              </label>
              <input
                type="text"
                placeholder="Enter or Select a Language"
                value={newLanguage}
                onChange={handleLanguageChange}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "100%",
                }}
              />
              {filteredLanguages.length > 0 && (
                <ul
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    listStyleType: "none",
                    padding: "5px",
                    marginTop: "5px",
                  }}
                >
                  {filteredLanguages.map((lang, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectLanguage(lang)}
                      style={{
                        padding: "5px",
                        cursor: "pointer",
                        borderBottom:
                          index !== filteredLanguages.length - 1
                            ? "1px solid #ddd"
                            : "none",
                        fontSize: "14px",
                      }}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
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
                Fluency
              </label>
              <select
                value={fluency}
                onChange={(e) => setFluency(e.target.value)}
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                <option value="">Select Fluency</option>
                <option value="Reading">Reading</option>
                <option value="Writing">Writing</option>
                <option value="Speaking">Speaking</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <button
              onClick={addLanguage}
              type="button"
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
              Save Language
            </button>
          </form>
        )}

        {/* Display Added Languages */}
        <div>
          {languages.map((lang, index) => (
            <div
              key={index}
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
              <span>
                <strong>{lang.name}</strong> - {lang.fluency}
              </span>
              <button
                onClick={() => deleteLanguage(index)}
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

export default LanguagesSection;
