import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Calendar, Phone, Building2, Trash2 } from "lucide-react";

const ProfilePageInst = () => {
  const [institutions, setInstitutions] = useState([
    {
      id: 1,
      instituteName: "Evoltech EdTech Consultancy",
      location: "India",
      emailId: "shri@evoltech.in",
      phone: "9739866955",
      subscriptionStartDate: "2025-01-01",
      subscriptionEndDate: "2025-12-31",
      lastEdited: "2024-12-04",
      isEditing: false,
    },
  ]);

  const handleEditToggle = (id) => {
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === id ? { ...inst, isEditing: !inst.isEditing } : inst
      )
    );
  };

  const handleChange = (id, field, value) => {
    setInstitutions((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, [field]: value } : inst))
    );
  };

  const handleSave = (id) => {
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === id
          ? {
              ...inst,
              lastEdited: new Date().toLocaleDateString(),
              isEditing: false,
            }
          : inst
      )
    );
  };

  const handleAddInstitution = () => {
    const newInstitution = {
      id: Date.now(),
      instituteName: "",
      location: "",
      emailId: "",
      phone: "",
      subscriptionStartDate: "",
      subscriptionEndDate: "",
      lastEdited: new Date().toLocaleDateString(),
      isEditing: true,
    };
    setInstitutions((prev) => [...prev, newInstitution]);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setInstitutions((prev) => prev.filter((inst) => inst.id !== id));
    }
  };

  const isIncomplete = (inst) => {
    return !(
      inst.instituteName &&
      inst.emailId &&
      inst.phone &&
      inst.location &&
      inst.subscriptionStartDate &&
      inst.subscriptionEndDate
    );
  };

  const formatDateRange = (start, end) => {
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (!startDate.getTime() || !endDate.getTime()) return "Invalid Date";
      return `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/InstitutionHomepage"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Back
            </Link>
            <h1 className="text-2xl font-semibold text-gray-800">
              Group Profile
            </h1>
          </div>
        </div>

        {/* Institutions List */}
        {institutions.map((inst) => (
          <div
            key={inst.id}
            className="bg-white shadow rounded-lg p-5 space-y-4"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                <div>
                  {inst.isEditing ? (
                    <input
                      name="instituteName"
                      value={inst.instituteName}
                      onChange={(e) =>
                        handleChange(inst.id, "instituteName", e.target.value)
                      }
                      className="text-md font-semibold text-gray-700 border rounded px-2 py-1"
                      placeholder="Institute Name"
                    />
                  ) : (
                    <p className="text-md font-semibold text-gray-700">
                      {inst.instituteName || "New Institution"}
                    </p>
                  )}
                  {isIncomplete(inst) && (
                    <p className="text-sm text-red-500">Incomplete</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">
                  Last Edited: {inst.lastEdited}
                </p>
                <button
                  onClick={() => handleEditToggle(inst.id)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    inst.isEditing
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {inst.isEditing ? "Cancel" : "Edit"}
                </button>
                {inst.isEditing && (
                  <button
                    onClick={() => handleSave(inst.id)}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => handleDelete(inst.id)}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-red-500 hover:text-white"
                  title="Delete Institution"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              {inst.isEditing ? (
                <input
                  type="email"
                  value={inst.emailId}
                  onChange={(e) =>
                    handleChange(inst.id, "emailId", e.target.value)
                  }
                  className="w-full border p-2 rounded-md text-sm"
                  placeholder="Email"
                />
              ) : (
                <span className="text-gray-700">{inst.emailId}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              {inst.isEditing ? (
                <input
                  type="text"
                  value={inst.phone}
                  onChange={(e) =>
                    handleChange(inst.id, "phone", e.target.value)
                  }
                  className="w-full border p-2 rounded-md text-sm"
                  placeholder="Phone"
                />
              ) : (
                <span className="text-gray-700">{inst.phone}</span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {inst.isEditing ? (
                <input
                  type="text"
                  value={inst.location}
                  onChange={(e) =>
                    handleChange(inst.id, "location", e.target.value)
                  }
                  className="w-full border p-2 rounded-md text-sm"
                  placeholder="Location"
                />
              ) : (
                <span className="text-gray-700">{inst.location}</span>
              )}
            </div>

            {/* Subscription */}
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              {inst.isEditing ? (
                <input
                  type="text"
                  value={`${inst.subscriptionStartDate} to ${inst.subscriptionEndDate}`}
                  onChange={(e) => {
                    const [start, end] = e.target.value.split(" to ");
                    handleChange(inst.id, "subscriptionStartDate", start);
                    handleChange(inst.id, "subscriptionEndDate", end || "");
                  }}
                  className="w-full border p-2 rounded-md text-sm"
                  placeholder="YYYY-MM-DD to YYYY-MM-DD"
                />
              ) : (
                <span className="text-gray-700 text-sm">
                  Subscription:{" "}
                  {formatDateRange(
                    inst.subscriptionStartDate,
                    inst.subscriptionEndDate
                  )}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Add Institution Button */}
        <div>
          <button
            onClick={handleAddInstitution}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
          >
            + Add Institution
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageInst;
