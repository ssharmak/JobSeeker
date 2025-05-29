import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar";

const Addcredits = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [credits, setCredits] = useState("");

  // Fetch institutes on mount
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(
          "https://app.teachersearch.in/api/institutionfilter/getInstitute"
        );
        setInstitutes(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch institutes", error);
      }
    };
    fetchInstitutes();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post(
        "https://app.teachersearch.in/api/auth/logoutUser",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      alert("Logged out successfully!");
      navigate("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
    setLoggingOut(false);
  };

  const handleAddCredits = () => {
    if (!selectedInstitute) {
      alert("Please select an institute.");
      return;
    }
    if (!credits) {
      alert("Please enter credits.");
      return;
    }
    // You can add your logic here to submit the credits for the selected institute
    alert(`Credits ${credits} added to ${selectedInstitute}`);
    setCredits(""); // Reset credits input after submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 bg-white shadow-md h-14">
        <div className="hidden mr-4 text-gray-700 md:block">Welcome, Admin</div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={`px-4 py-2 text-sm text-white rounded ${
            loggingOut ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </header>

      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
        loggingOut={loggingOut}
      />

      {/* Main content */}
      <main className="max-w-4xl px-6 pt-24 mx-auto md:pl-64">
        <h1 className="mb-6 text-2xl font-semibold">Add Credits</h1>

        <div className="max-w-sm mb-6">
          <label htmlFor="instituteSelect" className="block mb-2 font-medium text-gray-700">
            Select Institute
          </label>
          <select
            id="instituteSelect"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
          >
            <option value="">-- Select an Institute --</option>
            {institutes.map((inst, index) => (
              <option key={index} value={inst.name}>
                {inst.name}
              </option>
            ))}
          </select>
        </div>

        {/* Add Credits Input */}
        <div className="max-w-sm mb-6">
          <label htmlFor="creditsInput" className="block mb-2 font-medium text-gray-700">
            Enter Credits
          </label>
          <input
            id="creditsInput"
            type="number"
            placeholder="Add credits"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            min="0"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleAddCredits}
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Credits
        </button>
      </main>
    </div>
  );
};

export default Addcredits;
