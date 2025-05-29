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

  //  Map experience selection to range
  const getExperienceRange = (label) => {
    if (label === '0-2 years') return [0, 2];
    if (label === '2-5 years') return [2, 5];
    if (label === '5+ years') return [5, 50];
    return [0, 50]; // default
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

      <main className="container px-4 py-8 mx-auto">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl">Find your dream job now</h1>
          <p className="mb-6 text-base text-gray-600 sm:text-lg">5 lakh+ jobs for you to explore</p>

          {/* Search Bar */}
          <div className="flex flex-col items-stretch justify-center gap-4 mb-6 lg:flex-row">
            <div className="relative w-full lg:w-1/3">
              <input 
                type="text" 
                placeholder="Type your job title.." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            </div>

            <div className="relative w-full lg:w-1/4">
              <input 
                type="text" 
                placeholder="Enter location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            </div>

            <div className="w-full lg:w-1/6">
              <select 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Experience</option>
                <option>0-2 years</option>
                <option>2-5 years</option>
                <option>5+ years</option>
              </select>
            </div>

            <button 
              onClick={handleSearch}
              className="w-full px-6 py-2 text-white transition bg-blue-500 rounded-md lg:w-auto hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </section>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Search Results</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((job, index) => (
                <div key={index} className="p-4 transition bg-white border rounded-lg shadow hover:shadow-md">
                  <h3 className="mb-1 text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    {job.address?.city}, {job.address?.state}, {job.address?.country}
                  </p>
                  <p className="mt-1 text-sm text-gray-700">Experience: {job.min_experience} - {job.max_experience} years</p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trending Categories */}
        <section className="mb-12">
          <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">Trending on This Website today</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            {trendingCategories.map((category, index) => (
              <div 
                key={index} 
                className="text-center cursor-pointer"
                onClick={() => navigate(category.path)}
              >
                <div className="inline-block p-5 mb-4 transition bg-white rounded-full shadow-md hover:shadow-lg">
                  {category.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{category.label}</p>
                  <p className="text-sm text-gray-500">{category.jobs}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Companies */}
        <section>
          <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">Teaching Job Vacancies From</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {featuredCompanies.map((company, index) => (
              <div key={index} className="w-full max-w-xs p-6 text-center transition bg-white rounded-lg shadow hover:shadow-md">
                <img 
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="object-contain mx-auto mb-4 bg-white rounded"
                  style={{ width: '100px', height: '90px' }}
                />
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
