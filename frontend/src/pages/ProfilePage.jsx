import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LandingPage from "../components/LandingPage";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import SkillsSection from "../components/SkillsSection";
import LanguagesSection from "../components/LanguagesSection";
import ProfileSummary from "../components/ProfileSummary";
import WorkPreferences from "../components/WorkPreferences";
import InternshipsSection from "../components/InternshipsSection";
import EmploymentSection from "../components/EmploymentSection";
import PersonalProfile from "../components/PersonalProfile";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    address: "",
    github: "",
    linkedin: "",
    hackerrank: "",
    resume: "",
    profilePic: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No access token found. Please log in.");
        }

        const response = await axios.get(
          "https://app.teachersearch.in/api/profile/getCandprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data);

        if (response.data && "candidate" in response.data) {
          const candidateData = response.data.candidate;
          if (candidateData) {
            setUser(candidateData);
          } else {
            throw new Error("Candidate profile is empty.");
          }
        } else {
          throw new Error("Candidate not found.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "An error occurred while fetching the profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case "landing":
        return <LandingPage user={user} />;
      case "personalProfile":
        return <PersonalProfile user={user} setUser={setUser} />;
      case "education":
        return <EducationSection />;
      case "experience":
        return <ExperienceSection />;
      case "skills":
        return <SkillsSection />;
      case "languages":
        return <LanguagesSection />;
      case "profileSummary":
        return <ProfileSummary />;
      case "workPreferences":
        return <WorkPreferences />;
      case "internships":
        return <InternshipsSection />;
      case "employment":
        return <EmploymentSection />;
      default:
        return <LandingPage user={user} />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Styles
  const profilePageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    position: "relative",
  };

  const mobileMenuButtonStyle = {
    display: window.innerWidth <= 768 ? "block" : "none",
    position: "fixed",
    top: "80px",
    left: "20px",
    zIndex: 1000,
    background: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const hamburgerStyle = {
    width: "24px",
    height: "18px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const hamburgerLineStyle = {
    height: "3px",
    width: "100%",
    background: "#333",
    borderRadius: "3px",
    transition: "0.3s ease-in-out",
  };

  const sidebarOverlayStyle = {
    display: sidebarOpen && window.innerWidth <= 768 ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
    backdropFilter: "blur(4px)",
  };

  const loadingContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    textAlign: "center",
    padding: "40px 20px",
  };

  const loadingSpinnerStyle = {
    width: "60px",
    height: "60px",
    border: "4px solid #e3e3e3",
    borderTop: "4px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  };

  const loadingTextStyle = {
    fontSize: "18px",
    color: "#666",
    fontWeight: "500",
    margin: 0,
  };

  const errorContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    textAlign: "center",
    padding: "40px 20px",
    background: "#fff",
    margin: "20px",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  };

  const errorIconStyle = {
    fontSize: "64px",
    marginBottom: "20px",
    opacity: 0.8,
  };

  const errorTitleStyle = {
    color: "#e74c3c",
    fontSize: window.innerWidth <= 480 ? "20px" : "28px",
    fontWeight: "700",
    margin: "0 0 16px 0",
    lineHeight: 1.3,
  };

  const errorMessageStyle = {
    color: "#666",
    fontSize: window.innerWidth <= 480 ? "14px" : "16px",
    margin: "0 0 30px 0",
    maxWidth: "500px",
    lineHeight: 1.5,
  };

  const retryButtonStyle = {
    background: "linear-gradient(135deg, #007bff, #0056b3)",
    color: "white",
    border: "none",
    padding: window.innerWidth <= 480 ? "12px 24px" : "14px 32px",
    borderRadius: "12px",
    fontSize: window.innerWidth <= 480 ? "14px" : "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
  };

  const profileContainerStyle = {
    display: "flex",
    minHeight: "calc(100vh - 140px)",
    marginTop: window.innerWidth <= 768 ? "80px" : "20px",
    marginBottom: "20px",
    position: "relative",
  };

  const sidebarWrapperStyle = {
    position: "fixed",
    left: 0,
    top: window.innerWidth <= 768 ? 0 : "80px",
    height: window.innerWidth <= 768 ? "100vh" : "calc(100vh - 140px)",
    width: window.innerWidth <= 1024 ? "260px" : "280px",
    zIndex: 999,
    transform: window.innerWidth <= 768 && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
    transition: "transform 0.3s ease",
    background: "#fff",
    boxShadow: "2px 0 20px rgba(0, 0, 0, 0.1)",
    borderRadius: window.innerWidth <= 768 ? "0" : "0 16px 16px 0",
    overflowY: "auto",
  };

  const contentWrapperStyle = {
    flex: 1,
    marginLeft: window.innerWidth <= 768 ? 0 : window.innerWidth <= 1024 ? "260px" : "280px",
    transition: "margin-left 0.3s ease",
  };

  const contentContainerStyle = {
    padding: window.innerWidth <= 480 ? "0 10px" : window.innerWidth <= 768 ? "0 15px" : window.innerWidth <= 1024 ? "0 20px" : "0 30px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const sectionContentStyle = {
    background: "#fff",
    borderRadius: window.innerWidth <= 480 ? "12px" : "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    padding: window.innerWidth <= 480 ? "20px 15px" : window.innerWidth <= 768 ? "25px 20px" : window.innerWidth <= 1024 ? "30px" : "40px",
    marginBottom: window.innerWidth <= 768 ? "20px" : "30px",
    minHeight: "500px",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    animation: "fadeIn 0.5s ease-out",
  };

  // CSS Keyframes for animations
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .section-content:hover {
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15) !important;
      transform: translateY(-2px) !important;
    }
    
    .mobile-menu-button:hover {
      background: #f8f9fa !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2) !important;
    }
    
    .retry-button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4) !important;
    }
    
    .mobile-menu-button:focus,
    .retry-button:focus {
      outline: 2px solid #007bff !important;
      outline-offset: 2px !important;
    }
    
    /* Scrollbar Styling */
    .sidebar-wrapper::-webkit-scrollbar {
      width: 6px;
    }
    
    .sidebar-wrapper::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    
    .sidebar-wrapper::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }
    
    .sidebar-wrapper::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  `;
  
  // Add styles to head
  React.useEffect(() => {
    document.head.appendChild(styleSheet);
    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  // Handle responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={profilePageStyle}>
      <Navbar />
      
      {/* Mobile Menu Button */}
      <button 
        style={mobileMenuButtonStyle}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="mobile-menu-button"
      >
        <div style={hamburgerStyle}>
          <span style={{
            ...hamburgerLineStyle,
            transform: sidebarOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
          }}></span>
          <span style={{
            ...hamburgerLineStyle,
            opacity: sidebarOpen ? 0 : 1
          }}></span>
          <span style={{
            ...hamburgerLineStyle,
            transform: sidebarOpen ? "rotate(-45deg) translate(7px, -6px)" : "none"
          }}></span>
        </div>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && <div style={sidebarOverlayStyle} onClick={toggleSidebar}></div>}

      {loading ? (
        <div style={loadingContainerStyle}>
          <div style={loadingSpinnerStyle}></div>
          <p style={loadingTextStyle}>Loading your profile...</p>
        </div>
      ) : error ? (
        <div style={errorContainerStyle}>
          <div style={errorIconStyle}>⚠️</div>
          <h2 style={errorTitleStyle}>Oops! Something went wrong</h2>
          <p style={errorMessageStyle}>{error}</p>
          <button 
            style={retryButtonStyle}
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div style={profileContainerStyle}>
          <div style={sidebarWrapperStyle} className="sidebar-wrapper">
            <Sidebar 
              setSelectedSection={(section) => {
                setSelectedSection(section);
                if (window.innerWidth <= 768) {
                  setSidebarOpen(false);
                }
              }}
              selectedSection={selectedSection}
            />
          </div>
          
          <main style={contentWrapperStyle}>
            <div style={contentContainerStyle}>
              <div style={sectionContentStyle} className="section-content">
                {renderSection()}
              </div>
            </div>
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProfilePage;