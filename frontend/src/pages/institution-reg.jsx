import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = {
    0: yup.object({
        name: yup.string().required("Institution Name is required"),
        country: yup.string().required("Country is required"),
        mobile: yup
            .string()
            .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
            .required("Mobile number is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
    }),
    1: yup.object({
        otp1: yup.string().matches(/^[0-9]{6}$/, "OTP must be 6 digits").required("OTP is required"),
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


const RegistrationForm = () => {
    const [step, setStep] = useState(0);
    const [tempToken, setTempToken] = useState("");

    const initialValues = {
        name: "",
        country: "India",
        mobile: "",
        email: "",
        otp1: "",
        password: "",
        confirmPassword: "",
    };

    const API_BASE_URL = "http://localhost:5000";

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

                const response = await axios.post(`${API_BASE_URL}/api/auth/register-inst`, {
                    name: values.name,
                    country: values.country,
                    mobile_number: values.mobile,
                    email: values.email,
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

                const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp-inst`, {
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


    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/auth/password-inst`,
                { password: values.password },
                { headers: { Authorization: `Bearer ${tempToken}` } }
            );
            console.log("Password set successfully:", response.data);
            alert("Registration complete! You can now log in.");
        } catch (error) {
            console.error("Error setting password:", error.response?.data || error.message);
            actions.setErrors({ api: error.response?.data?.message || "An error occurred" });
        } finally {
            actions.setSubmitting(false);
        }
    };


    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-center mb-4">Apply for free and Hire Talent</h2>

            {/* Step Navigation */}
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
                                <div className={`flex-1 h-1 mx-2 ${step > index ? "bg-blue-600" : "bg-gray-300"}`} />
                            )}


                        {/* Step Label */}
                        <span className={`mt-2 text-sm ${step === index ? "text-blue-600 font-bold" : "text-gray-400"}`}>
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema[step]}
                onSubmit={(values, actions) => {
                    if (step === 2) {
                        handleSubmit(values, actions);
                    } else {
                        handleNext(values, actions.validateForm, actions.setErrors, actions.setSubmitting);
                    }
                }}
            >
                {({ values, errors, isSubmitting, validateForm, setErrors, setSubmitting }) => (
                    <Form className="space-y-4">
                        {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}

                        {/* Fields for each step */}
                        {step === 0 && (
                            <>
                                <label className="font-semibold">Legal Name</label>
                                <Field name="name" placeholder="Enter Legal Name" className="w-full p-2 border rounded-md" />
                                <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />

                                <label className="font-semibold">Country</label>
                                <Field as="select" name="country" className="w-full p-2 border rounded-md">
                                    <option value="India">India</option>
                                </Field>

                                <label className="font-semibold">Phone Number</label>
                                <Field name="mobile" placeholder="Enter Phone Number" className="w-full p-2 border rounded-md" />
                                <ErrorMessage name="mobile" component="p" className="text-red-500 text-sm" />

                                <label className="font-semibold">Email</label>
                                <Field name="email" placeholder="Enter Email" className="w-full p-2 border rounded-md" />
                                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                            </>
                        )}

                        {step === 1 && (
                            <>
                                <p>OTP has been sent to your email</p>
                                <br/>
                                <label className="font-semibold">Enter OTP</label>
                                <Field name="otp1" type="text" inputMode="numeric" placeholder="Enter OTP" className="w-full p-2 border rounded-md" />
                                <ErrorMessage name="otp1" component="p" className="text-red-500 text-sm" />
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <label className="font-semibold">Enter Password</label>
                                <Field name="password" type="password" placeholder="Enter Password" className="w-full p-2 border rounded-md" />
                                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />

                                <label className="font-semibold">Confirm Password</label>
                                <Field name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full p-2 border rounded-md" />
                                <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm" />
                            </>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                            {step > 0 && (
                                <button type="button" onClick={() => setStep(step - 1)} className="w-1/2 bg-gray-400 text-white py-2 rounded-md mr-2">
                                    Back
                                </button>
                            )}
                            <button type="submit" className="w-1/2 bg-blue-600 text-white py-2 rounded-md" disabled={isSubmitting}>
                                {isSubmitting ? "Processing..." : step < 2 ? "Next" : "Register"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegistrationForm;
