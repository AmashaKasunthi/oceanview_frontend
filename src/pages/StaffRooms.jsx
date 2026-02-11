import { useEffect, useState } from "react";
import axios from "axios";

export default function StaffRooms() {
  const [rooms, setRooms] = useState([]);

  // ================= LOAD ROOMS =================
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error loading rooms", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Rooms</h2>
        <p className="text-gray-600">View all rooms added by admin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rooms.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No rooms available.</p>
        ) : (
          rooms.map(room => (
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
                  <h3 className="text-2xl font-bold text-gray-800">{room.roomType}</h3>
                  {room.description && (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {room.description}
                    </p>
                  )}

                  {/* Availability */}
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${Number(room.availableRooms) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-semibold ${Number(room.availableRooms) > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {Number(room.availableRooms) > 0 
                        ? `${room.availableRooms} Available` 
                        : 'Sold Out'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
