import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Search,
  Building,
  MapPin,
  Clock,
  ChevronRight,
  MessageSquareText,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TeacherJobsPage = () => {
  const { location } = useParams();
  const navigate = useNavigate();

  const formatLocation = (loc) => {
    if (!loc) return 'Bengaluru';
    const locationMap = {
      bangalore: 'Bengaluru',
      hyderabad: 'Hyderabad',
      delhi: 'Delhi',
      mumbai: 'Mumbai',
      chennai: 'Chennai',
      kolkata: 'Kolkata',
      pune: 'Pune',
    };
    return locationMap[loc?.toLowerCase()] || loc;
  };

  const [selectedFilters, setSelectedFilters] = useState({
    location: formatLocation(location),
    experience: null,
  });

  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const experienceYears = Array.from({ length: 9 }, (_, i) => i);

  const isLoggedIn = () => !!localStorage.getItem('token');

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://app.teachersearch.in/api/jobs/jobpostlist');
      const jobArray = response?.data?.data || [];
      setAllJobs(jobArray);
    } catch (err) {
      setError('Failed to fetch job listings.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMetaData = async () => {
    try {
      const citiesRes = await axios.get('https://app.teachersearch.in/api/jobs/allCity');
      const formattedCities = Array.isArray(citiesRes.data)
        ? citiesRes.data.map((city) =>
            typeof city === 'string' ? { name: city, count: 0 } : city
          )
        : [];
      setLocations(
        formattedCities.length
          ? formattedCities
          : [
              { name: 'Bengaluru' },
              { name: 'Hyderabad' },
              { name: 'Mumbai' },
              { name: 'Delhi' },
            ]
      );
    } catch (error) {
      setLocations([
        { name: 'Bengaluru' },
        { name: 'Hyderabad' },
        { name: 'Mumbai' },
        { name: 'Delhi' },
      ]);
    }
  };

  const filterJobs = () => {
    const filtered = allJobs.filter((job) => {
      const matchesLocation = selectedFilters.location
        ? job.address?.city?.toLowerCase() === selectedFilters.location.toLowerCase()
        : true;

      const matchesExperience =
        selectedFilters.experience != null
          ? job.min_experience <= selectedFilters.experience &&
            job.max_experience >= selectedFilters.experience
          : true;

      return matchesLocation && matchesExperience;
    });

    setJobs(filtered);
    setJobCount(filtered.length);
  };

  useEffect(() => {
    fetchMetaData();
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allJobs, selectedFilters.location, selectedFilters.experience]);

  const handleLocationChange = (loc) => {
    setSelectedFilters((prev) => ({ ...prev, location: loc }));
  };

  const handleExperienceChange = (exp) => {
    setSelectedFilters((prev) => ({ ...prev, experience: exp }));
  };

  const handleReset = () => {
    setSelectedFilters({
      location: formatLocation(location),
      experience: null,
    });
  };

  const handleApplyClick = (jobId) => {
    isLoggedIn() ? navigate(`/apply/${jobId}`) : navigate('/login');
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Navbar />

      <section className="py-6 bg-blue-50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center sm:flex-row sm:space-x-4">
            <div className="relative flex-grow w-full">
              <Search className="absolute w-5 h-5 text-gray-400 left-4 top-3" />
              <input
                type="text"
                placeholder={`Teacher jobs near ${selectedFilters.location}`}
                className="w-full py-3 pl-12 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-8 py-3 mt-4 text-sm text-white bg-blue-600 rounded-md sm:mt-0 hover:bg-blue-700">
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            {['Job Type', 'Institute Type', 'Subcategory', 'Level/Exam Type', 'Role', 'Subject', 'Non Academic Type'].map((item, idx) => (
              <select
                key={idx}
                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
              >
                <option>{item}</option>
              </select>
            ))}
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-blue-600 rounded-md hover:bg-blue-100"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      <main className="container px-4 py-6 mx-auto">
        <div className="flex flex-wrap -mx-4">
          {/* Sidebar */}
          <aside className="w-full px-4 mb-6 sm:w-1/4 sm:mb-0">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-800">Filters</h3>

              <div className="mb-4">
                <h4 className="mb-2 text-sm font-semibold text-gray-700">Applied Filters</h4>
                {Object.entries(selectedFilters).map(([key, val]) =>
                  val !== null ? (
                    <span
                      key={key}
                      className="inline-block px-3 py-1 mb-2 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full"
                    >
                      {key}: {val}
                    </span>
                  ) : null
                )}
              </div>

              {/* Location Filter */}
              <div className="pt-4 mb-4 border-t">
                <h4 className="flex items-center mb-3 text-sm font-semibold text-gray-700">
                  <ChevronRight className="w-4 h-4 mr-1" />
                  Location
                </h4>
                {locations.map((loc) => (
                  <div key={loc.name} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`loc-${loc.name}`}
                      name="location"
                      checked={selectedFilters.location === loc.name}
                      onChange={() => handleLocationChange(loc.name)}
                      className="w-4 h-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor={`loc-${loc.name}`} className="ml-2 text-sm">
                      {loc.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Experience Filter */}
              <div className="pt-4 border-t">
                <h4 className="mb-3 text-sm font-semibold text-gray-700">Experience (years)</h4>
                <div className="flex flex-wrap gap-2">
                  {experienceYears.map((year) => (
                    <div
                      key={year}
                      onClick={() => handleExperienceChange(year)}
                      className={`cursor-pointer border rounded-full w-8 h-8 flex items-center justify-center text-sm ${
                        selectedFilters.experience === year
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <section className="w-full px-4 sm:w-3/4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Showing {jobs.length} of {jobCount} jobs near {selectedFilters.location}
              </h2>
              <select className="px-3 py-1 text-sm border border-gray-300 rounded-md">
                <option>Freshness</option>
                <option>Relevance</option>
              </select>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : jobs.length === 0 ? (
              <p className="text-center text-gray-500">No jobs found for selected filters.</p>
            ) : (
              jobs.map((job, index) => (
                <div key={index} className="p-6 mb-4 bg-white rounded-lg shadow">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-md">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{job.Institution_id.name}</h3>
                  </div>

                  <h4 className="mb-2 font-semibold text-blue-600 text-md">{job.title}</h4>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {`${job.address?.street || ''}, ${job.address?.city || ''}, ${job.address?.state || ''} ${job.address?.postal_code || ''}`}
                    </div>
                    {job.salary_range?.is_visible_to_applicants &&
                      job.salary_range.min != null && (
                        <div className="flex items-center">
                          <strong className="mr-1">Salary:</strong>
                          ₹{job.salary_range.min.toLocaleString()} - ₹{job.salary_range.max.toLocaleString()}
                        </div>
                      )}
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-yellow-500" />
                      <strong>
                        {job.min_experience} - {job.max_experience} yrs
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-start mt-2 text-sm text-gray-700">
                    <MessageSquareText className="w-5 h-5 mr-2 text-gray-500" />
                    <p>{job.description}</p>
                  </div>

                  <button
                    onClick={() => handleApplyClick(job._id)}
                    className="px-4 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
              ))
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeacherJobsPage;
