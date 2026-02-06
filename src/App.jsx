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


function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* ===== CUSTOMER SIDE ===== */}
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/cusdashboard" element={<CustomerDashboard />} />

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
            <Route index element={<Navigate to="/rooms" />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="manage" element={<Manage />} />
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
