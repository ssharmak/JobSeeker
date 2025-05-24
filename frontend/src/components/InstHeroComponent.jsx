import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  UserPlus,
  UserCheck,
  User,
  PauseCircle
} from 'lucide-react';
import axios from 'axios'; // Import axios for making the API request

const InstHeroComponent = () => {
  // State to store the job post count
  const [jobPosts, setJobPosts] = useState(0);
  const [candidatesSaved, setCandidatesSaved] = useState(0);
  const [candidatesInvited, setCandidatesInvited] = useState(0);
  const [candidatesShortlisted, setCandidatesShortlisted] = useState(0);
  const [candidatesSelected, setCandidatesSelected] = useState(0);
  const [candidatesOnHold, setCandidatesOnHold] = useState(0);

  // Fetch the job posts count from the API
 useEffect(() => {
    const fetchJobPostCount = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get('https://app.teachersearch.in/api/jobs/jobslistcount', {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
          withCredentials: true, 
        });

        setJobPosts(response.data.count); 
      } catch (error) {
        console.error('Error fetching job post count:', error);
      }
    };

    fetchJobPostCount();
  }, []);


  return (
    <div className="p-4 bg-gray-50">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Job Post */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Briefcase className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Job Posts</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{jobPosts}</span>
        </div>

        {/* Candidates Saved */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <UserPlus className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Saved</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{candidatesSaved}</span>
        </div>

        {/* Candidates Invited */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <User className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Invited</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{candidatesInvited}</span>
        </div>

        {/* Candidates Shortlisted */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <UserCheck className="text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Shortlisted</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{candidatesShortlisted}</span>
        </div>

        {/* Candidates Selected */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <User className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Selected</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{candidatesSelected}</span>
        </div>

        {/* Candidates On Hold */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <PauseCircle className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">Candidates On Hold</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">{candidatesOnHold}</span>
        </div>
      </div>
    </div>
  );
};

export default InstHeroComponent;
