import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import InstitutionNavbar from '../components/instituteNavbar';
import FilterSidebar from '../components/FilterSidebar';

const CandidateResults = () => {
  const location = useLocation();

  const [showResumePopup, setShowResumePopup] = useState(false);
  const [candidateToDownload, setCandidateToDownload] = useState(null);
  const [popupTitle, setPopupTitle] = useState('');
  const [expandedCandidates, setExpandedCandidates] = useState(new Set());
  const [apiCandidates, setApiCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Inactive': return 'bg-gray-500';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://app.teachersearch.in/api/institutionfilter/filterCandidates');
      setApiCandidates(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch candidates');
      setApiCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleClosePopup = () => {
    setShowResumePopup(false);
  };

  const handleDownloadResume = (candidate) => {
    setCandidateToDownload(candidate);
    setPopupTitle('Purchase Credits');
    setShowResumePopup(true);
  };

  const handleCall = (candidate) => {
    setCandidateToDownload(candidate);
    setPopupTitle('Purchase Credits');
    setShowResumePopup(true);
  };

  const handlePurchaseCredits = () => {
    alert('Redirecting to purchase credits...');
    handleClosePopup();
  };

  const toggleCandidateView = (candidateKey) => {
    setExpandedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(candidateKey)) {
        newSet.delete(candidateKey);
      } else {
        newSet.add(candidateKey);
      }
      return newSet;
    });
  };

  return (
    <>
      <InstitutionNavbar />
      <div className="flex min-h-screen bg-gray-100">
        {/* <InstSidebar /> */}
        <FilterSidebar/>
        <div className="flex flex-col items-center flex-1 p-6">
          <h2 className="mb-6 text-2xl font-bold text-center">Candidate Results</h2>

          {loading && <p className="text-center text-gray-500">Loading candidates...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {apiCandidates.length === 0 && !loading ? (
            <p className="text-center text-gray-500">No candidates found.</p>
          ) : (
            <div className="w-full max-w-5xl px-2 space-y-6 sm:px-0">
              {apiCandidates.map((candidate, index) => {
                const candidateKey = candidate.id || `fallback-${index}`;
                const isExpanded = expandedCandidates.has(candidateKey);

                return (
                  <div
                    key={candidateKey}
                    className="relative w-full min-w-[280px] p-4 sm:p-6 bg-white border rounded-lg shadow hover:shadow-md transition-all"
                  >
                    {isExpanded && (
                      <div className="absolute text-lg font-bold text-green-600 top-2 left-2">
                        ✔
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {candidate.first_name} {candidate.last_name}
                      </h3>
                      {candidate.status && (
                        <span className={`mt-1 sm:mt-0 px-3 py-1 text-sm font-medium text-white rounded-full ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      )}
                    </div>

                    {/* Education */}
                    {candidate.education?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Education:</p>
                        <ul className="pl-5 text-sm text-gray-600 list-disc">
                          {candidate.education.map((edu, idx) => (
                            <li key={idx}>{edu.degree} - {edu.field_of_study}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Work Experience */}
                    {candidate.work_experience?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Work Experience:</p>
                        <ul className="pl-5 text-sm text-gray-600 list-disc">
                          {candidate.work_experience.map((work, idx) => (
                            <li key={idx}>
                              {work.position} at {work.company} ({work.start_date} - {work.end_date})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View and Actions */}
                    <div className="mt-4">
                      {!isExpanded ? (
                        <button
                          onClick={() => toggleCandidateView(candidateKey)}
                          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-md"
                        >
                          View
                        </button>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
                          <button
                            onClick={() => handleDownloadResume(candidate)}
                            className="w-full px-4 py-2 mb-2 text-white bg-green-500 rounded-md"
                          >
                            Download Resume
                          </button>
                          <button
                            onClick={() => alert('Viewing profile of ' + candidate.first_name)}
                            className="w-full px-4 py-2 mb-2 text-white bg-yellow-500 rounded-md"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => handleCall(candidate)}
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
                          >
                            Call
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Resume/Call Purchase Popup */}
          {showResumePopup && candidateToDownload && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{popupTitle}</h3>
                <p className="mt-2 text-gray-700">You need to purchase credits to perform this action.</p>
                <div className="flex justify-end gap-4 mt-6">
                  <button onClick={handlePurchaseCredits} className="px-4 py-2 text-white bg-blue-500 rounded-md">
                    Purchase Credits
                  </button>
                  <button onClick={handleClosePopup} className="px-4 py-2 text-white bg-red-500 rounded-md">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CandidateResults;
