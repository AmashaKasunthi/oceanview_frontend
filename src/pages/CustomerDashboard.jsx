import { useEffect, useState } from "react";
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

      {/* Rooms */}
      <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
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

      {/* Reservations */}
      <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>
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

      {/* Modal */}
      {showModal && (
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
