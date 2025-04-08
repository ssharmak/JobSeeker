import React, { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isJobsOpen, setJobsOpen] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isDesignationOpen, setDesignationOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Coaching',
    'School',
    'Pre-School',
    'EdTech',
    'College/University',
    'Vocational Training Institute',
  ];

  const locations = [
    'Teacher jobs in Bangalore',
    'Teacher jobs in Hyderabad',
    'Teacher jobs in Lucknow',
    'Teacher jobs in Coimbatore',
    'Teacher jobs in Pune',
    'Teacher jobs in Ahmedabad',
    'Teacher jobs in Delhi',
    'Teacher jobs in Patna',
    'Teacher jobs in Chennai',
    'Teacher jobs in Mumbai',
    'Teacher jobs in Indore',
    'Teacher jobs in Agra',
    'Teacher jobs in Kolkata',
    'Teacher jobs in Jaipur',
    'Teacher jobs in Bhubaneswar'
  ];

  const designations = [
    'Mathematics Teacher Jobs',
    'English Teacher Jobs',
    'Teacher Jobs',
    'Biology Teacher Jobs',
    'Science Teacher Jobs',
    'Hindi Teacher Jobs',
    'Social Science Teacher Jobs',
    'Physics Teacher Jobs',
    'Chemistry Teacher Jobs',
    'Assistant Teacher Jobs',
    'Computer Science Teacher Jobs',
    'History Teacher Jobs',
    'Computer Teacher Jobs',
    'Commerce Teacher Jobs',
    'Economics Teacher Jobs',
    'Accountancy Teacher Jobs',
    'Academic Coordinator Jobs',
    'English Language Teacher Jobs',
    'General Teacher Jobs',
    'Geography Teacher Jobs',
    'Academic Counsellor Jobs',
    'Accountant Jobs',
    'Administration Executive Jobs',
    'Physical Education Teacher Jobs',
    'Political Science Teacher Jobs',
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="./images/jobseeker_logo.jpg" 
            className="mx-auto mb-4 rounded" 
            style={{ width: '100px', height: '50px' }}
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 items-center">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          
          {/* Jobs Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setJobsOpen(!isJobsOpen)} 
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              Jobs <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            
            {isJobsOpen && (
              <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg p-6 w-[650px] z-10">
                {/* Horizontal Categories */}
                <div className="flex space-x-4">
                  {/* Jobs by Category */}
                  <div className="relative w-1/3">
                    <button 
                      onClick={() => setCategoryOpen(!isCategoryOpen)} 
                      className="text-blue-500 font-semibold mb-3 text-sm uppercase flex items-center w-full"
                    >
                      JOBS BY CATEGORY <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    {isCategoryOpen && (
                      <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4 w-full z-20">
                        <ul className="space-y-2">
                          {categories.map((item, index) => (
                            <li key={index}>
                              <a 
                                href="#" 
                                className="text-gray-600 hover:text-blue-600 text-xs hover:underline"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Jobs by Locations */}
                  <div className="relative w-1/3">
                    <button 
                      onClick={() => setLocationOpen(!isLocationOpen)} 
                      className="text-blue-500 font-semibold mb-3 text-sm uppercase flex items-center w-full"
                    >
                      JOBS BY LOCATIONS <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    {isLocationOpen && (
                      <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4 w-full z-20">
                        <ul className="space-y-2">
                        {locations.map((item, index) => (
                          <li key={index}>
                          <a href="#" className="text-xs text-gray-600 hover:text-blue-600 hover:underline"
                            onClick={(e) => {
                                  e.preventDefault();
                                  if (item === 'Teacher jobs in Bangalore') {
                                  navigate('/jobs/bangalore');
                          }
                        }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Jobs by Designations */}
                  <div className="relative w-1/3">
                    <button 
                      onClick={() => setDesignationOpen(!isDesignationOpen)} 
                      className="text-blue-500 font-semibold mb-3 text-sm uppercase flex items-center w-full"
                    >
                      JOBS BY DESIGNATIONS <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    {isDesignationOpen && (
                      <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4 w-full z-20">
                        <ul className="space-y-2">
                          {designations.map((item, index) => (
                            <li key={index}>
                              <a 
                                href="#" 
                                className="text-gray-600 hover:text-blue-600 text-xs hover:underline"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#" className="text-gray-700 hover:text-blue-600">Plans</a>
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
            Book a Demo
          </button>
        </div>

        {/* Login/Register Buttons */}
        <div className="flex space-x-2">
          <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition" onClick={() => navigate("/user")}>
            Register
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;