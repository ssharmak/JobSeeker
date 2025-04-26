import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobSeekerHomepage from "./pages/Home_page";
import LoginPage from "./pages/login";
import EmployeeRegistrationForm from "./pages/Employee-reg";
import InstitutionRegistrationForm from "./pages/institution-reg";
import ProfilePage from "./pages/ProfilePage";
import InstitutionHomePage from "./pages/InstitutionHomePage";
import InstSidebar from "./components/instSidebar";
import ProfilePageInst from "./components/ProfilePageInst";
import Navbar from './components/Navbar';
import TeacherJobsPage from './pages/TeacherJobsPage';
import CandidateResults from "./pages/CandidateResults";
import AdminLogin from "./pages/admin/adminlogin";
import Dashboard from "./pages/admin/dashboard";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsAndConditions from "./pages/terms-conditions";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobSeekerHomepage />} />
        <Route path="/jobs/bangalore" element={<TeacherJobsPage />} />
        <Route path="/jobs/:location" element={<TeacherJobsPage />} />
        <Route path="/" element={< Navbar/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<EmployeeRegistrationForm />} />
        <Route path="/inst" element={<InstitutionRegistrationForm />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/InstitutionHomepage" element={<InstitutionHomePage />} />
        <Route path="/" element={<InstSidebar />} />
        <Route path="/InstitutionProfile" element={<ProfilePageInst />} />
        <Route path="/candidate-results" element={<CandidateResults/>}/>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms-conditions" element={<TermsAndConditions/>}/>
      </Routes>
    </Router>
  );
}

export default App;
