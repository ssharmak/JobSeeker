import React, { useState } from 'react';
import { Home, Building2, Briefcase, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import images from '../constants/images';

const JobSeekerHomepage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Dropdown states
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

  // Job title options
  const jobTitles = [
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
    'Political Science Teacher Jobs'
  ];

  // Location options (without "Teacher jobs in" prefix)
  const locations = [
    'Bangalore',
    'Hyderabad',
    'Lucknow',
    'Coimbatore',
    'Pune',
    'Ahmedabad',
    'Delhi',
    'Patna',
    'Chennai',
    'Mumbai',
    'Indore',
    'Agra',
    'Kolkata',
    'Jaipur',
    'Bhubaneswar'
  ];

  // Experience options
  const experienceOptions = [
    'Fresher',
    '1 year',
    '2 years',
    '3 years',
    '4 years',
    '5 years',
    '6+ years',
    '10+ years'
  ];

  // Filter functions
  const filteredTitles = jobTitles.filter(job => 
    job.toLowerCase().includes(title.toLowerCase())
  );

  const filteredLocations = locations.filter(loc => 
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const filteredExperience = experienceOptions.filter(exp => 
    exp.toLowerCase().includes(experience.toLowerCase())
  );

  const getExperienceRange = (label) => {
    if (label === '0-2 years') return [0, 2];
    if (label === '2-5 years') return [2, 5];
    if (label === '5+ years') return [5, 50];
    return [0, 50];
  };

  const handleSearch = async () => {
    const [minExp, maxExp] = getExperienceRange(experience);

    try {
      const response = await axios.get('https://app.teachersearch.in/api/jobs/search-jobs', {
        params: {
          title,
          location,
          minExp,
          maxExp,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      alert('Something went wrong while searching for jobs.');
    }
  };

  const handleTitleSelect = (selectedTitle) => {
    setTitle(selectedTitle);
    setShowTitleDropdown(false);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocationDropdown(false);
  };

  const handleExperienceSelect = (selectedExperience) => {
    setExperience(selectedExperience);
    setShowExperienceDropdown(false);
  };

  const trendingCategories = [
    { icon: <Home className="w-8 h-8 text-purple-500" />, label: 'Pre-School', jobs: '5.3k + jobs', path: '/jobs/preschool' },
    { icon: <Building2 className="w-8 h-8 text-blue-500" />, label: 'EdTech', jobs: '19.3k + jobs', path: '/jobs/edtech' },
    { icon: <Briefcase className="w-8 h-8 text-yellow-500" />, label: 'University', jobs: '16.3k + jobs', path: '/jobs/university' }
  ];

  const featuredCompanies = [
    { name: 'Little Millennium', reviews: '3.9 reviews', logo: images.littlemillennium },
    { name: 'National Public School', reviews: '3.4 reviews', logo: images.NPS },
    { name: 'Ryan International School', reviews: '3.5 reviews', logo: images.RIS },
    { name: 'Basil Woods International', reviews: '16.3k reviews', logo: images.BW },
    { name: 'Emerald International School', reviews: '204.5k reviews', logo: images.EIS }
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />

      <main className="container px-4 py-12 mx-auto">
        <section className="mb-16 text-center bg-gradient-to-r from-blue-100 via-white to-purple-100 p-10 rounded-lg shadow-md">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-800 sm:text-5xl">Find Your Dream Teaching Job</h1>
          <p className="mb-6 text-lg text-gray-600 sm:text-xl">Discover 5+ Lakh teaching jobs across India & beyond</p>

          <div className="flex flex-col items-stretch justify-center gap-4 mb-6 lg:flex-row">
            {/* Job Title Input with Dropdown */}
            <div className="relative w-full lg:w-1/3">
              <input 
                type="text" 
                placeholder="Type your job title.." 
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setShowTitleDropdown(true);
                }}
                onFocus={() => setShowTitleDropdown(true)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              
              {showTitleDropdown && filteredTitles.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredTitles.map((jobTitle, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => handleTitleSelect(jobTitle)}
                    >
                      {jobTitle}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Input with Dropdown */}
            <div className="relative w-full lg:w-1/4">
              <input 
                type="text" 
                placeholder="Enter location" 
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowLocationDropdown(true);
                }}
                onFocus={() => setShowLocationDropdown(true)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
              
              {showLocationDropdown && filteredLocations.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredLocations.map((loc, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => handleLocationSelect(loc)}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Input with Dropdown */}
            <div className="relative w-full lg:w-1/6">
              <input
                type="text"
                placeholder="Select Experience"
                value={experience}
                onChange={(e) => {
                  setExperience(e.target.value);
                  setShowExperienceDropdown(true);
                }}
                onFocus={() => setShowExperienceDropdown(true)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {showExperienceDropdown && filteredExperience.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredExperience.map((exp, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => handleExperienceSelect(exp)}
                    >
                      {exp}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => {
                handleSearch();
                setShowTitleDropdown(false);
                setShowLocationDropdown(false);
                setShowExperienceDropdown(false);
              }}
              className="w-full px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md lg:w-auto hover:scale-105 transition-transform duration-300"
            >
              🔍 Search
            </button>
          </div>
        </section>

        {/* Click outside to close dropdowns */}
        {(showTitleDropdown || showLocationDropdown || showExperienceDropdown) && (
          <div 
            className="fixed inset-0 z-5"
            onClick={() => {
              setShowTitleDropdown(false);
              setShowLocationDropdown(false);
              setShowExperienceDropdown(false);
            }}
          />
        )}

        {searchResults.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Search Results</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((job, index) => (
                <div key={index} className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="mb-1 text-xl font-bold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.address?.city}, {job.address?.state}</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                    {job.min_experience} - {job.max_experience} yrs
                  </span>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{job.description}</p>
                  <button className="mt-3 text-sm font-semibold text-blue-600 hover:underline">View More</button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">Trending on This Website Today</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            {trendingCategories.map((category, index) => (
              <div 
                key={index} 
                className="p-6 text-center bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105 cursor-pointer w-full max-w-xs"
                onClick={() => navigate(category.path)}
              >
                <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-purple-300 rounded-full mb-4">
                  {category.icon}
                </div>
                <p className="text-lg font-semibold text-gray-800">{category.label}</p>
                <p className="text-sm text-gray-500">{category.jobs}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">Teaching Job Vacancies From</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {featuredCompanies.map((company, index) => (
              <div key={index} className="w-full max-w-xs p-6 text-center transition bg-white rounded-lg shadow hover:shadow-md">
                <div className="rounded-full bg-gray-100 p-2 w-[100px] h-[100px] flex items-center justify-center mx-auto mb-4">
                  <img 
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="object-contain max-h-[80px]"
                  />
                </div>
                <p className="mb-1 font-semibold text-gray-800">{company.name}</p>
                <p className="text-sm text-gray-500">{company.reviews}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default JobSeekerHomepage;