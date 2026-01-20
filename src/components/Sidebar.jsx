export default function Sidebar({setPage,logout}){
 return(
  <div className="w-64 h-screen bg-gray-900 text-white p-6">
    <h2 className="text-xl mb-6">Ocean View Admin</h2>
    <button onClick={()=>setPage("rooms")} className="block mb-3">Rooms</button>
    <button onClick={()=>setPage("reservation")} className="block mb-3">New Reservation</button>
    <button onClick={()=>setPage("manage")} className="block mb-3">Manage Reservations</button>
    <button onClick={()=>setPage("reports")} className="block mb-3">Reports</button>
    <button onClick={()=>setPage("help")} className="block mb-3">Help</button>
    <button onClick={logout} className="mt-10 bg-red-600 px-3 py-1">Exit</button>
  </div>
 )
}
