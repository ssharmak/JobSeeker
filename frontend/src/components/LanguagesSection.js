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
      style={{ padding: "20px", background: "#1e1e2f", borderRadius: "10px" }}
    >
      <h3 style={{ color: "#fff" }}>
        Languages <FaEdit style={{ cursor: "pointer" }} />
      </h3>
      <input
        type="text"
        placeholder="Enter Language"
        value={newLanguage}
        onChange={handleLanguageChange}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "80%",
          marginBottom: "10px",
          fontSize: "14px",
        }}
      />
      {newLanguage && filteredLanguages.length > 0 && (
        <ul
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            position: "absolute",
            zIndex: 1,
            width: "80%",
          }}
        >
          {filteredLanguages.map((lang, index) => (
            <li
              key={index}
              onClick={() => handleSelectLanguage(lang)}
              style={{
                cursor: "pointer",
                padding: "5px",
                borderBottom: "1px solid #ccc",
                color: "#333",
                fontSize: "14px",
              }}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
      <select
        value={fluency}
        onChange={(e) => setFluency(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "80%",
          marginTop: "10px", // Added margin top for spacing
        }}
      >
        <option value="">Select Fluency</option>
        <option value="Reading">Reading</option>
        <option value="Writing">Writing</option>
        <option value="Speaking">Speaking</option>
        <option value="Expert">Expert</option>
      </select>
      <button
        onClick={addLanguage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ff6f61",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          marginTop: "20px", // Added margin top for spacing
        }}
      >
        Add
      </button>
      <ul
        style={{ listStyleType: "none", paddingLeft: "0", marginTop: "20px" }}
      >
        {languages.map((lang, index) => (
          <li key={index} style={{ color: "#fff", marginBottom: "10px" }}>
            {lang.name} - {lang.fluency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagesSection;
