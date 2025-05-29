import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, onLogout, loggingOut }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-[calc(100vh-56px)] md:fixed md:top-14 md:left-0 bg-white shadow-md p-6">
        <nav className="flex flex-col space-y-4 text-gray-700">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-blue-600' : 'hover:text-blue-600'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/admin/addcredits"
            className={({ isActive }) =>
              isActive ? 'font-semibold text-blue-600' : 'hover:text-blue-600'
            }
          >
            Add Credits
          </NavLink>
        </nav>
      </aside>

      {/* Mobile sidebar toggle + sidebar */}
      <div className="md:hidden">
        <header className="fixed top-0 left-0 z-50 flex items-center justify-between w-full p-4 bg-white shadow-md">
          <div className="text-xl font-bold text-gray-800">My Dashboard</div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </header>

        {/* Mobile Sidebar panel */}
        <aside
          className={`
            fixed top-14 left-0 w-64 bg-white h-[calc(100vh-56px)] shadow-md p-6 z-40
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="flex flex-col space-y-4 text-gray-700">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? 'font-semibold text-blue-600' : 'hover:text-blue-600'
              }
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/admin/addcredits"
              className={({ isActive }) =>
                isActive ? 'font-semibold text-blue-600' : 'hover:text-blue-600'
              }
              onClick={() => setSidebarOpen(false)}
            >
              Add Credits
            </NavLink>
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );
};


export default AdminSidebar;
