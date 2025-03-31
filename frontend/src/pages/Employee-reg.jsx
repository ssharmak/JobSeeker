import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeRegistrationForm = () => {
    const [step, setStep] = useState(0);
    const [tempToken, setTempToken] = useState("");
    const navigate = useNavigate();
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [selectedType, setSelectedType] = useState("user");


    const API_BASE_URL = "https://app.teachersearch.in";

    const validationSchema = yup.object({
        name: yup.string().required("Full Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone_number: yup
            .string()
            .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
            .required("Mobile number is required"),
        resume: yup
            .mixed()
            .test("fileFormat", "Invalid file type. Allowed: DOC, PDF, JPG, PNG.", (file) => {
                if (!file) return true; // Allow empty file (optional)
                const allowedExtensions = ["doc", "docx", "pdf", "jpg", "jpeg", "png"];
                return allowedExtensions.includes(file?.name?.split(".").pop().toLowerCase());
            })
            .test("fileSize", "File size exceeds 5MB limit.", (file) => {
                if (!file) return true; // Allow empty file (optional)
                return file.size <= 5 * 1024 * 1024; // 5MB max size
            }),
    });

    const initialValues = {
        name: "",
        email: "",
        phone_number: "",
        resume: null,
    };

    const handleSubmit = async (values, actions) => {
            actions.setSubmitting(true);
            try {
                const response = await axios.post(
                    `${API_BASE_URL}/api/auth/set-password`,
                    { password: values.password },
                    { headers: { Authorization: `Bearer ${tempToken}` } }
                );
                console.log("Password set successfully:", response.data);
                alert("Registration complete! You can now log in.");

                navigate("/login"); // Redirect to the login page
            } catch (error) {
                console.error("Error setting password:", error.response?.data || error.message);
                actions.setErrors({ api: error.response?.data?.message || "An error occurred" });
            } finally {
                actions.setSubmitting(false);
            }
    };

    const handleNext = async (values, validateForm, setErrors, setSubmitting) => {
        setSubmitting(true);  // Ensure button shows "Processing..."
        try {
            const errors = await validateForm();
            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                setSubmitting(false);
                return;
            }

            if (step === 0) {
                console.log("Sending registration request...");

                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("phone_number", values.phone_number);
                formData.append("email", values.email);
                if (values.resume) {
                    formData.append("resume", values.resume);
                }

                const response = await axios.post(`${API_BASE_URL}/api/auth/register-user`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("API Response:", response.data);

                if (response.data.message==="OTP sent successfully") {
                    setStep(1); // Move to the next step
                    console.log("Registration successful:", response.data);
                } else {
                    setErrors({ api: response.data.message || "Registration failed" });
                }
            } else if (step === 1) {
                console.log("Verifying OTP...");

                const response = await axios.post(`${API_BASE_URL}/api/auth/verify`, {
                    otp1: values.otp1,
                });

                console.log("OTP Verified:", response.data);

                setTempToken(response.data.token);
                setStep(2); // Move to Password step
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setErrors({ api: error.response?.data?.message || "An error occurred" });
        } finally {
            setSubmitting(false); // Ensure button resets
        }
    };

    const handleResendOtp = async (email, setErrors) => {
        setResendDisabled(true);

        try {
            // Reuse the existing API for sending OTP
            const response = await axios.post(`${API_BASE_URL}/api/auth/resend-otp`, {
                email: email,
            });

            alert(response.data.message);
        } catch (error) {
            console.error("Error resending OTP:", error.response?.data || error.message);
            setErrors({ api: error.response?.data?.message || "An error occurred while resending OTP" });
        }

        // Start countdown timer for disabling the button
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <div className="flex justify-center my-4">
                    <button
                        className={`px-4 py-2 w-1/2 ${
                            selectedType === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => {
                            setSelectedType("user");
                            navigate("/user");
                        }}
                    >
                        Register as User
                    </button>
                    <button
                        className={`px-4 py-2 w-1/2 ${
                            selectedType === "institution" ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                        onClick={() => {
                            setSelectedType("institution");
                            navigate("/inst");
                        }}
                    >
                        Register as Institution
                    </button>
                </div>
                <h2 className="text-xl font-bold text-center mb-4">Apply for job for free</h2>

                <div className="flex items-center justify-between w-full mb-6">
                    {["Contact Info", "Verification", "Password"].map((label, index) => (
                        <div key={label} className="flex flex-col items-center w-full">
                            <div className="flex items-center w-full"></div>
                            {/* Step Circle */}
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white
                                    ${step > index ? "bg-blue-600" : step === index ? "bg-blue-600" : "bg-gray-400"}`}
                            >
                                {step > index ? "✔" : index + 1}
                            </div>

                            {/* Step Connector Line */}
                            {index < 2 && (
                                <div className={`flex-1 h-1 mx-2 ${step > index ? "bg-blue-600" : "bg-gray-300"}`}/>
                            )}


                            {/* Step Label */}
                            <span
                                className={`mt-2 text-sm ${step === index ? "text-blue-600 font-bold" : "text-gray-400"}`}>
                            {label}
                        </span>
                        </div>
                    ))}
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        if (step === 2) {
                            handleSubmit(values, actions);
                        } else {
                            handleNext(values, actions.validateForm, actions.setErrors, actions.setSubmitting);
                        }
                    }}
                >
                    {({values, errors, isSubmitting, validateForm, setErrors, setSubmitting, setFieldValue}) => (
                        <Form className="space-y-4">
                            {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}
                            {step === 0 && (
                                <>
                                    <label className="font-semibold">Full Name</label>
                                    <Field name="name" placeholder="Enter Full Name"
                                           className="w-full p-2 border rounded-md"/>
                                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm"/>

                                    <label className="font-semibold">Email</label>
                                    <Field name="email" type="email" placeholder="Enter Email"
                                           className="w-full p-2 border rounded-md"/>
                                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm"/>

                                    <label className="font-semibold">Phone Number</label>
                                    <Field name="phone_number" placeholder="Phone Number"
                                           className="w-full p-2 border rounded-md"/>
                                    <ErrorMessage name="mobile" component="p" className="text-red-500 text-sm"/>

                                    <label className="font-semibold">Upload Resume/CV (Optional)</label>
                                    <input
                                        type="file"
                                        accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
                                        onChange={(event) => {
                                            const file = event.target.files[0];
                                            setFieldValue("resume", file);
                                        }}
                                        className="border p-2 rounded-md w-full"
                                    />
                                    <ErrorMessage name="resume" component="p" className="text-red-500 text-sm"/>
                                </>
                            )}

                            {step === 1 && (
                                <>
                                    <p>OTP has been sent to your Email</p>
                                    <br/>
                                    <label className="font-semibold">Enter OTP</label>
                                    <Field name="otp1" placeholder="Enter OTP"
                                           className="w-full p-2 border rounded-md"/>
                                    <ErrorMessage name="otp1" component="p" className="text-red-500 text-sm"/>

                                    <button
                                        type="button"
                                        onClick={() => handleResendOtp(values.email, setErrors)}
                                        className="mt-2 text-blue-600 underline"
                                        disabled={resendDisabled}
                                    >
                                        {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                                    </button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <label className="font-semibold">Password</label>
                                    <Field name="password" type="password" placeholder="Enter Password"
                                           className="w-full p-2 border rounded-md"/>
                                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm"/>

                                    <label className="font-semibold">Confirm Password</label>
                                    <Field name="confirmPassword" type="password" placeholder="Confirm Password"
                                           className="w-full p-2 border rounded-md"/>
                                    <ErrorMessage name="confirmPassword" component="p"
                                                  className="text-red-500 text-sm"/>
                                </>
                            )}
                            <div className="flex justify-between">
                                {step > 0 && (
                                    <button type="button" onClick={() => setStep(step - 1)}
                                            className="w-1/2 bg-gray-400 text-white py-2 rounded-md mr-2">
                                        Back
                                    </button>
                                )}
                                <button type="submit" className="w-1/2 bg-blue-600 text-white py-2 rounded-md"
                                        disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : step < 2 ? "Next" : "Register"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <p className="text-center text-sm mt-4">
                    Already have an account? <span className="text-blue-600 cursor-pointer"
                                                   onClick={() => navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default EmployeeRegistrationForm;
