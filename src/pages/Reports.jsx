import axios from "axios";
import { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/reservations")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to load reservations:", err));
  }, []);

  // Calculate total revenue
  const totalRevenue = data.reduce((sum, r) => sum + r.totalAmount, 0);
  const totalNights = data.reduce((sum, r) => sum + r.nights, 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📊 Reservation Reports
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm mb-1">Total Reservations</p>
            <p className="text-3xl font-bold text-blue-600">{data.length}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm mb-1">Total Nights Booked</p>
            <p className="text-3xl font-bold text-green-600">{totalNights}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-purple-600">
              LKR {totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Guest</th>
                <th className="px-6 py-3 text-left font-semibold">Room</th>
                <th className="px-6 py-3 text-left font-semibold">Nights</th>
                <th className="px-6 py-3 text-left font-semibold">Total (LKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{r.guestName}</td>
                  <td className="px-6 py-4 text-gray-600">{r.room.roomType}</td>
                  <td className="px-6 py-4 text-gray-600">{r.nights}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {r.totalAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}