import React from 'react';
import InstitutionNavbar from '../components/instituteNavbar';
import InstSidebar from '../components/instSidebar';
import InstHeroComponent from '../components/InstHeroComponent';

const InstitutionHomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <InstitutionNavbar />

      {/* Content Layout */}
      <div className="flex flex-col flex-1 md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-64 bg-[#f8f9fa] p-4 shadow md:min-h-[calc(100vh-4rem)]">
          <InstSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto md:p-6">
          <InstHeroComponent />
        </main>
      </div>

      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/+919739866955"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 p-3 transition-colors duration-300 bg-green-500 rounded-full shadow-lg bottom-5 right-5 hover:bg-green-600"
      >
        <img
          src="/images/WhatsApp.svg"
          alt="WhatsApp"
          className="w-10 h-10"
        />
      </a>
    </div>
  );
};

export default InstitutionHomePage;
