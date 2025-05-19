import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://app.teachersearch.in/api/jobs/jobpostlist');
        const jobArray = response?.data?.data || [];
        setJobs(jobArray);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job listings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="w-full max-w-5xl px-2 mx-auto space-y-6 sm:px-0">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Job Listings</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {jobs.map((job) => (
          <div key={job._id} className="flex flex-col justify-between p-5 transition bg-white rounded-lg shadow hover:shadow-md">
            <div>
              <h3 className="text-xl font-semibold text-blue-700">{job.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{job.department}</p>
              <p className="text-sm text-gray-500">{job.experience_level}</p>
              <p className="mt-2 text-sm text-gray-700">
                {job.description?.slice(0, 120)}{job.description?.length > 120 ? '...' : ''}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-500">{new Date(job.posted_date).toLocaleDateString()}</span>
              <a href={`/jobs/${job._id}`} className="text-sm text-blue-500 hover:underline">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
