import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const LanguagesSection = () => {
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [fluency, setFluency] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState([]);

  // List of all Google-recognized languages
  const allLanguages = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chichewa",
    "Chinese",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Filipino",
    "Finnish",
    "French",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Korean",
    "Kurdish",
    "Kyrgyz",
    "Lao",
    "Latvian",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Nepali",
    "Norwegian",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Serbian",
    "Sesotho",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tagalog",
    "Tamil",
    "Telugu",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu",
  ];

  const addLanguage = () => {
    if (newLanguage && fluency) {
      setLanguages([...languages, { name: newLanguage, fluency }]);
      setNewLanguage("");
      setFluency("");
      setFilteredLanguages([]); // Clear suggestions when added
    }
  };

  const handleLanguageChange = (e) => {
    const input = e.target.value;
    setNewLanguage(input);

    // Only filter languages if the input is not empty
    if (input) {
      const filtered = allLanguages.filter((lang) =>
        lang.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredLanguages(filtered);
    } else {
      setFilteredLanguages([]); // Clear suggestions if input is empty
    }
  };

  const handleSelectLanguage = (lang) => {
    setNewLanguage(lang);
    setFilteredLanguages([]); // Clear suggestions when a language is selected
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#1e1e2f",
        borderRadius: "10px",
        width: "500px",
        margin: "0 auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          color: "#fff",
          fontSize: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Languages
        <FaEdit style={{ cursor: "pointer", color: "#3E91F9" }} />
      </h3>

      <div>
        <input
          type="text"
          placeholder="Enter Language"
          value={newLanguage}
          onChange={handleLanguageChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            marginBottom: "10px",
            border: "1px solid #ddd",
            fontSize: "14px",
            outline: "none",
          }}
        />
      </div>

      {filteredLanguages.length > 0 && newLanguage && (
        <div
          style={{
            background: "#333",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
            {filteredLanguages.map((lang, index) => (
              <li
                key={index}
                onClick={() => handleSelectLanguage(lang)}
                style={{
                  cursor: "pointer",
                  padding: "5px",
                  color: "#fff",
                  backgroundColor: "#444",
                  borderRadius: "4px",
                  marginBottom: "5px",
                }}
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "10px" }}>
        <select
          value={fluency}
          onChange={(e) => setFluency(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            width: "100%",
            fontSize: "14px",
            border: "1px solid #ddd",
            backgroundColor: "#1e1e2f",
            color: "#fff",
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
        style={{
          backgroundColor: "#3E91F9",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          width: "100%",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Add Language
      </button>

      <ul style={{ marginTop: "20px", paddingLeft: "0", color: "#fff" }}>
        {languages.map((lang, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <span>{lang.name}</span> -{" "}
            <span style={{ fontWeight: "bold" }}>{lang.fluency}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagesSection;
