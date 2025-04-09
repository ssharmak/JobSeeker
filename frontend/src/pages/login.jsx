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
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        const loginUrl = userType === "user"
            ? `${API_BASE_URL}/api/auth/login-user`
            : `${API_BASE_URL}/api/auth/login-inst`;

        try {
            const response = await axios.post(loginUrl, values, { withCredentials: true });
            console.log("Login successful:", response.data);
            alert("Login Successful!");

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
            }

            window.location.href = userType === "user" ? "/user/dashboard" : "/institution/dashboard";
        } catch (error) {
            console.error("Login error:", error);
            setErrors({ general: error.response?.data?.message || "Login failed. Please check your credentials." });
        }

        setSubmitting(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-y-auto p-4">
            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg relative">
                <button className="absolute top-3 right-3" onClick={() => navigate("/")}> <X size={24} /> </button>
                <h2 className="text-2xl font-semibold text-center mb-6">{userType === "user" ? "User Login" : "Institution Login"}</h2>
                <div className="flex justify-center mb-4">
                    <button className={`p-2 w-1/2 ${userType === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setUserType("user")}>
                        User Login
                    </button>
                    <button className={`p-2 w-1/2 ${userType === "institution" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setUserType("institution")}>
                        Institution Login
                    </button>
                </div>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {errors.general && <p className="text-red-500 text-center mb-4">{errors.general}</p>}
                            <div className="mb-4">
                                <label className="block text-gray-700">Email ID</label>
                                <Field type="email" name="email" className="w-full p-2 border rounded mt-1"
                                       placeholder={userType === "user" ? "Enter your Email" : "Enter your Registered Email"}/>
                                <ErrorMessage name="email" component="p" className="text-red-500 text-sm"/>
                            </div>

                            <label className="block text-gray-700">Password</label>
                            <div className="mb-4 relative">
                                <Field type={showPassword ? "text" : "password"} name="password"
                                       className="w-full p-2 border rounded mt-1" placeholder="Enter Password"/>
                                <button type="button" className="absolute inset-y-0 right-2 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye size={20}/> : <EyeOff size={20}/>}
                                </button>
                                <ErrorMessage name="password" component="p" className="text-red-500 text-sm"/>
                            </div>
                            <button type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="text-center text-sm mt-4">
                    Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate(userType === "user" ? "/user" : "/inst")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
