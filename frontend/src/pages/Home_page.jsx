import React, { useState } from 'react';
import { Home, Building2, Briefcase, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const JobSeekerHomepage = () => {
  const [isJobsOpen, setJobsOpen] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isDesignationOpen, setDesignationOpen] = useState(false);
  const navigate = useNavigate();

  const trendingCategories = [
    { icon: <Home className="w-8 h-8 text-purple-500" />, label: 'Pre-School', jobs: '5.3k + jobs' },
    { icon: <Building2 className="w-8 h-8 text-blue-500" />, label: 'EdTech', jobs: '19.3k + jobs' },
    { icon: <Briefcase className="w-8 h-8 text-yellow-500" />, label: 'University', jobs: '16.3k + jobs' }
  ];

  const featuredCompanies = [
    { name: 'National Public School ', reviews: '3.4 reviews', logo: './images/NPS.png' },
    { name: 'Ryan International School ', reviews: '3.5 reviews', logo: './images/RIS.png' },
    { name: 'Basil Woods International', reviews: '16.3k reviews', logo: './images/BW.png' },
    { name: 'Emerald International School', reviews: '204.5k reviews', logo: './images/EIS.png' }
  ];
  
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
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Navigation */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Find your dream job now</h1>
          <p className="text-gray-600 mb-6 text-lg">5 lakh+ jobs for you to explore</p>
          
          {/* Search Bar */}
          <div className="flex justify-center space-x-4 mb-6">
            <div className="relative w-1/3">
              <input 
                type="text" 
                placeholder="Type your job title.." 
                className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            </div>
            
            <div className="relative w-1/4">
              <input 
                type="text" 
                placeholder="Enter location" 
                className="w-full px-4 py-2 border rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            </div>
            
            <select className="w-1/6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Experience</option>
              <option>0-2 years</option>
              <option>2-5 years</option>
              <option>5+ years</option>
            </select>
            
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
              Search
            </button>
          </div>
        </section>

        {/* Trending Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Trending on This Website today
          </h2>
          <div className="flex justify-center space-x-12">
            {trendingCategories.map((category, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-5 rounded-full shadow-md inline-block mb-4 hover:shadow-lg transition">
                  {category.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{category.label}</p>
                  <p className="text-gray-500 text-sm">{category.jobs}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Companies */}
        <section>
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Teaching Job Vacancies From
          </h2>
          <div className="flex justify-center space-x-8">
            {featuredCompanies.map((company, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
              >
                <img 
                  src={company.logo} // Use the logo property here
                  className="mx-auto mb-4 rounded"
                  style={{ width: '120px', height: '40px' }} // Fixed width and height
                />
                <p className="font-semibold text-gray-800 mb-1">
                  {company.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {company.reviews}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md py-12">
        <div className="container mx-auto grid grid-cols-3 gap-8 px-4 mb-8">
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">JobSeek</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Help & Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Help center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Report Issue</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms & conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mb-4">
          © 2025 JobSeek. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {[
            { Icon: 'Facebook', path: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z' },
            { Icon: 'Twitter', path: 'M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z' },
            { Icon: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
            { Icon: 'LinkedIn', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
          ].map((social, index) => (
            <a 
              key={index} 
              href="#" 
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default JobSeekerHomepage;
