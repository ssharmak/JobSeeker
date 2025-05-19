import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get("https://app.teachersearch.in/api/mis/terms");
        const data = response.data;

        const firstTerm = data.terms && data.terms.length > 0 ? data.terms[0] : null;

        if (firstTerm && Array.isArray(firstTerm.sections) && firstTerm.sections.length > 0) {
          setTerms(firstTerm);
        } else {
          setError("No valid Terms & Conditions found.");
        }
      } catch (err) {
        console.error("Error fetching terms:", err);
        setError("Failed to load Terms & Conditions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl p-8 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">{terms.title}</h1>
        {terms.sections.map((section, idx) => (
          <div key={section._id || idx} className="mb-6">
            <h2 className="mt-4 text-2xl font-semibold">{section.heading}</h2>
            <div
              className="mt-2 text-gray-700"
              dangerouslySetInnerHTML={{ __html: section.body }}
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
