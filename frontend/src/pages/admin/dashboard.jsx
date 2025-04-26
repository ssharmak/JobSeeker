import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [candidateFile, setCandidateFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [uploadingCandidate, setUploadingCandidate] = useState(false);
  const [uploadingJob, setUploadingJob] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile sidebar

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post(
        'https://app.teachersearch.in/api/auth/logoutUser',
        {},
        { withCredentials: true }
      );
      localStorage.removeItem('token');
      alert('Logged out successfully!');
      navigate('/adminlogin');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
    setLoggingOut(false);
  };

  const handleCandidateFileChange = (e) => setCandidateFile(e.target.files[0]);
  const handleJobFileChange = (e) => setJobFile(e.target.files[0]);

  const handleCandidateUpload = async () => {
    if (!candidateFile) return alert('Please select a candidate file.');
  
    const formData = new FormData();
    formData.append('file', candidateFile);
  
    const token = localStorage.getItem('token'); // Make sure token is stored correctly
  
    setUploadingCandidate(true);
  
    try {
      await axios.post('http://localhost:5000/api/bulkcandidate/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        },
        withCredentials: true 
      });
  
      alert('Candidate Excel uploaded successfully!');
      setCandidateFile(null);
    } catch (error) {
      console.error('Candidate upload failed:', error.response?.data || error.message);
      alert('Failed to upload candidate Excel.');
    }
    setUploadingCandidate(false);
  };
  
  

  const handleJobUpload = async () => {
    
    if (!jobFile) return alert('Please select a job file.');
  
    const formData = new FormData();
    formData.append('file', jobFile);
    const token = localStorage.getItem('token');
    setUploadingJob(true);
  
    try {
      await axios.post('http://localhost:5000/api/bulkRequirement/upload-jobexcel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
  
      alert('Job Excel uploaded successfully!');
      setJobFile(null);
    } catch (error) {
      console.error('Job upload failed:', error.response?.data || error.message);
      alert('Failed to upload job Excel.');
    }
    setUploadingJob(false);
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      {/* Mobile toggle button */}
      <button
        className="p-4 text-gray-700 bg-white shadow md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md w-full md:w-64 p-6 md:block ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="pb-4 mb-4 text-xl font-bold border-b">My Dashboard</div>
        <nav>
          <ul className="space-y-4 text-gray-700">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Analytics</a></li>
            <li><a href="#" className="hover:text-blue-600">Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-md">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-600">Welcome, Admin</span>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className={`px-4 py-2 text-sm text-white rounded ${
                loggingOut ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 space-y-6 sm:p-6">
          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold">Users</h2>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-2 text-lg font-semibold">Revenue</h2>
              <p className="text-3xl font-bold text-green-600">$12,345</p>
            </div> */}
          </div>

          {/* Upload Sections */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Candidate Upload */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Upload Candidates Excel</h2>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleCandidateFileChange}
                className="block w-full mb-4"
              />
              <button
                onClick={handleCandidateUpload}
                disabled={uploadingCandidate}
                className={`px-4 py-2 text-white rounded w-full ${
                  uploadingCandidate ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {uploadingCandidate ? 'Uploading...' : 'Upload Candidates Excel'}
              </button>
            </div>

            {/* Job Upload */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-4 text-lg font-semibold">Upload Jobs Excel</h2>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleJobFileChange}
                className="block w-full mb-4"
              />
              <button
                onClick={handleJobUpload}
                disabled={uploadingJob}
                className={`px-4 py-2 text-white rounded w-full ${
                  uploadingJob ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                {uploadingJob ? 'Uploading...' : 'Upload Jobs Excel'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
