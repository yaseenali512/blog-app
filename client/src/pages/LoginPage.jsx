import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        // Assuming '/api/login' is your backend route
        username,
        password,
      });

      console.log("Login Response:", response);

      if (response.status === 200 || response.data.success) {
        localStorage.setItem("token", response.data.token);

        navigate("/landing");
      } else {
        console.log("Error while logging in");
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-lg shadow-md max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md w-full"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
