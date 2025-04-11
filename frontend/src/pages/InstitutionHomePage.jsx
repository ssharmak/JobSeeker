import React from 'react';
import InstitutionNavbar from '../components/instituteNavbar';
import InstSidebar from '../components/instSidebar';
import InstHeroComponent from '../components/InstHeroComponent';

const InstitutionHomePage = () => {
  return (
    <div className="relative flex flex-col min-h-screen"> {/* Added 'relative' for positioning */}
      {/* Navbar at the top */}
      <InstitutionNavbar />

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[16rem] p-1 bg-[#fff]">
          <InstSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-white">
          <InstHeroComponent />
        </div>
      </div>

      {/* Floating WhatsApp Icon */}
      <a 
        href="https://wa.me/+919739866955"  // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed p-3 transition duration-300 bg-green-500 rounded-full shadow-lg bottom-5 right-5 hover:bg-green-600"
      >
        <img 
          src="./images/whatsapp.svg"
          alt="WhatsApp" 
          className="w-10 h-10" 
        />
      </a>
    </div>
  );
};

export default InstitutionHomePage;
