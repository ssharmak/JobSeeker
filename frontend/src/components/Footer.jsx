import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 bg-white shadow-md">
      {/* Footer Main Content */}
      <div className="container px-4 mx-auto mb-8 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
          {/* JobSeek Section */}
          <div className="text-center">
            <h3 className="mb-4 font-semibold text-gray-800">JobSeek</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Careers</a></li>
            </ul>
          </div>

          {/* Help & Support Section */}
          <div className="text-center">
            <h3 className="mb-4 font-semibold text-gray-800">Help & Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Help center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Report Issue</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="text-center">
            <h3 className="mb-4 font-semibold text-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-gray-600 hover:text-blue-600">Privacy policy</a></li>
              <li><a href="/terms-conditions" className="text-gray-600 hover:text-blue-600">Terms & conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mb-4 text-center text-gray-500">
          © 2025 JobSeek. All rights reserved.
        </div>

        {/* Social Media Icons Section */}
        <div className="flex justify-center mb-4 space-x-6">
          {[{
            Icon: 'Facebook',
            path: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z',
          }, {
            Icon: 'Twitter',
            path: 'M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z',
          }, {
            Icon: 'Instagram',
            path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
          }, {
            Icon: 'LinkedIn',
            path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
          }].map((social, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-600 transition hover:text-blue-600"
              aria-label={social.Icon}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
