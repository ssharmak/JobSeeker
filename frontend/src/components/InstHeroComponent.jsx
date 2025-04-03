import React from 'react';
import { Briefcase, UserPlus, UserCheck, UserMinus, User, PauseCircle } from 'lucide-react';

const InstHeroComponent = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Job Post */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <Briefcase className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Job Posts</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">0</span>
        </div>

        {/* Candidates Saved */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <UserPlus className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Saved</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">0</span>
        </div>

        {/* Candidates Invited */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <User className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Invited</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">0</span>
        </div>

        {/* Candidates Shortlisted */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <UserCheck className="text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Shortlisted</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">0</span>
        </div>

        {/* Candidates Selected */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <User className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Candidates Selected</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">0</span>
        </div>

        {/* Candidates On Hold */}
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <PauseCircle className="text-red-500" />
            <span className="text-sm font-medium text-gray-700">Candidates On Hold</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">0</span>
        </div>
      </div>
    </div>
  );
};

export default InstHeroComponent;
