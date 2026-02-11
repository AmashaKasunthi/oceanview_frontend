/*import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDashboard() {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    contact: "",
    checkIn: "",
    checkOut: "",
  });

  const customer = JSON.parse(localStorage.getItem("customer")); // {id, name, email}

  // Fetch rooms and reservations
  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reservations");
      const customerRes = res.data.filter(r => r.guestName === customer.name);
      setReservations(customerRes);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setFormData({ address: "", contact: "", checkIn: "", checkOut: "" });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitReservation = async (e) => {
    e.preventDefault();

    if (!formData.address || !formData.contact || !formData.checkIn || !formData.checkOut) {
      alert("All fields are required!");
      return;
    }

    const reservationData = {
      guestName: customer.name,
      address: formData.address,
      contact: formData.contact,
      room: { id: selectedRoom.id },
      checkIn: formData.checkIn,
      checkOut: formData.checkOut
    };

    try {
      const res = await axios.post("http://localhost:8080/api/reservations", reservationData);
      alert("Reservation created successfully!");
      setReservations([...reservations, res.data]);
      setShowModal(false);
      fetchRooms(); // update availability
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert(err.response?.data || "Error creating reservation");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome, {customer.name}</h1>

      {/* Rooms */
     /* <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
      <div className="grid grid-cols-3 gap-6 mb-12">
        {rooms.map(room => (
          <div key={room.id} className="border p-4 rounded shadow bg-white">
            <img
              src={`http://localhost:8080/uploads/${room.image}`}
              alt={room.roomType}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="font-bold">{room.roomType}</h3>
            <p>Price per night: ${room.price}</p>
            <p>Available: {room.availableRooms}</p>
            <p className="text-sm text-gray-600">{room.description}</p>
            <button
              onClick={() => openModal(room)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
              disabled={room.availableRooms === 0}
            >
              {room.availableRooms === 0 ? "Sold Out" : "Book Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Reservations */
      /*<h2 className="text-2xl font-semibold mb-4">My Reservations</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Room</th>
              <th className="border px-4 py-2">Check-In</th>
              <th className="border px-4 py-2">Check-Out</th>
              <th className="border px-4 py-2">Nights</th>
              <th className="border px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id} className="text-center">
                <td className="border px-4 py-2">{r.roomType}</td>
                <td className="border px-4 py-2">{r.checkIn}</td>
                <td className="border px-4 py-2">{r.checkOut}</td>
                <td className="border px-4 py-2">{r.nights}</td>
                <td className="border px-4 py-2">${r.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */
      /*{showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4">Book: {selectedRoom.roomType}</h3>
            <form onSubmit={submitReservation} className="flex flex-col gap-3">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Reserve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
*/
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showReservations, setShowReservations] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);


  const [formData, setFormData] = useState({
    address: "",
    contact: "",
    checkIn: "",
    checkOut: "",
  });

  const customer = JSON.parse(localStorage.getItem("customer"));
  
  //  Get today's date in YYYY-MM-DD format to prevent past date selection
  const today = new Date().toISOString().split('T')[0];

  // ================= SAFETY =================
  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Session Expired</h2>
          <p className="text-gray-600">Please login again to continue.</p>
        </div>
      </div>
    );
  }

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchRooms();
    fetchReservations();

    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error loading rooms", err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/reservations");
      setReservations(
        res.data.filter(r => r.guestName === customer.name)
      );
    } catch (err) {
      console.error("Error loading reservations", err);
    }
  };

  // ================= OPEN FORM =================
  const bookRoom = (room) => {
    setSelectedRoom(room);
    setFormData({
      address: "",
      contact: "",
      checkIn: "",
      checkOut: "",
    });
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const submitReservation = async (e) => {
    e.preventDefault();

    const reservation = {
      guestName: customer.name,
      address: formData.address,
      contact: formData.contact,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      room: { id: selectedRoom.id },
    };

    try {
      await axios.post(
        "http://localhost:8080/api/reservations",
        reservation
      );

      alert("Reservation successful!");
      setSelectedRoom(null);
      fetchRooms();
      fetchReservations();
    } catch (err) {
      console.error("Reservation failed", err);
      alert(err.response?.data || "Reservation failed");
    }
  };

  // ================= EDIT RESERVATION =================
  const openEditModal = (reservation) => {
    setEditingReservation(reservation);
    setFormData({
      address: reservation.address || "",
      contact: reservation.contact || "",
      checkIn: reservation.checkIn || "",
      checkOut: reservation.checkOut || "",
    });
  };

  const updateReservation = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/reservations/${editingReservation.id}`,
        {
          ...editingReservation,
          address: formData.address,
          contact: formData.contact,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
        }
      );

      alert("Reservation updated successfully!");
      setEditingReservation(null);
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("customer");
    navigate("/customer");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hotel Booking
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, <span className="font-semibold text-indigo-600">{customer.name}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ================= MY RESERVATIONS SECTION ================= */}
        <div className="mb-8">
          <button
            onClick={() => setShowReservations(!showReservations)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {showReservations ? "Hide My Reservations" : "My Reservations"}
            {reservations.length > 0 && (
              <span className="bg-white text-indigo-600 px-2 py-0.5 rounded-full text-sm font-bold">
                {reservations.length}
              </span>
            )}
          </button>
        </div>

        {/* ================= RESERVATIONS TABLE ================= */}
        {showReservations && (
          <div className="mb-10 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-linear-to-r from-indigo-600 to-purple-600">
              <h2 className="text-xl font-bold text-white">My Reservations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Room Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check-In</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check-Out</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nights</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <p className="text-gray-500 font-medium">No reservations found</p>
                          <p className="text-gray-400 text-sm mt-1">Book a room to see your reservations here</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    reservations.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{r.roomType}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.checkIn}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.checkOut}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{r.nights}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">LKR {r.totalAmount?.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              r.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : r.status === "REJECTED"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => openEditModal(r)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= AVAILABLE ROOMS ================= */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Rooms</h2>
          <p className="text-gray-600">Choose from our luxurious rooms</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map(room => (
            <div
              key={room.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="md:flex">
                {/* Image Section */}
                <div className="md:w-2/5 relative">
                  <img
                    src={`http://localhost:8080/uploads/${room.image}`}
                    alt={room.roomType}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg">
                    <div className="text-xs font-medium">From</div>
                    <div className="text-xl font-bold">LKR {room.price?.toLocaleString()}</div>
                    <div className="text-xs opacity-90">per night</div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="md:w-3/5 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{room.roomType}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        
                      </div>
                    </div>
                  </div>

                  {/* Room Description */}
                  {room.description && (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {room.description}
                    </p>
                  )}

                  

                  

                  {/* Availability and Book Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${Number(room.availableRooms) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-sm font-semibold ${Number(room.availableRooms) > 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {Number(room.availableRooms) > 0 
                          ? `${room.availableRooms} Available` 
                          : 'Sold Out'}
                      </span>
                    </div>

                    <button
                      onClick={() => bookRoom(room)}
                      disabled={Number(room.availableRooms) <= 0}
                      className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 shadow-md hover:shadow-lg"
                    >
                      {Number(room.availableRooms) <= 0 ? "Sold Out" : "Book Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h3 className="text-2xl font-bold text-white">Edit Reservation</h3>
            </div>

            <form onSubmit={updateReservation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-In Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || today}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingReservation(null)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BOOKING MODAL ================= */}
      {selectedRoom && (
        <div
          style={{ zIndex: 9999 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h3 className="text-2xl font-bold text-white">
                Book {selectedRoom.roomType}
              </h3>
              <p className="text-indigo-100 text-sm mt-1">
                LKR {selectedRoom.price} per night
              </p>
            </div>

            <form onSubmit={submitReservation} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-In Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || today}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedRoom(null)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}