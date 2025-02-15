import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const ProfileSummary = () => {
  const [summary, setSummary] = useState("");

  return (
    <div
      style={{ padding: "20px", background: "#1e1e2f", borderRadius: "10px" }}
    >
      <h3>
        Profile Summary <FaEdit style={{ cursor: "pointer" }} />
      </h3>
      <textarea
        rows="4"
        cols="50"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write about yourself..."
      />
    </div>
  );
};

export default ProfileSummary;
