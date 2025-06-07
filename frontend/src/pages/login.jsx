import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [userType, setUserType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = "https://app.teachersearch.in";

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    const loginUrl =
      userType === "user"
        ? `${API_BASE_URL}/api/auth/login-user`
        : `${API_BASE_URL}/api/auth/login-inst`;

    try {
      const response = await axios.post(loginUrl, values, { withCredentials: true });

      //console.log("Login Response:", response.data);

      // Extract accessToken
      let accessToken = null;
      if (response.data?.accessToken) {
        accessToken = response.data.accessToken;
      } else if (response.data?.token) {
        accessToken = response.data.token;
      } else if (response.data?.message?.startsWith("AccessToken: ")) {
        accessToken = response.data.message.split("AccessToken: ")[1];
      }

      if (accessToken) {
        // ✅ Store token and refresh token
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken || "");

        // ✅ Store institution ID or user ID
        if (userType === "institution" && response.data.institution?._id) {
          localStorage.setItem("institutionId", response.data.institution._id);
        } else if (userType === "user" && response.data.user?._id) {
          localStorage.setItem("userId", response.data.user._id);
        }

        alert("Login Successful!");
        navigate(userType === "user" ? "/" : "/InstitutionHomepage");
      } else {
        setErrors({ general: "No token received from server." });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrors({
        general: error.response?.data?.message || "Login failed. Please check your credentials."
      });
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

        {/* Heading */}
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          {userType === "user" ? "User Login" : "Institution Login"}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex mb-6 overflow-hidden border rounded-md">
          <button
            className={`w-1/2 py-2 font-medium transition-colors duration-200 ${userType === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setUserType("user")}
          >
            User
          </button>
          <button
            className={`w-1/2 py-2 font-medium transition-colors duration-200 ${userType === "institution" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setUserType("institution")}
          >
            Institution
          </button>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form>
  {/* General Error Message */}
  {errors.general && (
    <p className="mb-4 text-sm text-center text-red-600">{errors.general}</p>
  )}

  {/* Email Field */}
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium text-gray-700">Email ID</label>
    <Field
      type="email"
      name="email"
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={userType === "user" ? "Enter your Email" : "Enter your Registered Email"}
    />
    <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
  </div>

  {/* Password Field */}
  <div className="mb-1">
    <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
    <div className="relative">
      <Field
        type={showPassword ? "text" : "password"}
        name="password"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Password"
      />
      <button
        type="button"
        className="absolute inset-y-0 flex items-center text-gray-600 right-3"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
    <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
  </div>

  {/* Forgot Password */}
  <div className="mb-4 text-right">
    <span
      className="text-sm text-blue-600 cursor-pointer hover:underline"
      onClick={() => navigate("/forgot-password")}
    >
      Forgot Password?
    </span>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full py-2 mt-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Logging in..." : "Login"}
  </button>
</Form>

          )}
        </Formik>

        {/* Register Link */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="font-medium text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate(userType === "user" ? "/user" : "/inst")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
