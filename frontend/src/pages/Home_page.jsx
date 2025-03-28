import React, { useState } from 'react';
import { Home, Building2, Briefcase, MapPin, ChevronDown } from 'lucide-react';

const JobSeekerHomepage = () => {
  const [isJobsOpen, setJobsOpen] = useState(false);

  const trendingCategories = [
    { icon: <Home className="w-8 h-8 text-purple-500" />, label: 'Remote', jobs: '5.3k + jobs' },
    { icon: <Building2 className="w-8 h-8 text-blue-500" />, label: 'MNC', jobs: '19.3k + jobs' },
    { icon: <Briefcase className="w-8 h-8 text-yellow-500" />, label: 'Engineering', jobs: '16.3k + jobs' }
  ];

  const jobCategories = [
    { label: 'Coaching', jobs: 1905 },
    { label: 'School', jobs: 5277 },
    { label: 'EdTech', jobs: 963 },
    { label: 'College/University', jobs: 4335 },
    { label: 'Pre-School', jobs: 503 },
    { label: 'Vocational Training Institute', jobs: 153 }
  ];

  const featuredCompanies = [
    { name: 'L&T Infotech (LTI)', reviews: 3.4 },
    { name: 'FIITJEE', reviews: 3.5 },
    { name: 'Capgemini', reviews: '16.3k' },
    { name: 'Software <', reviews: '204.5k' }
  ];

  const categories = [
    'Mathematics Teacher Jobs',
    'Science Teacher Jobs',
    'Chemistry Teacher Jobs',
    'Computer Teacher Jobs',
    'English Teacher Jobs',
    'Hindi Teacher Jobs',
    'Assistant Teacher Jobs',
    'Commerce Teacher Jobs',
    'Teacher Jobs',
    'Social Science Teacher Jobs',
    'Computer Science Teacher Jobs',
    'Economics Teacher Jobs',
    'Biology Teacher Jobs',
    'Physics Teacher Jobs',
    'History Teacher Jobs',
    'Accountancy Teacher Jobs'
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
    'Teacher Jobs',
    'Social Science Teacher Jobs',
    'Computer Science Teacher Jobs',
    'Economics Teacher Jobs',
    'Biology Teacher Jobs',
    'Physics Teacher Jobs',
    'History Teacher Jobs',
    'Accountancy Teacher Jobs'
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <img 
              src="/api/placeholder/150/50" 
              alt="JobSeeker Logo" 
              className="h-10"
            />
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            <div className="relative">
              <button 
                onClick={() => setJobsOpen(!isJobsOpen)} 
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                Jobs <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isJobsOpen && (
                <div className="absolute top-10 left-0 bg-white shadow-lg rounded p-4 w-[600px] z-10 flex space-x-4">
                  <div className="w-1/3">
                    <h3 className="text-blue-500 font-semibold mb-2">JOBS BY CATEGORY</h3>
                    <ul className="space-y-1">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a href="#" className="text-gray-600 hover:text-blue-600">{category}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/3">
                    <h3 className="text-blue-500 font-semibold mb-2">JOBS BY LOCATIONS</h3>
                    <ul className="space-y-1">
                      {locations.map((location, index) => (
                        <li key={index}>
                          <a href="#" className="text-gray-600 hover:text-blue-600">{location}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/3">
                    <h3 className="text-blue-500 font-semibold mb-2">JOBS BY DESIGNATIONS</h3>
                    <ul className="space-y-1">
                      {designations.map((designation, index) => (
                        <li key={index}>
                          <a href="#" className="text-gray-600 hover:text-blue-600">{designation}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <a href="#" className="text-gray-700 hover:text-blue-600">Plans</a>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">Book a Demo</button>
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded">Login</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find your dream job now</h1>
          <p className="text-gray-600 mb-6">5 lakh+ jobs for you to explore</p>
          
          <div className="flex justify-center space-x-4 mb-6">
            <input 
              type="text" 
              placeholder="Enter Skills / designations / companies" 
              className="w-1/3 px-4 py-2 border rounded"
            />
            <input 
              type="text" 
              placeholder="Enter location" 
              className="w-1/4 px-4 py-2 border rounded"
            />
            <select className="w-1/6 px-4 py-2 border rounded">
              <option>Select Experience</option>
            </select>
            <button className="bg-blue-500 text-white px-6 py-2 rounded">Search</button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Trending on This Website today</h2>
          <div className="flex justify-center space-x-8">
            {trendingCategories.map((category, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-4 rounded-full shadow-md inline-block mb-2">
                  {category.icon}
                </div>
                <div>
                  <p className="font-semibold">{category.label}</p>
                  <p className="text-gray-500">{category.jobs}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Job Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            {jobCategories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded shadow text-center">
                <h3 className="font-semibold">{category.label}</h3>
                <p className="text-gray-500">{category.jobs} Jobs</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-center mb-6">Featured Companies Actively Hiring</h2>
          <div className="flex justify-center space-x-8">
            {featuredCompanies.map((company, index) => (
              <div key={index} className="bg-white p-4 rounded shadow text-center">
                <img 
                  src={`/api/placeholder/150/100`} 
                  alt={company.name} 
                  className="mx-auto mb-2"
                />
                <p className="font-semibold">{company.name}</p>
                <p className="text-gray-500">{company.reviews} reviews</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-md py-8">
        <div className="container mx-auto grid grid-cols-3 gap-8 px-4">
          <div>
            <h3 className="font-semibold mb-4">JobSeek</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Employer home</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Help center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Summons/Notices</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Grievances</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Privacy policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Terms & conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Trust & safety</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500">
          © 2025 JobSeek. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default JobSeekerHomepage;
