/*import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageReservations() {
  const [data,setData]=useState([]);
  const [edit,setEdit]=useState(null);

  useEffect(()=>{
    load();
  },[]);

  const load=()=>{
    axios.get("http://localhost:8080/api/reservations")
    .then(res=>setData(res.data));
  }

  const remove=id=>{
    axios.delete(`http://localhost:8080/api/reservations/${id}`)
    .then(()=>load());
  }

  const save=()=>{
    axios.put(`http://localhost:8080/api/reservations/${edit.reservationId}`,edit)
    .then(()=>{
      setEdit(null);
      load();
    })
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Manage Reservations</h2>

      <table className="w-full border">
        <tr className="bg-gray-200">
          <th>ID</th><th>Guest</th><th>Room</th><th>Days</th><th>Bill</th><th>Action</th>
        </tr>
        {data.map(r=>(
          <tr key={r.reservationId}>
            <td>{r.reservationId}</td>
            <td>{r.guestName}</td>
            <td>{r.roomType}</td>
            <td>{r.days}</td>
            <td>{r.totalAmount}</td>
            <td>
              <button onClick={()=>setEdit(r)} className="bg-blue-500 text-white px-2 mr-2">Edit</button>
              <button onClick={()=>remove(r.reservationId)} className="bg-red-500 text-white px-2">Cancel</button>
            </td>
          </tr>
        ))}
      </table>

      {edit && (
        <div className="mt-6 bg-gray-100 p-5 rounded">
          <input className="border p-2 mr-2" value={edit.guestName}
            onChange={e=>setEdit({...edit,guestName:e.target.value})}/>
          <input className="border p-2 mr-2" value={edit.roomType}
            onChange={e=>setEdit({...edit,roomType:e.target.value})}/>
          <input className="border p-2 mr-2" value={edit.days}
            onChange={e=>setEdit({...edit,days:e.target.value})}/>
          <button onClick={save} className="bg-green-600 text-white px-3">Save</button>
        </div>
      )}
    </div>
  );
}*/
/*import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageReservation() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showBill, setShowBill] = useState(false);

  useEffect(() => {
    loadReservations();
    loadRooms();
  }, []);

  const loadReservations = () => {
    axios.get("http://localhost:8080/api/reservations")
      .then(res => setReservations(res.data));
  };

  const loadRooms = () => {
    axios.get("http://localhost:8080/api/rooms")
      .then(res => setRooms(res.data));
  };

  const cancelReservation = (id) => {
    if (!window.confirm("Cancel this reservation?")) return;

    axios.delete(`http://localhost:8080/api/reservations/${id}`)
      .then(() => loadReservations());
  };

  const updateReservation = () => {
    axios.put(
      `http://localhost:8080/api/reservations/${edit.id}`,
      edit
    ).then(res => {
      setEdit(res.data);
      setShowBill(true);
      loadReservations();
    }).catch(err => {
      alert(err.response?.data || "Update failed");
    });
  };

  const printBill = () => window.print();

  // ================= BILL =================
  if (showBill && edit) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 shadow mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          OCEAN VIEW RESORT
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Updated Reservation Bill
        </p>

        <p><b>ID:</b> {edit.id}</p>
        <p><b>Guest:</b> {edit.guestName}</p>
        <p><b>Contact:</b> {edit.contact}</p>
        <p><b>Address:</b> {edit.address}</p>

        <hr className="my-4" />

        <p><b>Room:</b> {edit.roomType}</p>
        <p><b>Check-in:</b> {edit.checkIn}</p>
        <p><b>Check-out:</b> {edit.checkOut}</p>
        <p><b>Nights:</b> {edit.nights}</p>

        <h2 className="text-xl font-bold mt-4">
          TOTAL: LKR {edit.totalAmount}
        </h2>

        <div className="mt-6 flex gap-4 print:hidden">
          <button
            onClick={printBill}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Print Bill
          </button>

          <button
            onClick={() => {
              setShowBill(false);
              setEdit(null);
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // ================= TABLE =================
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Manage Reservations
      </h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Guest</th>
            <th>Room</th>
            <th>Nights</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map(r => (
            <tr key={r.id} className="border-t text-center">
              <td>{r.id}</td>
              <td>{r.guestName}</td>
              <td>{r.roomType}</td>
              <td>{r.nights}</td>
              <td>LKR {r.totalAmount}</td>
              <td>
                <button
                  onClick={() => setEdit(r)}
                  className="bg-blue-500 text-white px-2 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => cancelReservation(r.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ========== EDIT FORM ========== */
      /*{edit && (
        <div className="mt-6 bg-gray-100 p-5 rounded">
          <h3 className="font-bold mb-3">Edit Reservation</h3>

          <input
            className="border p-2 mr-2"
            value={edit.guestName}
            onChange={e => setEdit({ ...edit, guestName: e.target.value })}
          />

          <select
            className="border p-2 mr-2"
            value={edit.room.id}
            onChange={e =>
              setEdit({ ...edit, room: { id: Number(e.target.value) } })
            }
          >
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.roomType}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-2 mr-2"
            value={edit.checkIn}
            onChange={e => setEdit({ ...edit, checkIn: e.target.value })}
          />

          <input
            type="date"
            className="border p-2 mr-2"
            value={edit.checkOut}
            onChange={e => setEdit({ ...edit, checkOut: e.target.value })}
          />

          <button
            onClick={updateReservation}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update & Print Bill
          </button>
        </div>
      )}
    </div>
  );
}*/

