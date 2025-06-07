import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "https://app.teachersearch.in";

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const handleForgotPassword = async (values, { setSubmitting }) => {
    try {
      setError("");
      setMessage("");

      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, values);

      if (response.data?.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Password reset link sent. Please check your email.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }

    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-gray-900 bg-opacity-70">
      <div className="relative w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg sm:max-w-xl lg:max-w-2xl">
        {/* Close Button */}
        <button onClick={() => navigate("/")} className="absolute text-gray-600 top-3 right-3 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>

        {/* Info Message */}
        {message && <p className="mb-4 text-sm text-green-600 text-center">{message}</p>}
        {error && <p className="mb-4 text-sm text-red-600 text-center">{error}</p>}

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-sm text-center text-gray-600">
          Back to{" "}
          <span
            className="font-medium text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
