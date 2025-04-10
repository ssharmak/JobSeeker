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
        <nav className="container flex items-center justify-between p-4 mx-auto">
          <div className="flex items-center">
            <img src="/logo.png" alt="Jobs in Education" className="h-10" />
          </div>
          <div className="flex items-center space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="/jobs" className="text-gray-700 hover:text-blue-600">Jobs</a>
            <a href="/plans" className="text-gray-700 hover:text-blue-600">Plans</a>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 text-gray-700">Book a Demo</button>
          </div>
          <div className="flex space-x-3">
            <button className="px-6 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">Login</button>
            <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Registration for Free</button>
          </div>
        </nav>
      </header>

      {/* Search */}
      <section className="py-6 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`teacher jobs near ${selectedFilters.location.toLowerCase()}`}
                className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="ml-4 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Search</button>
          </div>

          {/* Filter Options */}
          <div className="flex items-center justify-between mt-4 space-x-2 overflow-x-auto">
            {["Job Type", "Institute Type", "Subcategory", "Level/Exam Type", "Role", "Subject", "Non Academic Type"].map((item, idx) => (
              <div className="min-w-max" key={idx}>
                <select className="py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>{item}</option>
                </select>
              </div>
            ))}
            <button className="px-4 py-2 text-blue-600 bg-transparent hover:bg-blue-50 rounded-md">Reset</button>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container px-4 py-6 mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* Sidebar */}
          <aside className="w-1/4 px-4">
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
              </h3>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Applied Filters</h4>
                {Object.keys(selectedFilters).map((filter) => (
                  <div key={filter} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2">
                    {selectedFilters[filter]}
                    <button className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <h4 className="font-medium text-gray-700 mb-3">Location</h4>
                {locations.map((loc) => (
                  <div key={loc.name} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`location-${loc.name}`}
                      name="location"
                      checked={selectedFilters.location === loc.name}
                      onChange={() => setSelectedFilters({ ...selectedFilters, location: loc.name })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`location-${loc.name}`} className="ml-2 text-sm text-gray-700">
                      {loc.name} ({loc.count})
                    </label>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <h4 className="font-medium text-gray-700 mb-3">Experience Required (years)</h4>
                <div className="flex flex-wrap gap-2">
                  {experienceYears.map((year) => (
                    <div key={year} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-sm hover:bg-blue-50 cursor-pointer">
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg relative">
              <div className="absolute right-4 top-4 bg-blue-600 text-white px-2 py-1 text-xs rounded">NEW</div>
              <h3 className="text-blue-800 font-medium mb-2">Online Courses</h3>
              <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Chat with us</button>
            </div>
          </aside>

          {/* Main Listings */}
          <section className="w-3/4 px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                1 - 20 of 1304 Vacancies - Apply To 1304 Teacher Jobs Near {selectedFilters.location} - Vacancies
              </h2>
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Sorting:</span>
                <select className="py-1 px-3 border border-gray-300 rounded-md bg-white text-gray-700">
                  <option>Freshness</option>
                  <option>Relevance</option>
                </select>
              </div>
            </div>

            {/* Sample Job Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Presidency Group of Schools</h3>
                </div>
              </div>

              <h4 className="text-lg font-medium text-blue-600 mb-3">
                Looking for PRT Hindi Teacher at Presidency School Nandini Layout
              </h4>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                <span className="text-sm">Bengaluru (Nandini Layout)</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
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
