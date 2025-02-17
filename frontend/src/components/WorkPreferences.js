import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const WorkPreferences = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div
      style={{ padding: "20px", background: "#1e1e2f", borderRadius: "10px" }}
    >
      <h3>
        Work Preferences <FaEdit style={{ cursor: "pointer" }} />
      </h3>
      <input
        type="text"
        placeholder="Preferred Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="text"
        placeholder="Preferred Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
  );
};

export default WorkPreferences;
