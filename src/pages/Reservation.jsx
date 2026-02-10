/*import { useEffect, useState } from "react";


export default function Reservation() {
  const [rooms, setRooms] = useState([]);
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState(null);

  const [formData, setFormData] = useState({
    guestName: "",
    address: "",
    contact: "",
    roomId: "",
    checkIn: "",
    checkOut: ""
  });

  // ===============================
  // LOAD ROOMS
  // ===============================
  useEffect(() => {
    fetch("http://localhost:8080/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(() => alert("Failed to load rooms"));
  }, []);

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===============================
  // CALCULATE NIGHTS & TOTAL
  // ===============================
  useEffect(() => {
    if (formData.roomId && formData.checkIn && formData.checkOut) {
      const room = rooms.find(r => r.id === Number(formData.roomId));
      const inDate = new Date(formData.checkIn);
      const outDate = new Date(formData.checkOut);
      const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);

      if (room && diff > 0) {
        setNights(diff);
        setTotalAmount(diff * room.price);
      } else {
        setNights(0);
        setTotalAmount(0);
      }
    }
  }, [formData, rooms]);

  // ===============================
  // SUBMIT RESERVATION
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.guestName ||
      !formData.address ||
      !formData.contact ||
      !formData.roomId ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      alert("Please fill all fields");
      return;
    }

    if (nights <= 0) {
      alert("Check-out must be after check-in");
      return;
    }

    // ✅ CORRECT PAYLOAD
    const reservationData = {
      guestName: formData.guestName,
      address: formData.address,
      contact: formData.contact,
      room: {
        id: Number(formData.roomId)
      },
      checkIn: formData.checkIn,
      checkOut: formData.checkOut
    };

    console.log("Sending reservation:", reservationData);

    try {
      const res = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData)
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const saved = await res.json();
      const selectedRoom = rooms.find(r => r.id === Number(formData.roomId));

      setBillData({
        ...saved,
        roomPrice: selectedRoom.price,
        bookingDate: new Date().toLocaleDateString("en-GB")
      });

      setShowBill(true);

      // Reset form
      setFormData({
        guestName: "",
        address: "",
        contact: "",
        roomId: "",
        checkIn: "",
        checkOut: ""
      });
      setNights(0);
      setTotalAmount(0);

      // Reload rooms
      fetch("http://localhost:8080/api/rooms")
        .then(res => res.json())
        .then(data => setRooms(data));

    } catch (err) {
      alert("Reservation failed: " + err.message);
    }
  };

  // ===============================
  // PRINT BILL
  // ===============================
  const handlePrint = () => window.print();

  // ===============================
  // BILL VIEW
  // ===============================
  if (showBill && billData) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 mt-10">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          OCEAN VIEW RESORT
        </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          Reservation Confirmation
        </p>

        <p><b>Booking ID:</b> {billData.id}</p>
        <p><b>Guest:</b> {billData.guestName}</p>
        <p><b>Contact:</b> {billData.contact}</p>
        <p><b>Address:</b> {billData.address}</p>

        <hr className="my-4" />

        <p><b>Room Type:</b> {billData.roomType}</p>
        <p><b>Check-in:</b> {billData.checkIn}</p>
        <p><b>Check-out:</b> {billData.checkOut}</p>
        <p><b>Nights:</b> {billData.nights}</p>
        <p><b>Rate:</b> LKR {billData.roomPrice}</p>

        <h2 className="text-xl font-bold mt-4">
          TOTAL: LKR {billData.totalAmount}
        </h2>

        <div className="mt-6 flex gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Print Bill
          </button>

          <button
            onClick={() => setShowBill(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded"
          >
            New Reservation
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // FORM VIEW
  // ===============================
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Room Reservation
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="guestName"
          placeholder="Guest Name"
          value={formData.guestName}
          onChange={handleChange}
          className="border p-3 col-span-2"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-3 col-span-2"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="border p-3 col-span-2"
        />

        <select
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          className="border p-3 col-span-2"
        >
          <option value="">Select Room</option>
          {rooms.map(room => (
            <option
              key={room.id}
              value={room.id}
              disabled={room.availableRooms <= 0}
            >
              {room.roomType} - LKR {room.price}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="border p-3"
        />

        <div className="col-span-2 bg-blue-50 p-4 rounded">
          <p>Nights: <b>{nights}</b></p>
          <p>Total: <b>LKR {totalAmount}</b></p>
        </div>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}*/
import { useEffect, useState } from "react";

