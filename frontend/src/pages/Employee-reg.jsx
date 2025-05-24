import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff } from "lucide-react";

const EmployeeRegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [tempToken, setTempToken] = useState("");
  const navigate = useNavigate();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [selectedType, setSelectedType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const API_BASE_URL = "https://app.teachersearch.in";

  const validationSchemaStep0 = yup.object({
    name: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone_number: yup.string().matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number").required("Mobile number is required"),
    resume: yup.mixed()
      .test("fileFormat", "Invalid file type. Allowed: DOC, PDF, JPG, PNG.", (file) => {
        if (!file) return true;
        const allowedExtensions = ["doc", "docx", "pdf", "jpg", "jpeg", "png"];
        return allowedExtensions.includes(file?.name?.split(".").pop().toLowerCase());
      })
      .test("fileSize", "File size exceeds 5MB limit.", (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      }),
  });

  const validationSchemaStep2 = yup.object({
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm your password"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    resume: "",
    otp1: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/set-password`,
        { password: values.password },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        }
      );

      alert("Registration complete! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during password submission:", error);

      actions.setErrors({
        api: error.response?.data?.message || "An error occurred",
      });
    } finally {
      actions.setSubmitting(false);
    }
  };


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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone_number", values.phone_number);
      formData.append("email", values.email);
      if (values.resume) {
        formData.append("resume", values.resume);
      }

      const response = await axios.post(`${API_BASE_URL}/api/auth/register-user`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.message === "OTP sent successfully") {
        setStep(1);
      } else {
        setErrors({ api: response.data.message || "Registration failed" });
      }
    } else if (step === 1) {
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify`, { otp1: values.otp1 });
      setTempToken(response.data.token);
      setStep(2);
    }
  } catch (error) {
    console.error("Error during step progression:", error);
    setErrors({ api: error.response?.data?.message || "An error occurred" });
  } finally {
    setSubmitting(false);
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

  const getValidationSchema = () => {
    if (step === 0) return validationSchemaStep0;
    if (step === 2) return validationSchemaStep2;
    return yup.object({});
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto bg-gray-900 bg-opacity-50 sm:p-6">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg sm:max-w-xl lg:max-w-2xl sm:p-8">
        <button className="absolute top-3 right-3" onClick={() => navigate("/")}>
          <X size={24} />
        </button>

        {/* Register toggle */}
        <div className="flex flex-col justify-center gap-2 mb-6 sm:flex-row">
          <button
            className={`w-full sm:w-1/2 px-4 py-2 ${selectedType === "user" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => {
              setSelectedType("user");
              navigate("/user");
            }}
          >
            Register as User
          </button>
          <button
            className={`w-full sm:w-1/2 px-4 py-2 ${selectedType === "institution" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => {
              setSelectedType("institution");
              navigate("/inst");
            }}
          >
            Register as Institution
          </button>
        </div>

        {/* Stepper */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {["Contact Info", "Verification", "Password"].map((label, index) => (
            <div key={index} className="flex flex-col items-center flex-1 min-w-[80px]">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${
                step > index ? "bg-blue-600" : step === index ? "bg-blue-600" : "bg-gray-400"
              }`}>
                {step > index ? "✔" : index + 1}
              </div>
              {index < 2 && <div className="flex-1 w-full h-1 my-1 bg-gray-300" />}
              <span className={`text-sm ${step === index ? "text-blue-600 font-bold" : "text-gray-500"}`}>{label}</span>
            </div>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema()}
          onSubmit={(values, actions) => {
            if (step === 2) {
              handleSubmit(values, actions);
            } else {
              handleNext(values, actions.validateForm, actions.setErrors, actions.setSubmitting);
            }
          }}
        >
          {({ values, setFieldValue, errors, isSubmitting, setErrors, setSubmitting }) => (
            <Form className="space-y-4">
              {errors.api && <p className="text-sm text-red-500">{errors.api}</p>}

              {step === 0 && (
                <>
                  <label className="font-semibold">Full Name</label>
                  <Field name="name" className="w-full px-3 py-2 border rounded-md" placeholder="Enter Full Name" />
                  <ErrorMessage name="name" component="p" className="text-sm text-red-500" />

                  <label className="font-semibold">Email</label>
                  <Field name="email" className="w-full px-3 py-2 border rounded-md" placeholder="Enter Email" />
                  <ErrorMessage name="email" component="p" className="text-sm text-red-500" />

                  <label className="font-semibold">Phone Number</label>
                  <Field name="phone_number" className="w-full px-3 py-2 border rounded-md" placeholder="Phone Number" />
                  <ErrorMessage name="phone_number" component="p" className="text-sm text-red-500" />

                  <label className="font-semibold">Upload Resume (optional)</label>
                  <input
                    type="file"
                    accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
                    onChange={(event) => setFieldValue("resume", event.currentTarget.files[0])}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <ErrorMessage name="resume" component="p" className="text-sm text-red-500" />
                </>
              )}

              {step === 1 && (
                <>
                  <label className="font-semibold">Enter OTP</label>
                  <Field name="otp1" className="w-full px-3 py-2 border rounded-md" placeholder="Enter OTP" />
                  <ErrorMessage name="otp1" component="p" className="text-sm text-red-500" />

                  <button
                    type="button"
                    disabled={resendDisabled}
                    className={`text-blue-600 text-sm mt-2 ${resendDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => handleResendOtp(values.email, setErrors)}
                  >
                    {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <label className="font-semibold">Password</label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter Password"
                    />
                    <button type="button" className="absolute inset-y-0 flex items-center right-3" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="p" className="text-sm text-red-500" />

                  <label className="font-semibold">Confirm Password</label>
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Confirm Password"
                    />
                    <button type="button" className="absolute inset-y-0 flex items-center right-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="p" className="text-sm text-red-500" />
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {step === 2 ? "Submit" : "Next"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeRegistrationForm;
