import React from 'react';
import InstitutionNavbar from '../components/instituteNavbar';
import InstSidebar from '../components/instSidebar';
import InstHeroComponent from '../components/InstHeroComponent';

const InstitutionHomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <InstitutionNavbar />

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[16rem] p-1 bg-[#fff]">
          <InstSidebar />
        </div>

        {/* Main Content (adjust width as needed) */}
        <div className="flex-1 p-6 bg-white">
          <InstHeroComponent/>
        </div>
      </div>
    </div>
  );
};

export default InstitutionHomePage;
