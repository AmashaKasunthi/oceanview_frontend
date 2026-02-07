import React from "react";
import { NavLink } from "react-router-dom";
import {
  Hotel,
  Calendar,
  ClipboardList,
  FileText,
  HelpCircle
} from "lucide-react";

export default function Sidebar() {

  const linkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group
     ${isActive ? "bg-blue-700" : "hover:bg-blue-700/50"}`;

  return (
    <div className="w-64 bg-linear-to-b from-blue-600 to-blue-800 text-white min-h-screen flex flex-col shadow-xl">

      {/* Logo Section */}
      <div className="p-6 border-b border-blue-500/30 flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-600 rounded-lg flex items-center justify-center p-2 mb-3">
          <img
            src="/oceanview.logo.svg"
            alt="OceanView Resort Logo"
            className="object-contain w-full h-full"
          />
        </div>

        <h2 className="text-xl font-bold">Ocean View</h2>
        <p className="text-xs text-blue-200">Hotel Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink to="/rooms" className={linkClass}>
          <Hotel className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Rooms
        </NavLink>

        <NavLink to="/reservation" className={linkClass}>
          <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Reservation
        </NavLink>

        <NavLink to="/manage" className={linkClass}>
          <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Manage Reservations
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Reports
        </NavLink>

        <NavLink to="/help" className={linkClass}>
          <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Help
        </NavLink>

      </nav>
    </div>
  );
}
