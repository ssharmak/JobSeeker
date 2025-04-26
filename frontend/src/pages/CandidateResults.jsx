import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import InstitutionNavbar from '../components/instituteNavbar';
import InstSidebar from '../components/instSidebar';

const CandidateResults = () => {
  const location = useLocation();
  const candidates = location.state?.candidates || [];

  // Manage expanded details for each candidate using an object
  const [expandedCandidates, setExpandedCandidates] = useState({});

  // Handle expanding details for a specific candidate
  const expandCandidate = (index) => {
    setExpandedCandidates((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <>
      <InstitutionNavbar />

      <div className="flex">
        {/* Sidebar */}
        <InstSidebar />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-start w-full p-6">
          <h2 className="mb-6 text-2xl font-bold text-center">Candidate Results</h2>

          {candidates.length === 0 ? (
            <p className="text-center text-gray-500">No candidates found.</p>
          ) : (
            <div className="grid w-full max-w-4xl grid-cols-1 gap-4">
              {candidates.map((candidate, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between h-auto p-4 bg-white border rounded-md shadow-sm hover:shadow-md"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {candidate.first_name} {candidate.last_name}
                    </h3>

                    {/* Display current job (work experience) */}
                    {candidate.work_experience && candidate.work_experience.length > 0 && (
                      <div className="mt-4">
                        <p className="font-semibold">Current Job:</p>
                        <p className="text-sm text-gray-600">
                          {candidate.work_experience[0].company} - {candidate.work_experience[0].position}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Show View button only if not expanded yet */}
                  {!expandedCandidates[index] && (
                    <button
                      className="mt-2 font-semibold text-blue-600"
                      onClick={() => expandCandidate(index)}
                    >
                      View
                    </button>
                  )}

                  {/* Additional details shown after View is clicked */}
                  {expandedCandidates[index] && (
                    <div className="grid grid-cols-3 gap-2 mt-4 ml-10">
                      <button
                        className="w-[10rem] p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        onClick={() => window.open(candidate.resume_link, '_blank')}
                      >
                        View Resume
                      </button>

                      <button
                        className="w-[10rem] p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        onClick={() => window.open(candidate.profile_link, '_blank')}
                      >
                        View Profile
                      </button>

                      <button
                        className="w-[10rem] p-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                        onClick={() => window.location.href = `tel:${candidate.phone}`}
                      >
                        Call {candidate.phone}
                      </button>
                    </div>
                  )}

                  {/* Display LinkedIn Profile */}
                  {candidate.linkedin_profile && (
                    <p className="mt-2 text-sm text-blue-600">
                      <a
                        href={
                          candidate.linkedin_profile.startsWith('http')
                            ? candidate.linkedin_profile
                            : `https://${candidate.linkedin_profile}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidateResults;
