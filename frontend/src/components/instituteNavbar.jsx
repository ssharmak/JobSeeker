import React, { useState } from 'react';
import { Search, Plus, MapPin, User, LogOut } from 'lucide-react';

const InstitutionNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="font-sans bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container flex items-center justify-between p-3 mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="./images/jobseeker_logo.jpg"
              className="rounded"
              alt="TeacherSearch.in"
              style={{ width: '7rem', height: '4rem' }}
            />
          </div>

          {/* Centered Navigation Links & Buttons */}
          <div className="flex items-center mx-auto space-x-6">
            <a href="/InstitutionHompage" className="text-gray-700 hover:text-black-800">Home</a>
            <a href="/InstitutionHompage" className="text-gray-700 hover:text-black-800">Contact Us</a>
            <a href="/InstitutionHompage" className="text-gray-700 hover:text-black-800">FAQ's</a>

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Search /> Find a Candidate
            </button>

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Plus /> Post New Job
            </button>

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md text-bold bg-sky-100 hover:text-black-600">
              <MapPin /> Promote Walk Ins
            </button>

            {/* Dropdown Button */}
            <div className="relative">
              <button
                className="px-4 py-2 "
                onClick={toggleDropdown}
              >
                Evolvetech
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white border rounded-md shadow-lg">
                  <a
                    href="/my-profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <User className="mr-2" /> My Profile
                  </a>
                  <a
                    href="/logout"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default InstitutionNavbar;
