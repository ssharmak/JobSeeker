import React, { useState, useEffect } from "react";
import { Mail, Calendar, Phone, Building2, Trash2 } from "lucide-react";
import InstitutionNavbar from "./instituteNavbar";
import axios from "axios";

const ProfilePageInst = () => {
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 🆕 Editing toggle

  useEffect(() => {
    const fetchInstitutionProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No auth token found.");
          return;
        }

        const response = await axios.get(
          "https://app.teachersearch.in/api/profile/getInstProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response",response.data);

        setInstitution(response.data?.Institute || {});
      } catch (err) {
        console.error("Error fetching institution profile:", err);
        setError("Failed to fetch institution profile");
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutionProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (field, value) => {
    setInstitution((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setInstitution(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!institution) return <div>No institution data available</div>;

  return (
    <>
      <InstitutionNavbar />
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800">Institution Profile</h1>

          <div className="p-5 space-y-4 bg-white rounded-lg shadow">
            {/* Institute Name */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                {isEditing ? (
                  <input
                    name="instituteName"
                    value={institution.instituteName || ""}
                    onChange={(e) => handleChange("instituteName", e.target.value)}
                    className="px-2 py-1 font-semibold text-gray-700 border rounded text-md"
                    placeholder="Institute Name"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-800">{institution.name}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">Last Edited: {institution.lastEdited}</p>
                <button
                  onClick={handleEditToggle}
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-red-500 hover:text-white"
                  title="Delete Institution"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              {isEditing ? (
                <input
                  type="email"
                  value={institution.emailId || ""}
                  onChange={(e) => handleChange("emailId", e.target.value)}
                  className="w-full p-2 text-sm border rounded-md"
                  placeholder="Email"
                />
              ) : (
                <p className="text-sm text-gray-700">{institution.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              {isEditing ? (
                <input
                  type="text"
                  value={institution.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full p-2 text-sm border rounded-md"
                  placeholder="Phone"
                />
              ) : (
                <p className="text-sm text-gray-700">{institution.mobile_number}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p className="text-sm text-gray-700">{institution.address?.street}</p>
              </div>
              <div className="flex items-center pl-8 space-x-3">
                <p className="text-sm text-gray-700">{institution.address?.city}, {institution.address?.state}</p>
              </div>
              <div className="flex items-center pl-8 space-x-3">
                <p className="text-sm text-gray-700">{institution.address?.country} - {institution.address?.postal_code}</p>
              </div>
            </div>


            {/* Subscription */}
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div className="text-sm text-gray-700">
                Subscription: {institution.subscriptionStartDate} to {institution.subscriptionEndDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageInst;
