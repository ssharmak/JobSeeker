import React, { useState, useEffect } from 'react';
import { Search, Plus, MapPin, User, LogOut, Menu, X, Check } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InstitutionNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isHiringFor, setIsHiringFor] = useState('');
  const [selectedSearchOption, setSelectedSearchOption] = useState('');
  const [jobTitleSearch, setJobTitleSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [institutionName, setInstitutionName] = useState('');

  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const togglePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
    setError('');
  };

  const handleHiringForChange = (e) => setIsHiringFor(e.target.value);
  const handleSearchOptionChange = (option) => setSelectedSearchOption(option);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = '/login';
        return;
      }

      await axios.post(
        'https://app.teachersearch.in/api/auth/logoutUser',
        { refreshToken },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  const handleCandidateSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const payload = { position: jobTitleSearch };
      const response = await axios.post('https://app.teachersearch.in/api/searchcandidate/search-Candidate', payload);
      if (response.status === 200) {
        navigate('/candidate-results', { state: { candidates: response.data } });
      }
    } catch (err) {
      setError('Failed to fetch candidates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInstitutionProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        //console.log("Navbar",token);
        const response = await axios.get(
          'https://app.teachersearch.in/api/profile/getInstProfile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Only needed if you're using cookies
          }
        );
    
        //console.log('Institution Profile Response:', response.data); 
    
        const name = response.data?.Institute?.name;
        if (name) setInstitutionName(name);
      } catch (err) {
        console.error('Error fetching institution profile:', err);
      }
    };
    
  
    fetchInstitutionProfile();
  }, []);
  
  return (
    <div className="font-sans bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container flex items-center justify-between p-3 mx-auto">
          <div className="flex items-center">
            <img
              src="./images/jobseeker_logo.jpg"
              className="rounded"
              alt="TeacherSearch.in"
              style={{ width: '7rem', height: '4rem' }}
            />
          </div>

          <div className="items-center hidden space-x-6 md:flex">
            <a href="/InstitutionHomepage" className="text-gray-700 hover:text-black-800">Home</a>
            <a href="/ContactUs" className="text-gray-700 hover:text-black-800">Contact Us</a>
            <a href="/InstitutionHomepage" className="text-gray-700 hover:text-black-800">FAQ's</a>

            <button onClick={togglePopUp} className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Search className="mr-1" /> Find a Candidate
            </button>

            <button onClick={() => navigate('/post-job')} className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Plus className="mr-1" /> Post New Job
            </button>

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <MapPin className="mr-1" /> Promote Walk Ins
            </button>

            {/* Dropdown */}
            <div className="relative">
              <button className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100" onClick={toggleDropdown}>
                {institutionName || 'Institution'}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-md shadow-lg">
                  <a href="/InstitutionProfile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <User className="mr-2" /> My Profile
                  </a>
                  <button onClick={handleLogout} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <LogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white shadow-md md:hidden">
            <a href="/InstitutionHomepage" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
            <a href="/ContactUs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact Us</a>
            <a href="/InstitutionHomepage" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">FAQ's</a>

            <button onClick={togglePopUp} className="flex items-center w-full p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Search className="mr-2" /> Find a Candidate
            </button>

            <button onClick={() => navigate('/post-job')} className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Plus className="mr-1" /> Post New Job
            </button>

            <button className="flex items-center w-full p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <MapPin className="mr-2" /> Promote Walk Ins
            </button>

            <div className="relative">
              <button className="w-full px-4 py-2 text-left text-gray-700 rounded-md hover:bg-gray-100" onClick={toggleDropdown}>
                {institutionName || 'Institution'}
              </button>

              {isDropdownOpen && (
                <div className="w-full bg-white shadow-md">
                  <a href="/InstitutionProfile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <User className="mr-2" /> My Profile
                  </a>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <LogOut className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Candidate Search Popup */}
      {isPopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-6 bg-white rounded-md shadow-lg w-[50rem] max-h-[90vh] overflow-auto">
            <h2 className="mb-4 text-xl font-semibold text-center">Find a Candidate</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Hiring For</label>
              <select
                className="w-full p-2 border rounded-md"
                value={isHiringFor}
                onChange={handleHiringForChange}
              >
                <option value="">Select an option</option>
                {institutionName && <option value={institutionName}>{institutionName}</option>}
              </select>
            </div>

            <div className="mb-4">
              <span className="text-gray-700">Search for existing jobs?</span>
              <div className="flex justify-center mt-2 space-x-4">
                {['Yes', 'No'].map((opt) => (
                  <button
                    key={opt}
                    className={`flex items-center p-2 font-semibold rounded-md ${selectedSearchOption === opt ? 'bg-blue-500 text-white' : 'text-blue-700 border'}`}
                    onClick={() => handleSearchOptionChange(opt)}
                  >
                    {selectedSearchOption === opt && <Check className="mr-2" />} {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select by Job Title</label>
              <div className="flex items-center p-2 border rounded-md">
                <Search className="mr-2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border-none focus:outline-none"
                  placeholder="Select by job title"
                  value={jobTitleSearch}
                  onChange={(e) => setJobTitleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <button
                className="w-[20rem] p-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                onClick={handleCandidateSearch}
              >
                Find a Candidate
              </button>
            </div>

            <button className="absolute text-gray-700 top-2 right-2" onClick={togglePopUp}>
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionNavbar;
