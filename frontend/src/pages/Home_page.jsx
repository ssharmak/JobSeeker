import React, { useState } from 'react';
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
    { name: 'National Public School ', reviews: '3.4 reviews', logo: './images/NPS.png' },
    { name: 'Ryan International School ', reviews: '3.5 reviews', logo: './images/RIS.png' },
    { name: 'Basil Woods International', reviews: '16.3k reviews', logo: './images/BW.png' },
    { name: 'Emerald International School', reviews: '204.5k reviews', logo: './images/EIS.png' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Import Navbar component */}
      <Navbar />

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
                  src={company.logo}
                  className="mx-auto mb-4 rounded"
                  style={{ width: '120px', height: '40px' }}
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

      {/* Import Footer component */}
      <Footer />
    </div>
  );
};

export default JobSeekerHomepage;