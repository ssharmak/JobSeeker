import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { X } from "lucide-react";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = "https://app.teachersearch.in";

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleResetPassword = async (values, { setSubmitting }) => {
    try {
      setError("");
      setMessage("");

      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        token,
        password: values.password,
      });

      if (response.data?.message) {
        setMessage(response.data.message);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage("Password has been reset. Redirecting...");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed. Try again.");
    }

    setSubmitting(false);
  };

  // If no token in query
  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-gray-900 bg-opacity-70">
      <div className="relative w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg sm:max-w-xl lg:max-w-2xl">
        <button onClick={() => navigate("/")} className="absolute text-gray-600 top-3 right-3 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Reset Password</h2>

        {message && <p className="mb-4 text-sm text-green-600 text-center">{message}</p>}
        {error && <p className="mb-4 text-sm text-red-600 text-center">{error}</p>}

        {!error && (
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleResetPassword}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-500" />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        )}

        <p className="mt-6 text-sm text-center text-gray-600">
          Back to{" "}
          <span className="font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
