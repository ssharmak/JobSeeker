import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUS = () => {
  const [aboutUsContent, setAboutUsContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get("https://app.teachersearch.in/api/mis/aboutUs");
        const data = response.data;

        if (Array.isArray(data.content) && data.content.length > 0) {
          setAboutUsContent(data.content[0].content);
        } else {
          setError("No About Us content available.");
        }
      } catch (err) {
        console.error("Error fetching About Us:", err);
        setError("Failed to load About Us content.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl p-8 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center">About Us</h1>
        <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
          {aboutUsContent}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutUS;
