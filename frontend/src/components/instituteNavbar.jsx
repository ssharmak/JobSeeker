import React, { useState } from 'react';
import { Search, Plus, MapPin, User, LogOut, Menu, X } from 'lucide-react';

const InstitutionNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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

          {/* Desktop Navigation Links */}
          <div className="items-center hidden space-x-6 md:flex">
            <a href="/InstitutionHompage" className="text-gray-700 hover:text-black-800">Home</a>
            <a href="/InstitutionHompage" className="text-gray-700 hover:text-black-800">Contact Us</a>
            <a href="/InstitutionHompage" className="text-gray-700 hover:text-black-800">FAQ's</a>

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Search className="mr-1" /> Find a Candidate
            </button>

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Plus className="mr-1" /> Post New Job
            </button>

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <MapPin className="mr-1" /> Promote Walk Ins
            </button>

            {/* Dropdown Button */}
            <div className="relative">
              <button
                className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
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

          {/* Hamburger Menu Icon for Mobile */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white shadow-md md:hidden">
            <a href="/InstitutionHompage" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
            <a href="/InstitutionHompage" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact Us</a>
            <a href="/InstitutionHompage" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">FAQ's</a>

            <button className="flex items-center w-full p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Search className="mr-2" /> Find a Candidate
            </button>

            <button className="flex items-center w-full p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <Plus className="mr-2" /> Post New Job
            </button>

            <button className="flex items-center w-full p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600">
              <MapPin className="mr-2" /> Promote Walk Ins
            </button>

            <div className="mt-2">
              <button
                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                Evolvetech
              </button>

              {/* Mobile Dropdown */}
              {isDropdownOpen && (
                <div className="bg-white border rounded-md shadow-lg">
                  <a href="/my-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <User className="mr-2" /> My Profile
                  </a>
                  <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <LogOut className="mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default InstitutionNavbar;
