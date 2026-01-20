import { useState } from "react";
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
}