export default function Reservation() {
  const [rooms, setRooms] = useState([]);
  const [nights, setNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState(null);

  const [formData, setFormData] = useState({
    guestName: "",
    address: "",
    contact: "",
    roomId: "",
    checkIn: "",
    checkOut: ""
  });

  // ===============================
  // Calculate today's date
  // ===============================
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minCheckIn = `${yyyy}-${mm}-${dd}`;

  // ===============================
  // LOAD ROOMS
  // ===============================
  useEffect(() => {
    fetch("http://localhost:8080/api/rooms")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(() => alert("Failed to load rooms"));
  }, []);

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===============================
  // CALCULATE NIGHTS & TOTAL
  // ===============================
  useEffect(() => {
    if (formData.roomId && formData.checkIn && formData.checkOut) {
      const room = rooms.find(r => r.id === Number(formData.roomId));
      const inDate = new Date(formData.checkIn);
      const outDate = new Date(formData.checkOut);

      const diff = Math.floor((outDate - inDate) / (1000 * 60 * 60 * 24));

      if (room && diff > 0) {
        setNights(diff);
        setTotalAmount(diff * room.price);
      } else {
        setNights(0);
        setTotalAmount(0);
      }
    }
  }, [formData, rooms]);

  // ===============================
  // SUBMIT RESERVATION
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.guestName ||
      !formData.address ||
      !formData.contact ||
      !formData.roomId ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      alert("Please fill all fields");
      return;
    }

    const checkInDate = new Date(formData.checkIn);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (checkInDate < todayDate) {
      alert("Check-in date cannot be in the past");
      return;
    }

    if (nights <= 0) {
      alert("Check-out must be after check-in");
      return;
    }

    const room = rooms.find(r => r.id === Number(formData.roomId));

    const reservationData = {
      guestName: formData.guestName,
      address: formData.address,
      contact: formData.contact,
      room: { id: Number(formData.roomId) },
      roomType: room?.roomType || "",
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      nights: nights,
      totalAmount: totalAmount
    };

    try {
      const res = await fetch("http://localhost:8080/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData)
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const saved = await res.json();
      setBillData(saved);
      setShowBill(true);

      setFormData({
        guestName: "",
        address: "",
        contact: "",
        roomId: "",
        checkIn: "",
        checkOut: ""
      });

      setNights(0);
      setTotalAmount(0);

      const updatedRooms = await fetch("http://localhost:8080/api/rooms").then(r => r.json());
      setRooms(updatedRooms);

    } catch (err) {
      alert("Reservation failed: " + err.message);
    }
  };

  const handlePrint = () => window.print();

  // ===============================
  // BILL VIEW
  // ===============================
  if (showBill && billData) {
    return (
      <div className="min-h-screen bg-blue-50 py-10 px-4">
        <div className="bill-print-area max-w-3xl mx-auto bg-white shadow-xl p-8">

          <h1 className="text-3xl font-bold text-center text-blue-700">
            🏨 OCEAN VIEW RESORT
          </h1>
          <p className="text-gray-600 text-lg">Premium Beach Resort </p>
              <p className="text-sm text-gray-500 mt-2">
                123 Beach Road, Galle, Sri Lanka | Tel: +94 11 234 5678
              </p>

          <p className="text-center text-sm text-gray-500 mb-6">
            Reservation 
          </p>

          <div className="space-y-2">
            <p><b>Booking ID:</b> {billData.id}</p>
            <p><b>Guest:</b> {billData.guestName}</p>
            <p><b>Contact:</b> {billData.contact}</p>
            <p><b>Address:</b> {billData.address}</p>
          </div>

          <hr className="my-4" />

          <div className="space-y-2">
            <p><b>Room Type:</b> {billData.roomType || billData.room?.roomType}</p>
            <p><b>Check-in:</b> {billData.checkIn}</p>
            <p><b>Check-out:</b> {billData.checkOut}</p>
            <p><b>Nights:</b> {billData.nights}</p>
          </div>

          <h2 className="text-xl font-bold mt-4 text-blue-700">
            TOTAL: LKR {billData.totalAmount?.toLocaleString()}
          </h2>
          <div className="text-center text-sm text-gray-500 mb-6">
              <p>Thank you for choosing Ocean View Resort!</p>
            </div>

        </div>

        <div className="mt-6 flex gap-4 justify-center print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            🖨️ Print Bill
          </button>

          <button
            onClick={() => setShowBill(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded"
          >
            New Reservation
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // FORM VIEW
  // ===============================
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Room Reservation
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input type="text" name="guestName" placeholder="Guest Name"
          value={formData.guestName} onChange={handleChange}
          className="border p-3 col-span-2" />

        <input type="text" name="address" placeholder="Address"
          value={formData.address} onChange={handleChange}
          className="border p-3 col-span-2" />

        <input type="text" name="contact" placeholder="Contact Number"
          value={formData.contact} onChange={handleChange}
          className="border p-3 col-span-2" />

        <select name="roomId" value={formData.roomId} onChange={handleChange}
          className="border p-3 col-span-2">
          <option value="">Select Room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id} disabled={room.availableRooms <= 0}>
              {room.roomType} — LKR {room.price}
            </option>
          ))}
        </select>

        <input type="date" name="checkIn" min={minCheckIn}
          value={formData.checkIn} onChange={handleChange}
          className="border p-3" />

        <input type="date" name="checkOut" min={formData.checkIn || minCheckIn}
          value={formData.checkOut} onChange={handleChange}
          className="border p-3" />

        <div className="col-span-2 bg-blue-50 p-4 rounded">
          <p>Nights: <b>{nights}</b></p>
          <p>Total (estimate): <b>LKR {totalAmount}</b></p>
        </div>

        <button type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 rounded">
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}
