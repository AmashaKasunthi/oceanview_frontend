import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Reservation from "./pages/Reservation";
import Manage from "./pages/ManageReservations";
import Reports from "./pages/Reports";
import Help from "./pages/Help";
import CustomerHome from "./pages/CustomerHome";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import Customerviewrooms from "./pages/Customerviewrooms";
import ManageStaff from "./pages/ManageStaff";
import StaffLogin from "./pages/stafflogin";
import StaffDashboard from "./pages/StaffDashboard";
import StaffRooms from "./pages/StaffRooms";
import StaffHelp from "./pages/StaffHelp";
import Staffmanagereservation from "./pages/Staffmanagereservation";
import StaffReservation from "./pages/StaffReservation";


function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* ===== CUSTOMER SIDE ===== */}
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/cusdashboard" element={<CustomerDashboard />} />
        <Route path="/customer/cusviewrooms" element={<Customerviewrooms />} />

       
        {/* ================= STAFF ========================= */}
       

        {/* ===== STAFF SIDE ===== */}
{!isStaffLoggedIn ? (
  <>
    {/* Login page */}
    <Route
      path="/staff-login"
      element={<StaffLogin setLogin={setIsStaffLoggedIn} />}
    />
    {/* Redirect any staff path to login if not logged in */}
    <Route path="/staff/*" element={<Navigate to="/staff-login" />} />
  </>
) : (
  <>
    {/* Staff dashboard with nested pages */}
    <Route
      path="/staff/*"
      element={<StaffDashboard logout={() => setIsStaffLoggedIn(false)} />}
    >
      {/* Default page inside dashboard */}
      <Route index element={<StaffReservation />} />

      {/* Nested routes */}
      <Route path="rooms" element={<StaffRooms />} />
      <Route path="reservation" element={<StaffReservation />} />
      <Route path="managereservation" element={<Staffmanagereservation />} />
      <Route path="help" element={<StaffHelp />} />

      {/* Catch all unknown paths */}
      <Route path="*" element={<StaffReservation />} />
    </Route>
  </>
)}
        

        {/* ===== ADMIN SIDE ===== */}
        {!isAdminLoggedIn ? (
          <>
            <Route
              path="/admin-login"
              element={<Login setLogin={setIsAdminLoggedIn} />}
            />
            <Route path="/" element={<Navigate to="/admin-login" />} />
          </>
        ) : (
          <Route
            path="/"
            element={<Dashboard logout={() => setIsAdminLoggedIn(false)} />}
          >
            {/* Nested routes under Dashboard */}
            <Route index element={<Navigate to="/rooms" />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="manage" element={<Manage />} />
            <Route path="staff-manage" element={<ManageStaff />} />
            <Route path="reports" element={<Reports />} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<Navigate to="/rooms" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
