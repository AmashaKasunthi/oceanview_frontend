/*import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Rooms from "./Rooms";
import Reservation from "./Reservation";
import Manage from "./ManageReservations";
import Reports from "./Reports";
import Help from "./Help";

export default function Dashboard({ logout }) {
  const [page, setPage] = useState("rooms");

  return (
    <div className="flex min-h-screen">
      <Sidebar setPage={setPage} logout={logout} />
      <div className="flex-1 p-10">
        {page === "rooms" && <Rooms />}
        {page === "reservation" && <Reservation />}
        {page === "manage" && <Manage />}
        {page === "reports" && <Reports />}
        {page === "help" && <Help />}
      </div>
    </div>
  );
}*/
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Rooms from "./Rooms";
import Reservation from "./Reservation";
import Manage from "./ManageReservations";
import Reports from "./Reports";
import Help from "./Help";

export default function Dashboard({ logout }) {
  const [page, setPage] = useState("rooms");
  const [username, setUsername] = useState("");

  // Get admin username on dashboard load
  useEffect(() => {
    const adminUser = localStorage.getItem("adminUsername");
    if (adminUser) {
      setUsername(adminUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUsername");
    logout();
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

        {/* Pages */}
        {page === "rooms" && <Rooms />}
        {page === "reservation" && <Reservation />}
        {page === "manage" && <Manage />}
        {page === "reports" && <Reports />}
        {page === "help" && <Help />}
      </div>
    </div>
  );
}
