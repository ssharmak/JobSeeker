import React, { useState } from 'react';
import InstitutionNavbar from '../components/instituteNavbar';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        institutionName: '',
        phone: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false); // To manage loading state
    const [error, setError] = useState(''); // To manage error state
    const [success, setSuccess] = useState(''); // To manage success state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Sending form data to your API endpoint using Axios
            const response = await axios.post('https://app.teachersearch.in/api/contact/contact', formData);
            
            // Handling successful form submission
            setLoading(false);
            setSuccess('Form submitted successfully!');
            console.log(response.data); // You can check the response in console
        } catch (err) {
            // Handling errors
            setLoading(false);
            setError('Failed to submit contact form.');
            console.error(err);
        }
    };

    return (
        <>
            <InstitutionNavbar />
            <div className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
                    <h2 className="mb-6 text-2xl font-bold text-center sm:text-3xl">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
                        {success && <p className="text-green-600">{success}</p>}
                        {error && <p className="text-red-600">{error}</p>}

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Institution Name</label>
                            <input
                                type="text"
                                name="institutionName"
                                value={formData.institutionName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-2 text-white transition duration-200 bg-blue-600 rounded-md sm:w-auto hover:bg-blue-700"
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
