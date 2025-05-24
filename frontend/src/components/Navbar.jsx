import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import images from '../constants/images';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isJobsOpen, setJobsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const categories = ['Coaching', 'School', 'Pre-School', 'EdTech', 'College/University', 'Vocational Training Institute'];
  const locations = ['Teacher jobs in Bangalore', 'Teacher jobs in Hyderabad', 'Teacher jobs in Lucknow', 'Teacher jobs in Coimbatore', 'Teacher jobs in Pune', 'Teacher jobs in Ahmedabad', 'Teacher jobs in Delhi', 'Teacher jobs in Patna', 'Teacher jobs in Chennai', 'Teacher jobs in Mumbai', 'Teacher jobs in Indore', 'Teacher jobs in Agra', 'Teacher jobs in Kolkata', 'Teacher jobs in Jaipur', 'Teacher jobs in Bhubaneswar'];
  const designations = ['Mathematics Teacher Jobs', 'English Teacher Jobs', 'Teacher Jobs', 'Biology Teacher Jobs', 'Science Teacher Jobs', 'Hindi Teacher Jobs', 'Social Science Teacher Jobs', 'Physics Teacher Jobs', 'Chemistry Teacher Jobs', 'Assistant Teacher Jobs', 'Computer Science Teacher Jobs', 'History Teacher Jobs', 'Computer Teacher Jobs', 'Commerce Teacher Jobs', 'Economics Teacher Jobs', 'Accountancy Teacher Jobs', 'Academic Coordinator Jobs', 'English Language Teacher Jobs', 'General Teacher Jobs', 'Geography Teacher Jobs', 'Academic Counsellor Jobs', 'Accountant Jobs', 'Administration Executive Jobs', 'Physical Education Teacher Jobs', 'Political Science Teacher Jobs'];

  const routes = {
    bangalore: '/jobs/bangalore',
    hyderabad: '/jobs/hyderabad',
    delhi: '/jobs/delhi',
    mumbai: '/jobs/mumbai',
    chennai: '/jobs/chennai',
    kolkata: '/jobs/kolkata',
    pune: '/jobs/pune',
    jaipur: '/jobs/jaipur',
    lucknow: '/jobs/lucknow',
    indore: '/jobs/indore',
    agra: '/jobs/agra',
    patna: '/jobs/patna',
    coimbatore: '/jobs/coimbatore',
    ahmedabad: '/jobs/ahmedabad',
    bhubaneswar: '/jobs/bhubaneswar',
  };

  const handleNavigate = (locationText) => {
    for (const [key, path] of Object.entries(routes)) {
      if (locationText.toLowerCase().includes(key)) {
        navigate(path);
        break;
      }
    }
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  useEffect(() => {
    setIsLoggedIn(isTokenValid());
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-menu')) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="container flex items-center justify-between p-4 mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={images.logo}
            className="rounded"
            style={{ width: '100px', height: '50px' }}
            alt="Jobseeker Logo"
          />
        </div>

        {/* Desktop Nav */}
        <div className="items-center justify-center flex-1 hidden space-x-6 md:flex">
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>

          {/* Jobs Menu */}
          <div className="relative">
            <button onClick={() => setJobsOpen(!isJobsOpen)} className="flex items-center text-gray-700 hover:text-blue-600">
              Jobs <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {isJobsOpen && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg p-6 w-[750px] z-10">
                <div className="flex flex-col space-y-6 md:flex-row md:space-x-4 md:space-y-0">
                  <DropdownSection label="JOBS BY CATEGORY" items={categories} isOpen={openDropdown === 'category'} toggle={() => toggleDropdown('category')} />
                  <DropdownSection label="JOBS BY LOCATIONS" items={locations} isOpen={openDropdown === 'location'} toggle={() => toggleDropdown('location')} onClick={handleNavigate} className="ml-[-10rem]" />
                  <DropdownSection label="JOBS BY DESIGNATIONS" items={designations} isOpen={openDropdown === 'designation'} toggle={() => toggleDropdown('designation')} className="ml-[-29rem]" />
                </div>
              </div>
            )}
          </div>

          <a href="#" className="text-gray-700 hover:text-blue-600">Plans</a>
          <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Book a Demo</button>
        </div>

        {/* Auth & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {!isLoggedIn ? (
            <>
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700" onClick={() => navigate("/user")}>
                Register
              </button>
            </>
          ) : (
            <div className="relative profile-menu">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center px-2 py-1 space-x-2 text-gray-700 transition duration-150 rounded-full hover:bg-gray-100"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  <User size={18} />
                </div>
                <ChevronDown size={16} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 z-20 w-40 py-2 mt-2 bg-white border rounded shadow-md">
                  <button onClick={() => { setProfileOpen(false); navigate('/ProfilePage'); }} className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Profile</button>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="ml-2 md:hidden">
            <button onClick={() => setMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center px-4 pb-4 space-y-3 md:hidden">
          <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          <button onClick={() => setJobsOpen(!isJobsOpen)} className="flex items-center text-gray-700 hover:text-blue-600">
            Jobs <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {isJobsOpen && (
            <>
              <DropdownMobile label="Jobs by Category" items={categories} isOpen={openDropdown === 'category'} toggle={() => toggleDropdown('category')} />
              <DropdownMobile label="Jobs by Location" items={locations} isOpen={openDropdown === 'location'} toggle={() => toggleDropdown('location')} onClick={handleNavigate} />
              <DropdownMobile label="Jobs by Designation" items={designations} isOpen={openDropdown === 'designation'} toggle={() => toggleDropdown('designation')} />
            </>
          )}
          <a href="#" className="text-gray-700 hover:text-blue-600">Plans</a>
          <button className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Book a Demo</button>
        </div>
      )}
    </header>
  );
};

const DropdownSection = ({ label, items, isOpen, toggle, onClick, className = '' }) => (
  <div className="relative w-full md:w-1/3">
    <button onClick={toggle} className="flex items-center w-full text-sm font-semibold text-blue-500 uppercase">
      {label} <ChevronDown className="w-4 h-4 ml-1" />
    </button>
    {isOpen && (
      <div className={`grid w-[40rem] grid-cols-3 gap-5 mt-2 text-center ${className}`}>
        {items.map((item, idx) => (
          <div key={idx}>
            <a href="#" onClick={(e) => { e.preventDefault(); if (onClick) onClick(item.toLowerCase()); }} className="text-xs text-gray-600 hover:text-blue-600 hover:underline">
              {item}
            </a>
          </div>
        ))}
      </div>
    )}
  </div>
);

const DropdownMobile = ({ label, items, isOpen, toggle, onClick }) => (
  <>
    <button onClick={toggle} className="text-gray-600 hover:text-blue-600">
      {label} <ChevronDown className="w-4 h-4 ml-1" />
    </button>
    {isOpen && (
      <div className="grid grid-cols-1 gap-4 mt-2">
        {items.map((item, idx) => (
          <div key={idx}>
            <a href="#" onClick={(e) => { e.preventDefault(); if (onClick) onClick(item.toLowerCase()); }} className="text-xs text-gray-600 hover:text-blue-600 hover:underline">
              {item}
            </a>
          </div>
        ))}
      </div>
    )}
  </>
);

export default Navbar;
