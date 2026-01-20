import React from "react";

export default function Sidebar({ setPage, logout }) {
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
      <button
        className="mb-3 text-left hover:bg-blue-800 p-2 rounded"
        onClick={() => setPage("rooms")}
      >
        Rooms
      </button>
      <button
        className="mb-3 text-left hover:bg-blue-800 p-2 rounded"
        onClick={() => setPage("reservation")}
      >
        Reservation
      </button>
      <button
        className="mb-3 text-left hover:bg-blue-800 p-2 rounded"
        onClick={() => setPage("manage")}
      >
        Manage Reservations
      </button>
      <button
        className="mb-3 text-left hover:bg-blue-800 p-2 rounded"
        onClick={() => setPage("reports")}
      >
        Reports
      </button>
      <button
        className="mb-3 text-left hover:bg-blue-800 p-2 rounded"
        onClick={() => setPage("help")}
      >
        Help
      </button>
      <button
        className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
