import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard({ logout }) {
  const [page, setPage] = useState("rooms");
  const [username, setUsername] = useState("");

  const navigate = useNavigate(); 

  // Get admin username on dashboard load
  useEffect(() => {
    const adminUser = localStorage.getItem("adminUsername");
    if (adminUser) {
      setUsername(adminUser);
    }
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("adminUsername");
+ logout();  //updates isAdminLoggedIn = false
  navigate("/admin-login", { replace: true });
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setPage={setPage} logout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow">
          <h1 className="text-2xl font-semibold">
            Welcome,{" "}
            <span className="text-blue-600">
              {username || "Admin"}
            </span>
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
          >
            Logout
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
