import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <>
    <Navbar/>
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-2">
        Welcome to Teacher Search!. These terms and conditions outline the rules and regulations for the use of our platform.
      </p>
      <h2 className="text-2xl font-semibold mt-4">1. Acceptance of Terms</h2>
      <p>
        By accessing this website, you accept these terms and conditions in full.
        Do not continue to use Jobs in Education if you do not agree to all of the
        terms and conditions stated on this page.
      </p>
      <h2 className="text-2xl font-semibold mt-4">2. Use of Services</h2>
      <p>
        You agree to use our platform in accordance with applicable laws and not to
        engage in any unlawful activities.
      </p>
      <h2 className="text-2xl font-semibold mt-4">3. Modifications</h2>
      <p>
        Jobs in Education reserves the right to revise these terms at any time.
        By using this website, you are expected to review these terms regularly.
      </p>
      <h2 className="text-2xl font-semibold mt-4">4. Contact Us</h2>
      <p>
        If you have any questions about these Terms & Conditions, please contact us
        at support@jobsineducation.net.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;
