import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 
import axios from "axios";



const API_URL = "http://localhost:8080/api/rooms";
const IMAGE_URL = "http://localhost:8080/uploads/";

export default function Customerviewrooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await axios.get(API_URL);
      setRooms(res.data);
    } catch (error) {
      console.error("Error loading rooms", error);
      alert("Failed to load rooms");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading rooms...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we fetch available rooms</p>
        </div>
      </div>
    );
  }

  const availableRooms = rooms.filter(room => room.availableRooms > 0);

  return (
  <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
    
    {/* Back Button */}
    <div className="max-w-7xl mx-auto pt-6 px-6">
      <button
        onClick={() => navigate("/customer")}
        className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-colors"
      >
        <ArrowLeft size={20} />
        Back 
      </button>
    </div>

    {/* Hero Section */}
    <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 mt-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Luxury Rooms
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-6">
            Experience comfort and elegance in every stay
          </p>
          
        </div>
      </div>
    </div>

      {/* Rooms Grid Section */}
      <div className="max-w-7xl mx-auto px-2 py-2">
        {availableRooms.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block bg-white rounded-full p-8 shadow-lg mb-6">
              <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">No Rooms Available</h2>
            <p className="text-gray-600 text-lg">All our rooms are currently booked. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Room Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={`${IMAGE_URL}${room.image}`}
                    alt={room.roomType}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  {/* Overlay Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-green-700">{room.availableRooms} Available</span>
                    </div>
                  </div>      
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    {room.roomType}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                    {room.description }
                  </p>
                  {/* Price Section */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Starting from</p>
                      <p className="text-3xl font-bold text-indigo-600">
                        LKR {parseFloat(room.price).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">per night</p>
                    </div>
                    <Link  to="/customer/login"
                      className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >Book </Link>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Our Rooms?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Service</h3>
              <p className="text-gray-600 text-sm">Round the clock support</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">Your safety is our priority</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Best Comfort</h3>
              <p className="text-gray-600 text-sm">Premium quality rooms</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Best Price</h3>
              <p className="text-gray-600 text-sm">Affordable luxury for all</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}