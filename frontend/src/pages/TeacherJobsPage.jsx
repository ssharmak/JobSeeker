import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Building, MapPin, Clock } from 'lucide-react';

const TeacherJobsPage = () => {
  const { location } = useParams();
  const navigate = useNavigate();

  const formatLocation = (loc) => {
    if (!loc) return "Bengaluru";
    const locationMap = {
      bangalore: "Bengaluru",
      hyderabad: "Hyderabad",
      delhi: "Delhi",
      mumbai: "Mumbai",
      chennai: "Chennai",
      kolkata: "Kolkata",
      pune: "Pune",
    };
    return locationMap[loc.toLowerCase()] || loc;
  };

  const [selectedFilters, setSelectedFilters] = useState({
    location: formatLocation(location),
  });

  useEffect(() => {
    setSelectedFilters((prev) => ({
      ...prev,
      location: formatLocation(location),
    }));
  }, [location]);

  const experienceYears = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const locations = [
    { name: "Bengaluru", count: 524 },
    { name: "Hyderabad", count: 402 },
    { name: "Mumbai", count: 298 },
    { name: "Chennai", count: 215 },
    { name: "Delhi", count: 177 },
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="container flex flex-col items-center justify-between p-4 mx-auto sm:flex-row">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src="/logo.png" alt="Jobs in Education" className="h-10" />
          </div>
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <a href="/" className="text-sm text-gray-700 hover:text-blue-600 sm:text-base">Home</a>
            <a href="/jobs" className="text-sm text-gray-700 hover:text-blue-600 sm:text-base">Jobs</a>
            <a href="/plans" className="text-sm text-gray-700 hover:text-blue-600 sm:text-base">Plans</a>
            <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 sm:text-base">Book a Demo</button>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 sm:text-base">Login</button>
            <button className="px-6 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 sm:text-base">Registration for Free</button>
          </div>
        </nav>
      </header>

      {/* Search */}
      <section className="py-6 bg-blue-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute w-5 h-5 text-gray-400 left-4 top-3" />
              <input
                type="text"
                placeholder={`teacher jobs near ${selectedFilters.location.toLowerCase()}`}
                className="w-full py-3 pl-12 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
              />
            </div>
            <button className="px-8 py-3 mt-4 text-sm text-white bg-blue-600 rounded-md sm:mt-0 sm:ml-4 hover:bg-blue-700 sm:text-base">Search</button>
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap items-center justify-between mt-4 space-x-2 overflow-x-auto sm:flex-nowrap">
            {["Job Type", "Institute Type", "Subcategory", "Level/Exam Type", "Role", "Subject", "Non Academic Type"].map((item, idx) => (
              <div className="min-w-max" key={idx}>
                <select className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base">
                  <option>{item}</option>
                </select>
              </div>
            ))}
            <button className="px-4 py-2 text-sm text-blue-600 bg-transparent rounded-md hover:bg-blue-50 sm:text-base">Reset</button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container px-4 py-6 mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* Sidebar */}
          <aside className="w-full px-4 mb-6 sm:w-1/4 sm:mb-0">
            <div className="p-4 mb-4 bg-white rounded-lg shadow-sm">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-800 sm:text-xl">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
              </h3>

              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700 sm:text-base">Applied Filters</h4>
                {Object.keys(selectedFilters).map((filter) => (
                  <div key={filter} className="inline-block px-3 py-1 mb-2 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                    {selectedFilters[filter]}
                    <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                  </div>
                ))}
              </div>

              <div className="pt-4 mb-4 border-t">
                <h4 className="mb-3 text-sm font-medium text-gray-700 sm:text-base">Location</h4>
                {locations.map((loc) => (
                  <div key={loc.name} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`location-${loc.name}`}
                      name="location"
                      checked={selectedFilters.location === loc.name}
                      onChange={() => setSelectedFilters({ ...selectedFilters, location: loc.name })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`location-${loc.name}`} className="ml-2 text-sm text-gray-700 sm:text-base">
                      {loc.name} ({loc.count})
                    </label>
                  </div>
                ))}
              </div>

              <div className="pt-4 mb-4 border-t">
                <h4 className="mb-3 text-sm font-medium text-gray-700 sm:text-base">Experience Required (years)</h4>
                <div className="flex flex-wrap gap-2">
                  {experienceYears.map((year) => (
                    <div key={year} className="flex items-center justify-center w-8 h-8 text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-blue-50">
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative p-4 rounded-lg bg-blue-50">
              <div className="absolute px-2 py-1 text-xs text-white bg-blue-600 rounded right-4 top-4">NEW</div>
              <h3 className="mb-2 text-sm font-medium text-blue-800 sm:text-base">Online Courses</h3>
              <button className="w-full px-4 py-2 mt-3 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 sm:text-base">Chat with us</button>
            </div>
          </aside>

          {/* Main Listings */}
          <section className="w-full px-4 sm:w-3/4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                1 - 20 of 1304 Vacancies - Apply To 1304 Teacher Jobs Near {selectedFilters.location} - Vacancies
              </h2>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-600 sm:text-base">Sorting:</span>
                <select className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md sm:text-base">
                  <option>Freshness</option>
                  <option>Relevance</option>
                </select>
              </div>
            </div>

            {/* Sample Job Card */}
            <div className="p-6 mb-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-lg">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 sm:text-base">Presidency Group of Schools</h3>
                </div>
              </div>

              <h4 className="mb-3 text-sm text-lg font-medium text-blue-600 sm:text-base">
                Looking for PRT Hindi Teacher at Presidency School Nandini Layout
              </h4>

              <div className="flex items-center mb-4 text-sm text-gray-600 sm:text-base">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                <span>Bengaluru (Nandini Layout)</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 sm:text-base">
                <Clock className="w-4 h-4 mr-2 text-yellow-500" />
                <span>1-3 years experience</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TeacherJobsPage;
