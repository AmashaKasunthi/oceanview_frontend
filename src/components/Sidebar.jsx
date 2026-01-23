import React from "react";
import { Hotel, Calendar, ClipboardList, FileText, HelpCircle, LogOut } from "lucide-react";

export default function Sidebar({ setPage, logout }) {
  return (
    <div className="w-64 bg-linear-to-b from-blue-600 to-blue-800 text-white min-h-screen flex flex-col shadow-xl">
      
     {/* Logo Section */}
<div className="p-6 border-b border-blue-500/30 flex flex-col items-center">
  
  {/* Logo */}
  <div className="w-25 h-25 bg-blue-600 rounded-lg flex items-center justify-center  p-1 mb-3">
    <img
      src="/oceanview.logo.svg"   // public folder path
      alt="OceanView Resort Logo"
      className="object-contain w-full h-full"
    />
  </div>

  {/* Logo Text (BELOW logo) */}
  <div className="text-center">
    <h2 className="text-xl font-bold text-white">Ocean View</h2>
    <p className="text-xs text-blue-200">Hotel Management</p>
  </div>

</div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            className="w-full flex items-center gap-3 text-left hover:bg-blue-700/50 p-3 rounded-lg transition-all duration-200 group"
            onClick={() => setPage("rooms")}
          >
            <Hotel className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Rooms</span>
          </button>

          <button
            className="w-full flex items-center gap-3 text-left hover:bg-blue-700/50 p-3 rounded-lg transition-all duration-200 group"
            onClick={() => setPage("reservation")}
          >
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Reservation</span>
          </button>

          <button
            className="w-full flex items-center gap-3 text-left hover:bg-blue-700/50 p-3 rounded-lg transition-all duration-200 group"
            onClick={() => setPage("manage")}
          >
            <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Manage Reservations</span>
          </button>

          <button
            className="w-full flex items-center gap-3 text-left hover:bg-blue-700/50 p-3 rounded-lg transition-all duration-200 group"
            onClick={() => setPage("reports")}
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Reports</span>
          </button>

          <button
            className="w-full flex items-center gap-3 text-left hover:bg-blue-700/50 p-3 rounded-lg transition-all duration-200 group"
            onClick={() => setPage("help")}
          >
            <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Help</span>
          </button>

          
        </div>
      </nav>
    </div>
  );
}
