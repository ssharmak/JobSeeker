import React, { useState } from 'react';
import { Search, Plus, MapPin, User, LogOut, Menu, X, Check } from 'lucide-react';

const InstitutionNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false); // State for the "Find a Candidate" popup
  const [isHiringFor, setIsHiringFor] = useState(""); // State for "Hiring For" dropdown
  const [selectedSearchOption, setSelectedSearchOption] = useState(""); // Track which option is selected
  const [isSearchWithinDomain, setIsSearchWithinDomain] = useState(false); // State for "Search within My own domain"
  const [isEntireDatabase, setIsEntireDatabase] = useState(false); // State for "Entire Database" selection

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const togglePopUp = () => setIsPopUpOpen(!isPopUpOpen);

  const handleHiringForChange = (e) => setIsHiringFor(e.target.value);

  const handleSearchOptionChange = (option) => {
    setSelectedSearchOption(option);
    if (option === 'My Own Domain') {
      setIsSearchWithinDomain(true);
      setIsEntireDatabase(false);
    } else if (option === 'Entire Database') {
      setIsSearchWithinDomain(false);
      setIsEntireDatabase(true);
    }
  };

  const handleEntireDatabaseChange = () => setIsEntireDatabase(!isEntireDatabase);

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

            <button className="flex items-center p-2 font-semibold text-blue-700 border rounded-md bg-sky-100 hover:text-black-600" onClick={togglePopUp}>
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
                  <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <LogOut className="mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Pop-up Modal for "Find a Candidate" */}
      {isPopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-md shadow-lg w-[50rem]">
            <h2 className="mb-4 text-xl font-semibold text-center">Find a Candidate</h2>

            {/* Hiring For Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700">Hiring For</label>
              <select
                className="w-full p-2 border rounded-md"
                value={isHiringFor}
                onChange={handleHiringForChange}
              >
                <option value="">Select an option</option>
                <option value="Evolvetech">Evolvetech</option>
                {/* Add more options here if needed */}
              </select>
            </div>

            {/* Search for Existing Jobs */}
            <div className="mb-4">
              <span className="text-gray-700">Search for existing jobs?</span>
              <div className="flex justify-center mt-2 space-x-4">
                <button
                  className={`flex items-center p-2 font-semibold rounded-md ${selectedSearchOption === 'Yes' ? 'bg-blue-500 text-white' : 'text-blue-700 border'}`}
                  onClick={() => handleSearchOptionChange('Yes')}
                >
                  {selectedSearchOption === 'Yes' && <Check className="mr-2" />} Yes
                </button>
                <button
                  className={`flex items-center p-2 font-semibold rounded-md ${selectedSearchOption === 'No' ? 'bg-blue-500 text-white' : 'text-blue-700 border'}`}
                  onClick={() => handleSearchOptionChange('No')}
                >
                  {selectedSearchOption === 'No' && <Check className="mr-2" />} No
                </button>
              </div>
            </div>

            {/* Search within My Own Domain and Entire Database */}
            <div className="mb-4">
              <span className="text-gray-700">Search within My own domain or Entire Database?</span>
              <div className="flex justify-center mt-2 space-x-4">
                <button
                  onClick={() => handleSearchOptionChange('My Own Domain')}
                  className={`flex items-center p-2 font-semibold text-blue-700 border rounded-md ${selectedSearchOption === 'My Own Domain' ? 'bg-blue-500 text-white' : 'bg-sky-100'} w-40`}
                >
                  {selectedSearchOption === 'My Own Domain' && <Check className="mr-2" />} My Own Domain
                </button>
                <button
                  onClick={() => handleSearchOptionChange('Entire Database')}
                  className={`flex items-center p-2 font-semibold text-blue-700 border rounded-md ${selectedSearchOption === 'Entire Database' ? 'bg-blue-500 text-white' : 'bg-sky-100'} w-40`}
                >
                  {selectedSearchOption === 'Entire Database' && <Check className="mr-2" />} Entire Database
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4">
              <label className="block text-gray-700">Select by Job Title</label>
              <div className="flex items-center p-2 border rounded-md">
                <Search className="mr-2 text-gray-500" />
                <input
                  type="text"
                  className="w-full border-none focus:outline-none"
                  placeholder="Select by job title"
                />
              </div>
            </div>

            {/* Find a Candidate Button - Centered */}
            <div className="flex justify-center">
              <button className="w-[20rem] p-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Find a Candidate
              </button>
            </div>

            {/* Close Pop-up Button */}
            <button
              className="absolute text-gray-700 top-2 right-2"
              onClick={togglePopUp}
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutionNavbar;
