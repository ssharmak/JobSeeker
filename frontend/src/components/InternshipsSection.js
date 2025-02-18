import React, { useState } from "react";

const InternshipSection = () => {
  const [internships, setInternships] = useState([
    { company: "", role: "", startDate: "", endDate: "" },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInternships = [...internships];
    updatedInternships[index][name] = value;
    setInternships(updatedInternships);
  };

  const addInternship = () => {
    setInternships([
      ...internships,
      { company: "", role: "", startDate: "", endDate: "" },
    ]);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Internship Details</h2>
      {internships.map((internship, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={internship.company}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg focus:outline-blue-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Internship Role
              </label>
              <input
                type="text"
                name="role"
                value={internship.role}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg focus:outline-blue-500"
                placeholder="Enter role"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={internship.startDate}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg focus:outline-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={internship.endDate}
                onChange={(e) => handleChange(index, e)}
                className="w-full p-2 border rounded-lg focus:outline-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addInternship}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        + Add Another Internship
      </button>
    </div>
  );
};

export default InternshipSection;
