import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobSeekerHomepage from './pages/Home_page'; // Import your component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<JobSeekerHomepage />} />
            </Routes>
        </Router>
    );
}

export default App;
