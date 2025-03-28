import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobSeekerHomepage from './pages/Home_page';
import LoginPage from './pages/login';
import EmployeeRegistrationForm from './pages/Employee-reg';
import InstitutionRegistrationForm from './pages/institution-reg';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<JobSeekerHomepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user" element={<EmployeeRegistrationForm />} />
                <Route path="/inst" element={<InstitutionRegistrationForm />} />
                <Route path="/ProfilePage" element={<ProfilePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;