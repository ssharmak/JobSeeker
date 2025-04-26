import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isJobsOpen, setJobsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Keep track of which dropdown is open
  const navigate = useNavigate();

  const categories = [
    'Coaching', 'School', 'Pre-School', 'EdTech',
    'College/University', 'Vocational Training Institute',
  ];

  const locations = [
    'Teacher jobs in Bangalore', 'Teacher jobs in Hyderabad', 'Teacher jobs in Lucknow',
    'Teacher jobs in Coimbatore', 'Teacher jobs in Pune', 'Teacher jobs in Ahmedabad',
    'Teacher jobs in Delhi', 'Teacher jobs in Patna', 'Teacher jobs in Chennai',
    'Teacher jobs in Mumbai', 'Teacher jobs in Indore', 'Teacher jobs in Agra',
    'Teacher jobs in Kolkata', 'Teacher jobs in Jaipur', 'Teacher jobs in Bhubaneswar'
  ];

  const designations = [
    'Mathematics Teacher Jobs', 'English Teacher Jobs', 'Teacher Jobs', 'Biology Teacher Jobs',
    'Science Teacher Jobs', 'Hindi Teacher Jobs', 'Social Science Teacher Jobs',
    'Physics Teacher Jobs', 'Chemistry Teacher Jobs', 'Assistant Teacher Jobs',
    'Computer Science Teacher Jobs', 'History Teacher Jobs', 'Computer Teacher Jobs',
    'Commerce Teacher Jobs', 'Economics Teacher Jobs', 'Accountancy Teacher Jobs',
    'Academic Coordinator Jobs', 'English Language Teacher Jobs', 'General Teacher Jobs',
    'Geography Teacher Jobs', 'Academic Counsellor Jobs', 'Accountant Jobs',
    'Administration Executive Jobs', 'Physical Education Teacher Jobs', 'Political Science Teacher Jobs'
  ];

  const handleNavigate = (locationText) => {
    const routes = {
      bangalore: '/jobs/bangalore',
      hyderabad: '/jobs/hyderabad',
      delhi: '/jobs/delhi',
      mumbai: '/jobs/mumbai',
      chennai: '/jobs/chennai',
      kolkata: '/jobs/kolkata',
      pune: '/jobs/pune',
      jaipur: '/jobs/jaipur',
      lucknow: '/jobs/lucknow',
      indore: '/jobs/indore',
      agra: '/jobs/agra',
      patna: '/jobs/patna',
      coimbatore: '/jobs/coimbatore',
      ahmedabad: '/jobs/ahmedabad',
      bhubaneswar: '/jobs/bhubaneswar'
    };

    for (const [key, path] of Object.entries(routes)) {
      if (locationText.includes(key)) {
        navigate(path);
        break;
      }
    }
  };

  // Function to toggle dropdown and close others
  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null); // If clicked again, close it
    } else {
      setOpenDropdown(dropdown); // Set the clicked dropdown as open
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container flex items-center justify-between p-4 mx-auto">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img 
            src="./images/jobseeker_logo.jpg" 
            className="rounded" 
            style={{ width: '100px', height: '50px' }}
            alt="Jobseeker Logo"
          />
        </div>

        {/* Center: Nav Links */}
        <div className="items-center justify-center flex-1 hidden space-x-6 md:flex">
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>

          <div className="relative">
            <button
              onClick={() => setJobsOpen(!isJobsOpen)}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              Jobs <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {isJobsOpen && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg p-6 w-[650px] z-10">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  {/* Jobs by Category */}
                  <div className="relative w-full mb-4 md:w-1/3 md:mb-0">
                    <button
                      onClick={() => toggleDropdown('category')}
                      className="flex items-center w-full text-sm font-semibold text-blue-500 uppercase"
                    >
                      JOBS BY CATEGORY <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {openDropdown === 'category' && (
                      <ul className="mt-2 space-y-1">
                        {categories.map((item, idx) => (
                          <li key={idx}>
                            <a href="#" className="text-xs text-gray-600 hover:text-blue-600 hover:underline">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Jobs by Location */}
                  <div className="relative w-full mb-4 md:w-1/3 md:mb-0">
                    <button
                      onClick={() => toggleDropdown('location')}
                      className="flex items-center w-full text-sm font-semibold text-blue-500 uppercase"
                    >
                      JOBS BY LOCATIONS <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {openDropdown === 'location' && (
                      <ul className="mt-2 space-y-1">
                        {locations.map((item, idx) => (
                          <li key={idx}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavigate(item.toLowerCase());
                              }}
                              className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Jobs by Designation */}
                  <div className="relative w-full md:w-1/3">
                    <button
                      onClick={() => toggleDropdown('designation')}
                      className="flex items-center w-full text-sm font-semibold text-blue-500 uppercase"
                    >
                      JOBS BY DESIGNATIONS <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    {openDropdown === 'designation' && (
                      <ul className="mt-2 space-y-1">
                        {designations.map((item, idx) => (
                          <li key={idx}>
                            <a href="#" className="text-xs text-gray-600 hover:text-blue-600 hover:underline">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#" className="text-gray-700 hover:text-blue-600">Plans</a>
          <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
            Book a Demo
          </button>
        </div>

        {/* Right: Login/Register */}
        <div className="flex items-center space-x-2">
          <button
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            onClick={() => navigate("/user")}
          >
            Register
          </button>

          {/* Mobile Menu Toggle */}
          <div className="ml-2 md:hidden">
            <button onClick={() => setMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center px-4 pb-4 space-y-3 md:hidden">
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          <div className="relative">
            <button
              onClick={() => setJobsOpen(!isJobsOpen)}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              Jobs <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {isJobsOpen && (
              <div className="flex flex-col mt-4 space-y-3">
                <button
                  onClick={() => toggleDropdown('category')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Jobs by Category <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === 'category' && (
                  <ul className="mt-2 space-y-1">
                    {categories.map((item, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-xs text-gray-600 hover:text-blue-600 hover:underline">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => toggleDropdown('location')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Jobs by Location <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === 'location' && (
                  <ul className="mt-2 space-y-1">
                    {locations.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(item.toLowerCase());
                          }}
                          className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  onClick={() => toggleDropdown('designation')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Jobs by Designation <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {openDropdown === 'designation' && (
                  <ul className="mt-2 space-y-1">
                    {designations.map((item, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-xs text-gray-600 hover:text-blue-600 hover:underline">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <a href="#" className="text-gray-700 hover:text-blue-600">Plans</a>
          <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
            Book a Demo
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
