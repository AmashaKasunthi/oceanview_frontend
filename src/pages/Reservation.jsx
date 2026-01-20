import { useEffect, useState } from "react";
import axios from "axios";

export default function Reservation() {

  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    guestName: "",
    address: "",
    contact: "",
    roomId: "",
    checkIn: "",
    checkOut: ""
  });

  const [totalAmount, setTotalAmount] = useState(0);

  // 🔹 Load available rooms
  useEffect(() => {
    axios.get("http://localhost:8080/api/rooms/available")
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Calculate bill automatically
  useEffect(() => {
    if (formData.roomId && formData.checkIn && formData.checkOut) {
      const room = rooms.find(r => r.id == formData.roomId);
      const nights =
        (new Date(formData.checkOut) - new Date(formData.checkIn)) /
        (1000 * 60 * 60 * 24);

      if (room && nights > 0) {
        setTotalAmount(nights * room.pricePerNight);
      } else {
        setTotalAmount(0);
      }
    }
  }, [formData, rooms]);

  // 🔹 Submit reservation
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/reservations", {
      ...formData,
      totalAmount
    })
      .then(() => {
        alert("Reservation Successful!");
        setFormData({
          guestName: "",
          address: "",
          contact: "",
          roomId: "",
          checkIn: "",
          checkOut: ""
        });
        setTotalAmount(0);
      })
      .catch(() => alert("Error saving reservation"));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        Room Reservation
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

        <input
          type="text"
          name="guestName"
          placeholder="Guest Name"
          value={formData.guestName}
          onChange={handleChange}
          className="border p-3 rounded-lg col-span-2"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 rounded-lg col-span-2"
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="border p-3 rounded-lg col-span-2"
          required
        />

        <select
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          className="border p-3 rounded-lg col-span-2"
          required
        >
          <option value="">Select Room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              {room.roomType} - LKR {room.pricePerNight}/night
            </option>
          ))}
        </select>

        <div>
          <label className="text-sm text-gray-600">Check-in Date</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Check-out Date</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />
        </div>

        <div className="col-span-2 bg-blue-50 p-4 rounded-lg text-lg font-semibold">
          Total Amount: <span className="text-blue-700">LKR {totalAmount}</span>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Confirm Reservation
        </button>

      </form>
    </div>
  );
}
