import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  MapPin,
  Users,
  FileText,
  Wallet,
  Settings,
  X,
  Lock,
  Mail,
  Edit2,
  Check,
  Shield,
  Calendar,
  Menu,
} from "lucide-react";

const InstSidebar = () => {
  const [candidatesOpen, setCandidatesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isPromotionalMailsEnabled, setIsPromotionalMailsEnabled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar toggle

  const toggleCandidatesMenu = () => setCandidatesOpen(!candidatesOpen);
  const toggleSettingsPopup = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleTwoFactor = () => setIsTwoFactorEnabled(!isTwoFactorEnabled);
  const togglePromotionalMails = () => setIsPromotionalMailsEnabled(!isPromotionalMailsEnabled);

  const handleEditPassword = () => setIsEditingPassword(true);
  const handleCancelEdit = () => {
    setIsEditingPassword(false);
    setNewPassword("");
  };
  const handleSavePassword = () => {
    console.log("New Password:", newPassword);
    setIsEditingPassword(false);
  };

  const handleBookDemo = () => {
    alert("Booking a demo! You can replace this with actual API integration.");
  };

  return (
    <div className="flex">
      {/* Mobile Hamburger Menu */}
      <div className="p-4 lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-blue-500"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar (Fixed) */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 min-h-full p-4 space-y-4 bg-white border-r border-gray-300 shadow-lg`}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center p-4 space-y-2 bg-gray-100 rounded-md">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-16 h-16 border-2 border-blue-500 rounded-full"
            />
            <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
              <Edit2 className="w-4 h-4 text-blue-500" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-gray-800">
              Evoltech EdTech Consultancy
            </h3>
            <p className="text-xs text-gray-600">shri@evoltech.in</p>
          </div>

          {/* Edit Profile Button */}
          <Link
            to="/InstitutionProfile"
            className="block px-4 py-1 text-xs font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </Link>
        </div>

        {/* Candidates */}
        <div>
          <div
            className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={toggleCandidatesMenu}
          >
            <ChevronDown className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">
              Candidates
            </span>
          </div>
          {candidatesOpen && (
            <div className="pl-8 space-y-1 bg-white">
              <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                Suggested
              </div>
              <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                Application
              </div>
              <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                On Hold
              </div>
              <div className="p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                Not Selected
              </div>
            </div>
          )}
        </div>

        {/* Walk-in Drives */}
        <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100">
          <MapPin className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            Walk-in Drives
          </span>
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

        {/* Settings - Open Popup */}
        <div
          className="flex items-center p-2 space-x-3 rounded-md cursor-pointer hover:bg-gray-100"
          onClick={toggleSettingsPopup}
        >
          <Settings className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Settings</span>
        </div>

        {/* Book a Demo Button */}
        <div className="mt-4">
          <button
            onClick={handleBookDemo}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 font-semibold text-black transition duration-300 bg-orange-100 rounded-lg shadow-md hover:bg-orange-200"
          >
            <Calendar className="w-5 h-5 text-orange-500" />
            Book a Demo
          </button>
        </div>
      </div>

      {/* Settings Popup */}
      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[350px] p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Settings</h2>
              <button onClick={toggleSettingsPopup}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2">
                  <Shield className="text-blue-500" />
                  <span className="text-sm font-medium">
                    Two-Factor Authentication
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isTwoFactorEnabled}
                  onChange={toggleTwoFactor}
                  className="w-4 h-4 cursor-pointer accent-blue-500"
                />
              </div>

              {/* Promotional Mails */}
              <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2">
                  <Mail className="text-blue-500" />
                  <span className="text-sm font-medium">Promotional Mails</span>
                </div>
                <input
                  type="checkbox"
                  checked={isPromotionalMailsEnabled}
                  onChange={togglePromotionalMails}
                  className="w-4 h-4 cursor-pointer accent-blue-500"
                />
              </div>

              {/* Reset Password */}
              <div className="p-2 bg-gray-100 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="text-blue-500" />
                    <span className="text-sm font-medium">Reset Password</span>
                  </div>
                  {!isEditingPassword ? (
                    <button
                      onClick={handleEditPassword}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCancelEdit}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {isEditingPassword && (
                  <div className="flex items-center mt-2 space-x-2">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new password"
                    />
                    <button
                      onClick={handleSavePassword}
                      className="p-2 text-green-500 hover:text-green-700"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstSidebar;
