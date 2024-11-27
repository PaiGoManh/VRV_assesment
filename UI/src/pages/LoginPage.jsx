import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = {
      userName,
      password,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    if (res.ok) {
      const data = await res.json();
      setUserType(data.userType);
      toast.success(`Logged in as: ${data.userType}`);

      if (data.userType === "admin") {
        return navigate("/admindashboard");
      } else {
        return navigate("/userdashboard");
      }
    } else {
      toast.error("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          User Login
        </h2>
        <form onSubmit={loginSubmit}>
          <div className="mb-6">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-semibold mb-2"
            >
              UserName
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </div>
          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export { LoginPage as default };
