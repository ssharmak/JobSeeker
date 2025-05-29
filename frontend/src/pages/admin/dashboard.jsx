import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import AdminSidebar from '../../components/adminSidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [candidateFile, setCandidateFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [uploadingCandidate, setUploadingCandidate] = useState(false);
  const [uploadingJob, setUploadingJob] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const candidateInputRef = useRef(null);
  const jobInputRef = useRef(null);

  const handleCandidateFileChange = (e) => setCandidateFile(e.target.files[0]);
  const handleJobFileChange = (e) => setJobFile(e.target.files[0]);

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

  const handleCandidateUpload = async () => {
    if (!candidateFile) return alert('Please select a candidate file.');

    const formData = new FormData();
    formData.append('file', candidateFile);

    const token = localStorage.getItem('token');

    setUploadingCandidate(true);

    try {
      await axios.post(
        'https://app.teachersearch.in/api/bulkcandidate/upload-excel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert('Candidate Excel uploaded successfully!');
      setCandidateFile(null);
      if (candidateInputRef.current) candidateInputRef.current.value = null;
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
      await axios.post(
        'https://app.teachersearch.in/api/bulkRequirement/upload-jobexcel',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert('Job Excel uploaded successfully!');
      setJobFile(null);
      if (jobInputRef.current) jobInputRef.current.value = null;
    } catch (error) {
      console.error('Job upload failed:', error.response?.data || error.message);
      alert('Failed to upload job Excel.');
    }
    setUploadingJob(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 bg-white shadow-md h-14">
        <div className="hidden mr-4 text-gray-700 md:block">Welcome, Admin</div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={`px-4 py-2 text-sm text-white rounded ${
            loggingOut ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </header>

      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
        loggingOut={loggingOut}
      />

      {/* Main content area */}
      <main className="p-6 mx-auto mt-5 pt-14 md:pl-64 max-w-7xl" >
        <div className="grid grid-cols-1 gap-6 ml-4 md:grid-cols-2">
          {/* Candidate Upload */}
          <div className="p-6 ml-5 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-lg font-semibold">Upload Candidates Excel</h2>
            <input
              ref={candidateInputRef}
              type="file"
              accept=".xlsx, .xls"
              onChange={handleCandidateFileChange}
              className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCandidateUpload}
              disabled={uploadingCandidate}
              className={`w-full px-4 py-2 text-white rounded ${
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
              ref={jobInputRef}
              type="file"
              accept=".xlsx, .xls"
              onChange={handleJobFileChange}
              className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleJobUpload}
              disabled={uploadingJob}
              className={`w-full px-4 py-2 text-white rounded ${
                uploadingJob ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {uploadingJob ? 'Uploading...' : 'Upload Jobs Excel'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
