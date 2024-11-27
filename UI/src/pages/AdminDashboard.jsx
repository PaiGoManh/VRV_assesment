import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to toggle modal
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchRoles = async () => {
    const mockRoles = [
      { id: 1, name: "Admin", permissions: ["Manage Users", "Manage Roles"] },
      { id: 2, name: "User", permissions: ["View Content"] },
    ];
    setRoles(mockRoles);
  };

  const fetchPermissions = async () => {
    const mockPermissions = ["Manage Users", "Manage Roles", "View Content"];
    setPermissions(mockPermissions);
  };

  const addUserApi = async (userData) => {
    try {
      const res = await fetch("/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        navigate("/admindashboard");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    await addUserApi(newUser);
    setShowModal(false);
    setNewUser({ name: "", email: "", password: "", role: "" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 md:p-8 space-y-6">
        <div className="text-lg font-bold">Admin Dashboard</div>
        <nav>
          <ul>
            <li>
              <Link to="/admindashboard" className="block p-4 rounded-lg hover:bg-blue-600">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/users" className="block p-4 rounded-lg hover:bg-blue-600">
                Users
              </Link>
            </li>
            <li>
              <Link to="/roles" className="block p-4 rounded-lg hover:bg-blue-600">
                Roles
              </Link>
            </li>
            <li>
              <Link to="/permissions" className="block p-4 rounded-lg hover:bg-blue-600">
                Permissions
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, Admin!</h1>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Users</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add User
            </button>
          </div>

          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-4 text-left text-gray-700">Name</th>
                <th className="p-4 text-left text-gray-700">Email</th>
                <th className="p-4 text-left text-gray-700">Role</th>
                <th className="p-4 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.userType}</td>
                  <td className="p-4">
                    <Link
                      to={`/userdetails/${user.username}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                    >
                      Manage User
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-6">Add User</h2>
              <form onSubmit={handleAddUser}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
