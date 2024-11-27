import React from "react";

const UserDashboard = () => {
  const userData = {
    username: "USER!",
    role: "R&D",
    permissions: ["Read", "Write", "Delete"],
    status: "Active", 
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          User Dashboard
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700">Username:</h2>
            <p className="text-xl text-gray-900 mt-2">{userData.username}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700">Role:</h2>
            <p className="text-xl text-gray-900 mt-2">{userData.role}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow-xl md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700">Permissions:</h2>
            <ul className="list-disc list-inside text-gray-900 mt-2 space-y-2">
              {userData.permissions.map((permission, index) => (
                <li key={index} className="text-lg">{permission}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700">Status:</h2>
            <p
              className={`text-xl mt-2 font-medium ${
                userData.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {userData.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
