import React from 'react';
import { Home, Building2, Briefcase, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const JobSeekerHomepage = () => {
  const navigate = useNavigate();

  const trendingCategories = [
    { icon: <Home className="w-8 h-8 text-purple-500" />, label: 'Pre-School', jobs: '5.3k + jobs' },
    { icon: <Building2 className="w-8 h-8 text-blue-500" />, label: 'EdTech', jobs: '19.3k + jobs' },
    { icon: <Briefcase className="w-8 h-8 text-yellow-500" />, label: 'University', jobs: '16.3k + jobs' }
  ];

  const featuredCompanies = [
    { name: 'National Public School', reviews: '3.4 reviews', logo: './images/NPS.png' },
    { name: 'Ryan International School', reviews: '3.5 reviews', logo: './images/RIS.png' },
    { name: 'Basil Woods International', reviews: '16.3k reviews', logo: './images/BW.png' },
    { name: 'Emerald International School', reviews: '204.5k reviews', logo: './images/EIS.png' }
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
                className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            </div>

            <div className="relative w-full lg:w-1/4">
              <input 
                type="text" 
                placeholder="Enter location" 
                className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MapPin className="absolute w-5 h-5 text-gray-400 left-3 top-3" />
            </div>

            <div className="w-full lg:w-1/6">
              <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Experience</option>
                <option>0-2 years</option>
                <option>2-5 years</option>
                <option>5+ years</option>
              </select>
            </div>

            <button className="w-full px-6 py-2 text-white transition bg-blue-500 rounded-md lg:w-auto hover:bg-blue-600">
              Search
            </button>
          </div>
        </section>

        {/* Trending Categories */}
        <section className="mb-12">
          <h2 className="mb-8 text-2xl font-semibold text-center text-gray-800">Trending on This Website today</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            {trendingCategories.map((category, index) => (
              <div key={index} className="text-center">
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
                  className="mx-auto mb-4 rounded"
                  alt={`${company.name} logo`}
                  style={{ width: '120px', height: '40px' }}
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