import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageReservation() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadReservations();
    loadRooms();
  }, []);

  const loadReservations = () => {
    axios.get("http://localhost:8080/api/reservations")
      .then(res => setReservations(res.data))
      .catch(err => console.error(err));
  };

  const loadRooms = () => {
    axios.get("http://localhost:8080/api/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  };

  const cancelReservation = (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    axios.delete(`http://localhost:8080/api/reservations/${id}`)
      .then(() => {
        loadReservations();
        alert("Reservation cancelled successfully");
      })
      .catch(err => alert("Failed to cancel reservation"));
  };

  const updateReservation = () => {
    axios.put(
      `http://localhost:8080/api/reservations/${edit.id}`,
      edit
    ).then(res => {
      setEdit(res.data);
      setShowBill(true);
      loadReservations();
    }).catch(err => {
      alert(err.response?.data || "Update failed");
    });
  };

  const printBill = () => window.print();

  const filteredReservations = reservations.filter(r =>
    r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.roomType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ================= BILL VIEW =================
  if (showBill && edit) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
          {/* Header */}
          <div className="text-center border-b-4 border-blue-600 pb-6 mb-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-2">
              🏨 OCEAN VIEW RESORT
            </h1>
            <p className="text-gray-600 text-lg">Premium Beach Resort & Spa</p>
            <p className="text-sm text-gray-500 mt-2">
              123 Beach Road, Colombo, Sri Lanka | Tel: +94 11 234 5678
            </p>
          </div>

          {/* Bill Header */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              📄 Updated Reservation Bill
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Reservation ID</p>
                <p className="text-lg font-semibold text-gray-800">#{edit.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Issue Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">👤</span> Guest Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-5 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Guest Name:</span>
                <span className="font-semibold">{edit.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="font-semibold">{edit.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-semibold">{edit.address}</span>
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="mr-2">🛏️</span> Reservation Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-5 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Room Type:</span>
                <span className="font-semibold">{edit.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in Date:</span>
                <span className="font-semibold">{edit.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out Date:</span>
                <span className="font-semibold">{edit.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Nights:</span>
                <span className="font-semibold">{edit.nights}</span>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white mb-8">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total Amount:</span>
              <span className="text-3xl font-bold">LKR {edit.totalAmount?.toLocaleString()}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mb-6">
            <p>Thank you for choosing Ocean View Resort!</p>
            <p>We look forward to serving you.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 print:hidden">
            <button
              onClick={printBill}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              🖨️ Print Bill
            </button>
            <button
              onClick={() => {
                setShowBill(false);
                setEdit(null);
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              ← Back to Reservations
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN VIEW =================
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                📋 Manage Reservations
              </h2>
              <p className="text-gray-600">View, edit, and manage all hotel reservations</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{reservations.length}</div>
              <div className="text-sm text-gray-500">Total Reservations</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search by guest name or room type..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
            />
            <span className="absolute left-4 top-4 text-2xl">🔍</span>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Guest Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Room Type</th>
                  <th className="px-6 py-4 text-left font-semibold">Check-in</th>
                  <th className="px-6 py-4 text-left font-semibold">Check-out</th>
                  <th className="px-6 py-4 text-left font-semibold">Nights</th>
                  <th className="px-6 py-4 text-left font-semibold">Total</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-lg">No reservations found</p>
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((r, index) => (
                    <tr 
                      key={r.id} 
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-blue-600">#{r.id}</td>
                      <td className="px-6 py-4 font-medium">{r.guestName}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {r.roomType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{r.checkIn}</td>
                      <td className="px-6 py-4 text-gray-600">{r.checkOut}</td>
                      <td className="px-6 py-4 font-semibold">{r.nights}</td>
                      <td className="px-6 py-4 font-bold text-green-600">
                        LKR {r.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => setEdit(r)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => cancelReservation(r.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow"
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Form Modal */}
        {edit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <h3 className="text-3xl font-bold text-blue-700 mb-6 flex items-center">
                <span className="mr-3">✏️</span> Edit Reservation
              </h3>

              <div className="space-y-5">
                {/* Guest Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Guest Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                    value={edit.guestName}
                    onChange={e => setEdit({ ...edit, guestName: e.target.value })}
                  />
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🛏️ Room Type
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                    value={edit.room?.id || ''}
                    onChange={e =>
                      setEdit({ ...edit, room: { id: Number(e.target.value) } })
                    }
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.roomType} - LKR {room.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Check-in Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                    value={edit.checkIn}
                    onChange={e => setEdit({ ...edit, checkIn: e.target.value })}
                  />
                </div>

                {/* Check-out Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Check-out Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                    value={edit.checkOut}
                    onChange={e => setEdit({ ...edit, checkOut: e.target.value })}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={updateReservation}
                  className="flex-1 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  ✅ Update & Print Bill
                </button>
                <button
                  onClick={() => setEdit(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}