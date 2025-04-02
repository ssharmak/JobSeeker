import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("user"); // "user" or "institution"
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API_BASE_URL = "https://app.teachersearch.in";

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset errors before new request

        const loginUrl = userType === "user"
            ? `${API_BASE_URL}/api/auth/login-user`
            : `${API_BASE_URL}/api/auth/login-inst`;

        try {
            const response = await axios.post(loginUrl, { email, password }, { withCredentials: true });

            console.log("Login successful:", response.data);
            alert("Login Successful!");

            // Store token if provided (optional)
            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
            }

            // Redirect based on user type
            window.location.href = userType === "user" ? "/user/dashboard" :
                userType === "admin" ? "/admin/dashboard" :
                    "/institution/dashboard";

        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <button className="absolute top-3 right-3" onClick={() => navigate("/")}>
                    <X size={24}/>
                </button>
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {userType === "user" ? "User Login" : "Institution Login"}
                </h2>

                <div className="flex justify-center mb-4">
                    <button
                        className={`p-2 w-1/2 ${userType === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                        onClick={() => setUserType("user")}
                    >
                        User Login
                    </button>
                    <button
                        className={`p-2 w-1/2 ${userType === "institution" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                        onClick={() => setUserType("institution")}
                    >
                        Institution Login
                    </button>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email ID</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded mt-1"
                            placeholder={userType === "user" ? "Enter your Email" : "Enter your Registered Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account? <span className="text-blue-600 cursor-pointer"
                                                   onClick={() => navigate(userType === "user" ? "/user" : "/inst")}>Register</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
