import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";

export default function StaffDashboard({ logout }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const staffUser = localStorage.getItem("staffUsername");
    if (!staffUser) {
      // If no login info, redirect to login
      navigate("/staff-login", { replace: true });
    } else {
      setUsername(staffUser);
    }
  }, []);

   const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    localStorage.removeItem("staffUsername");
    logout();  
    navigate("/staff-login", { replace: true });
  }
};
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StaffSidebar logout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center bg-amber-100 p-4 rounded-xl shadow">
          <h1 className="text-2xl font-semibold">
            Welcome, <span className="text-blue-600">{username}</span>
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            Logout
          </button>
        </div>

        {/* Nested Pages Render Here */}
        <Outlet />
      </div>
    </div>
  );
}
