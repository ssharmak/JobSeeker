import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";

// Validation schema for each step
const validationSchema = {
  0: yup.object({
    name: yup.string().required("Institution Name is required"),
    country: yup.string().required("Country is required"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
      .required("Mobile number is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    city: yup.string().required("City is required"),
    street: yup.string().required("Street is required"),
    state: yup.string().required("State is required"),
    postalcode: yup
      .string()
      .matches(/^[0-9]{6}$/, "Enter a valid postal code")
      .required("Postal code is required"),
  }),
  1: yup.object({
    otp1: yup
      .string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
  }),
  2: yup.object({
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .matches(/[A-Z]/, "Must have at least one uppercase letter")
      .matches(/[a-z]/, "Must have at least one lowercase letter")
      .matches(/[0-9]/, "Must contain a number")
      .matches(/[!@#$%^&*]/, "Must have a special character")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  }),
};


const InstitutionRegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [tempToken, setTempToken] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [selectedType, setSelectedType] = useState("institution");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    country: "India",
    mobile: "",
    email: "",
    city: "",
    street: "",
    state: "",
    postalcode: "",
    otp1: "",
    password: "",
    confirmPassword: "",
  };

  const API_BASE_URL = "https://app.teachersearch.in";

  const handleNext = async (values, validateForm, setErrors, setSubmitting) => {
    setSubmitting(true);
    try {
      const errors = await validateForm();
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        setSubmitting(false);
        return;
      }

      if (step === 0) {
        const response = await axios.post(`${API_BASE_URL}/api/auth/register-inst`, {
          name: values.name,
          country: values.country,
          mobile_number: values.mobile,
          email: values.email,
          city: values.city,
          street: values.street,
          state: values.state,
          postal_code: values.postalcode,
        });

        if (response.data.message === "OTP sent successfully") {
          setStep(1);
        } else {
          if (response.data.message && response.data.message.toLowerCase().includes("duplicate")) {
            setErrors({ api: "User Already registered" });
          } else {
            setErrors({ api: response.data.message || "Registration failed" });
          }
        }
      } else if (step === 1) {
        const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp-inst`, {
          otp1: values.otp1,
        });

        setTempToken(response.data.token);
        setStep(2);
      }
    }  catch (error) {
      console.error("Axios Error:", error);
      console.error("Error Response:", error.response);
      setErrors({ api: error.response?.data?.message || "An error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/password-inst`,
        { password: values.password },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );
      alert("Registration complete! You can now log in.");
      navigate("/login");
    }  catch (error) {
      console.error("Axios Error:", error);
      console.error("Error Response:", error.response);
      actions.setErrors({ api: error.response?.data?.message || "An error occurred" });
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleResendOtp = async (email, setErrors) => {
    setResendDisabled(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/resend-otp`, { email });
      alert(response.data.message);
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "An error occurred while resending OTP" });
    }

    let timeLeft = 30;
    setCountdown(timeLeft);
    const interval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setResendDisabled(false);
      }
    }, 1000);
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-gray-900 bg-opacity-60">
        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg">
          {/* Top Section */}
          <div className="sticky top-0 z-10 px-4 pt-4 pb-2 sm:px-6 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg font-bold sm:text-xl">Apply for free and Hire Talent</h2>
              <button className="text-gray-600 hover:text-red-500" onClick={() => navigate("/")}>
                <X size={24}/>
              </button>
            </div>
            <div className="flex gap-2 mt-4 mb-2">
              <button
                  className={`w-1/2 px-3 py-2 rounded-md text-sm font-semibold ${
                      selectedType === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedType("user");
                    navigate("/user");
                  }}
              >
                Register as User
              </button>
              <button
              className={`w-1/2 px-3 py-2 rounded-md text-sm font-semibold ${
                selectedType === "institution" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                setSelectedType("institution");
                navigate("/inst");
              }}
            >
              Register as Institution
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-4 pt-4 pb-6 sm:px-6">
          <div className="flex flex-wrap justify-between mb-6 gap-y-4">
            {["Contact Info", "Verification", "Password"].map((label, index) => (
              <div key={index} className="flex-1 min-w-[80px] text-center">
                <div
                  className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold text-white ${
                    step >= index ? "bg-blue-600" : "bg-gray-400"
                  }`}
                >
                  {step > index ? "✔" : index + 1}
                </div>
                <div className={`h-1 w-full mt-1 ${step > index ? "bg-blue-600" : "bg-gray-300"}`} />
                <p
                  className={`text-xs mt-1 ${
                    step === index ? "text-blue-600 font-semibold" : "text-gray-500"
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema[step]}
            onSubmit={(values, actions) =>
              step === 2
                ? handleSubmit(values, actions)
                : handleNext(values, actions.validateForm, actions.setErrors, actions.setSubmitting)
            }
          >
            {({ values, errors, isSubmitting, setErrors, setSubmitting }) => (
              <Form className="space-y-4">
                {errors.api && <p className="text-sm text-red-500">{errors.api}</p>}

                {step === 0 && (
                  <>
                    {[
                      ["name", "Institution Name"],
                      ["mobile", "Phone Number"],
                      ["email", "Email"],
                      ["city", "City"],
                      ["street", "Street"],
                      ["state", "State"],
                      ["postalcode", "Postal Code"],
                    ].map(([field, label]) => (
                      <div key={field}>
                        <label className="block text-sm font-medium">{label}</label>
                        <Field
                          name={field}
                          value={values[field] || ""}
                          className="w-full p-2 border rounded-md"
                          placeholder={`Enter ${label}`}
                        />
                        <ErrorMessage name={field} component="p" className="text-xs text-red-500" />
                      </div>
                    ))}
                    <label className="block text-sm font-medium">Country</label>
                    <Field
                      as="select"
                      name="country"
                      value={values.country}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="India">India</option>
                    </Field>
                  </>
                )}

                {step === 1 && (
                  <>
                    <p className="text-sm text-gray-600">OTP has been sent to your email</p>
                    <label className="block mt-2 text-sm font-medium">Enter OTP</label>
                    <Field
                      name="otp1"
                      value={values.otp1 || ""}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter OTP"
                    />
                    <ErrorMessage name="otp1" component="p" className="text-xs text-red-500" />

                    <button
                      type="button"
                      className="mt-2 text-sm text-blue-600"
                      onClick={() => handleResendOtp(values.email, setErrors)}
                      disabled={resendDisabled}
                    >
                      {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <label className="block text-sm font-medium">Password</label>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password || ""}
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter Password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 flex items-center right-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-xs text-red-500" />

                    <label className="block text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <Field
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={values.confirmPassword || ""}
                        className="w-full p-2 border rounded-md"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 flex items-center right-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                      </button>
                    </div>
                    <ErrorMessage name="confirmPassword" component="p" className="text-xs text-red-500" />
                  </>
                )}

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="w-full py-2 text-sm font-medium text-white bg-gray-400 rounded-md sm:w-1/2"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-md sm:w-1/2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : step < 2 ? "Next" : "Register"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstitutionRegistrationForm;
