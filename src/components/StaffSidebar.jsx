import React from "react";
import { NavLink } from "react-router-dom";
import { Hotel, Calendar, ClipboardList, HelpCircle } from "lucide-react";

export default function StaffSidebar({ logout }) {
  const linkClass = ({ isActive }) =>
    `w-full flex items-center gap-5 p-12 rounded-lg transition-all duration-200 group
     ${isActive ? "bg-purple-700" : "hover:bg-purple-500/50"}`;

  return (
    <div className="w-64 bg-linear-to-b from-purple-600 to-purple-800 text-white min-h-screen flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-purple-500/30 flex flex-col items-center">
        <div className="w-24 h-24 bg-purple-600 rounded-lg flex items-center justify-center p-2 mb-3">
          <img
            src="/oceanview.logo.svg"
            alt="OceanView Logo"
            className="object-contain w-full h-full"
          />
        </div>
        <h2 className="text-xl font-bold">Ocean View</h2>
        <p className="text-xs text-black">Hotel Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/staff/rooms" className={linkClass}>
          <Hotel className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Rooms
        </NavLink>
        <NavLink to="/staff/reservation" className={linkClass}>
          <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Reservation
        </NavLink>
        <NavLink to="/staff/managereservation" className={linkClass}>
          <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Manage Reservations
        </NavLink>
        <NavLink to="/staff/help" className={linkClass}>
          <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Help
        </NavLink>
      </nav>

      
    </div>
  );
}
