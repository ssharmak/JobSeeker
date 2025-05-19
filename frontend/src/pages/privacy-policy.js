import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar/>
      <div className="max-w-4xl p-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-2">
        At Jobs in Education, we respect your privacy and are committed to protecting
        your personal data.
      </p>
      <h2 className="mt-4 text-2xl font-semibold">1. Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address, and
        phone number when you use our platform.
      </p>
      <h2 className="mt-4 text-2xl font-semibold">2. How We Use Your Information</h2>
      <p>
        Your information is used to improve our services, communicate with you, and
        enhance your experience on our platform.
      </p>
      <h2 className="mt-4 text-2xl font-semibold">3. Security</h2>
      <p>
        We take appropriate security measures to protect your personal information
        from unauthorized access or disclosure.
      </p>
      <h2 className="mt-4 text-2xl font-semibold">4. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at
        support@jobsineducation.net.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
