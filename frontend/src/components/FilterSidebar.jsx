import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react'; // Importing the Filter icon from lucide-react

const FilterSidebar = () => {
  const filters = [
    { label: 'Must have keywords', options: ['JavaScript', 'React', 'Node.js'] },
    {
      label: 'Location',
      options: ['5 km', '10 km', '15 km', '20 km'], 
    },
    { label: 'Skills Required', options: ['Communication', 'Leadership', 'Teamwork'] },
    { label: 'Education Required', options: ['Bachelors', 'Masters', 'PhD'] },
    { label: 'Gender', options: ['Any', 'Male', 'Female'] },
    { label: 'Age', options: ['18-25', '26-35', '36-50'] },
    { label: 'Professional Qualification', options: ['B.Ed', 'M.Ed', 'Diploma'] },
    { label: 'Maximum Salary to be offered', options: ['3 LPA', '5 LPA', '10 LPA'] },
    { label: 'Maximum Notice Period (Days)', options: ['15', '30', '60', '90'] },
    { label: 'Employment Type', options: ['Full-time', 'Part-time', 'Contract'] },
  ];

  // Track the open/close state for each filter
  const [openFilters, setOpenFilters] = useState(
    filters.reduce((acc, filter) => {
      acc[filter.label] = false;
      return acc;
    }, {})
  );

  // Toggle the filter menu
  const toggleFilter = (label) => {
    setOpenFilters((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="w-full p-4 space-y-4 bg-white rounded-lg shadow-md sm:w-64">
      <h2 className="flex items-center space-x-2 text-lg font-semibold text-gray-700">
        <Filter className="text-blue-500" /> {/* Filter Icon */}
        <span>Filter</span>
      </h2>

      {filters.map((filter) => (
        <div key={filter.label}>
          <div
            className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => toggleFilter(filter.label)}
          >
            <span className="text-sm font-medium text-gray-600">{filter.label}</span>
            <ChevronDown
              className={`text-blue-500 transform transition-transform ${
                openFilters[filter.label] ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Filter options menu */}
          {openFilters[filter.label] && (
            <div className="pl-4 mt-2 space-y-2">
              {filter.options.map((option, optIdx) => (
                <div
                  key={optIdx}
                  className="p-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
