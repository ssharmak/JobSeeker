import React, { useState } from 'react';
import { User, ChevronDown, MapPin, Users, FileText, Wallet, Settings } from 'lucide-react';

const InstSidebar = () => {
  const [candidatesOpen, setCandidatesOpen] = useState(false);

  const toggleCandidatesMenu = () => {
    setCandidatesOpen(!candidatesOpen);
  };

  return (
    <div className="w-64 min-h-full p-4 space-y-4 bg-white border-r border-gray-300 shadow-lg">
      {/* Profile Section */}
      <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100">
        <User className="text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Profile</span>
      </div>

      {/* Candidates Section */}
      <div>
        <div
          className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100"
          onClick={toggleCandidatesMenu}
        >
          <ChevronDown className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Candidates</span>
        </div>
        {candidatesOpen && (
          <div className="pl-8 space-y-1 bg-white">
            <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Suggested</div>
            <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Application</div>
            <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">On Hold</div>
            <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">Not Selected</div>
          </div>
        )}
      </div>

      {/* Walk-in Drives */}
      <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100">
        <MapPin className="text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Walk-in Drives</span>
      </div>

      {/* Panelists */}
      <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100">
        <Users className="text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Panelists</span>
      </div>

      {/* Templates */}
      <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100">
        <FileText className="text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Templates</span>
      </div>

      {/* Wallet */}
      <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100">
        <Wallet className="text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Wallet</span>
      </div>

      {/* Settings */}
      <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100">
        <Settings className="text-blue-500" />
        <span className="text-sm font-medium text-gray-700">Settings</span>
      </div>

      {/* Book a Demo Button */}
      <div className="mt-4">
        <button className="w-full px-4 py-2 font-semibold text-black transition duration-300 bg-orange-100 rounded-lg shadow-md hover:bg-orange-200">
          Book a Demo
        </button>
      </div>
    </div>
  );
};

export default InstSidebar;
