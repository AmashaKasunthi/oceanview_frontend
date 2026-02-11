import { useState } from "react";


export default function Help() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-4xl font-bold text-blue-700 mb-3">
            ❓ Help & Support Center
          </h2>
          <p className="text-gray-600 text-lg">
            Welcome to Ocean View Resort Reservation System. Click on any section below to learn more.
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center mr-3">
              🚀
            </span>
            Quick Start Guide
          </h3>

          

          <div className="space-y-3">

            
            {/* Login & Authentication */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('login')}
                className="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              >
                <span className="text-lg font-semibold text-indigo-700 flex items-center">
                  <span className="mr-3">🔐</span> Login & Authentication
                </span>
                <span className="text-2xl text-indigo-600">
                  {openSection === 'login' ? '−' : '+'}
                </span>
              </button>
              {openSection === 'login' && (
                <div className="p-5 bg-white border-t">
                  <p className="text-gray-600 mb-3">
                    Secure access to the reservation system for authorized staff.
                  </p>
                  <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-indigo-800 mb-2">🔑 Login Process:</p>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>Enter your registered username in the Username field</li>
                      <li>Enter your secure password (passwords are encrypted)</li>
                      <li>Click "Login" to access the system</li>
                      <li>Invalid credentials will show an error message</li>
                      <li>Your session remains active until you logout</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-yellow-800 mb-2">⚠️ Default Credentials:</p>
                    <div className="bg-white rounded p-3 font-mono text-sm">
                      <p className="text-gray-700"><span className="font-bold">Username:</span> staff</p>
                      <p className="text-gray-700"><span className="font-bold">Password:</span> staff123</p>
                    </div>
                    
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="font-semibold text-indigo-800 mb-2">💡 Security Tips:</p>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>Never share your login credentials with anyone</li>
                      <li>Use strong passwords with letters, numbers, and symbols</li>
                      <li>Always logout when leaving your workstation</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Dashboard */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('dashboard')}
                className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <span className="text-lg font-semibold text-blue-700 flex items-center">
                  <span className="mr-3">📊</span> Dashboard
                </span>
                <span className="text-2xl text-blue-600">
                  {openSection === 'dashboard' ? '−' : '+'}
                </span>
              </button>
              {openSection === 'dashboard' && (
                <div className="p-5 bg-white border-t">
                  <p className="text-gray-600 mb-3">
                    Your central hub for all reservation activities.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-semibold text-blue-800 mb-2">💡 Tips:</p>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>View total reservations, revenue, and available rooms at a glance</li>
                      <li>Check recent bookings and upcoming check-ins</li>
                      <li>Monitor room occupancy rates in real-time</li>
                      <li>Access quick actions for common tasks</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Add Reservation */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('addReservation')}
                className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 transition-colors"
              >
                <span className="text-lg font-semibold text-green-700 flex items-center">
                  <span className="mr-3">➕</span> Add Reservation
                </span>
                <span className="text-2xl text-green-600">
                  {openSection === 'addReservation' ? '−' : '+'}
                </span>
              </button>
              {openSection === 'addReservation' && (
                <div className="p-5 bg-white border-t">
                  <p className="text-gray-600 mb-3">
                    Create new room reservations for guests.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="font-semibold text-green-800 mb-2">💡 Tips:</p>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>Fill in guest details (name, contact, address) carefully</li>
                      <li>Select available room type from the dropdown</li>
                      <li>Choose check-in and check-out dates (system calculates nights automatically)</li>
                      <li>Total amount is calculated based on room price × number of nights</li>
                      <li>Double-check all information before submitting</li>
                      <li>Confirmation and bill will be generated automatically</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Manage Reservations */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('manageReservations')}
                className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 transition-colors"
              >
                <span className="text-lg font-semibold text-purple-700 flex items-center">
                  <span className="mr-3">📋</span> Manage Reservations
                </span>
                <span className="text-2xl text-purple-600">
                  {openSection === 'manageReservations' ? '−' : '+'}
                </span>
              </button>
              {openSection === 'manageReservations' && (
                <div className="p-5 bg-white border-t">
                  <p className="text-gray-600 mb-3">
                    View, edit, or cancel existing reservations.
                  </p>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="font-semibold text-purple-800 mb-2">💡 Tips:</p>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>Use the search bar to quickly find reservations by guest name or room type</li>
                      <li>Click "Edit" to modify reservation details (dates, room type, guest info)</li>
                      <li>After editing, an updated bill will be generated automatically</li>
                      <li>Click "Cancel" to remove a reservation (confirmation required)</li>
                      <li>View complete reservation history in one place</li>
                      <li>All changes are saved to the database instantly</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
              
            {/* Generate Bills */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('bills')}
                className="w-full flex items-center justify-between p-4 bg-pink-50 hover:bg-pink-100 transition-colors"
              >
                <span className="text-lg font-semibold text-pink-700 flex items-center">
                  <span className="mr-3">🧾</span> Generate PDF Bills
                </span>
                <span className="text-2xl text-pink-600">
                  {openSection === 'bills' ? '−' : '+'}
                </span>
              </button>
              {openSection === 'bills' && (
                <div className="p-5 bg-white border-t">
                  <p className="text-gray-600 mb-3">
                    Create and print professional bills for guests.
                  </p>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <p className="font-semibold text-pink-800 mb-2">💡 Tips:</p>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li>Bills are automatically generated when creating/updating reservations</li>
                      <li>Include hotel logo, guest details, and itemized charges</li>
                      <li>Click "Print Bill" to print or save as PDF</li>
                      <li>Bills show reservation ID for easy tracking</li>
                      <li>All charges are clearly broken down (room rate * nights)</li>
                      <li>Professional format suitable for accounting</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Settings & Configuration */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('settings')}
                className="w-full flex items-center justify-between p-4 bg-yellow-50 hover:bg-yellow-100 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="mr-3">⚙️</span> Settings & Configuration
                </span>
                <span className="text-2xl text-gray-600">
                  {openSection === 'settings' ? '−' : '+'}
                </span>
              </button>
              {openSection === 'settings' && (
                <div className="p-5 bg-white border-t">
                  <p className="text-gray-600 mb-3">
                    Customize system settings and preferences.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-gray-800 mb-2">🔧 System Settings:</p>
                    <ul className="list-disc ml-5 text-gray-700 space-y-1">
                      <li><strong>Hotel Information:</strong> Name, logo, address, contact</li>
                      <li><strong>Currency Settings:</strong> Default currency and format</li>
                      <li><strong>Date Format:</strong> DD/MM/YYYY </li>
                      <li><strong>Backup Settings:</strong> Automatic database backup schedule</li>
                    </ul>
                  </div>
                  
                </div>
              )}
            </div>
         

            
          </div>
        </div>  
          </div>
        </div>
  );
}