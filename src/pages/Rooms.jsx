/*import axios from "axios";
import {useEffect,useState} from "react";

export default function Rooms(){
 const [rooms,setRooms]=useState([]);
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [image,setImage]=useState("");

 useEffect(()=>load(),[]);

 const load=()=>axios.get("http://localhost:8080/api/rooms").then(r=>setRooms(r.data));

 const add=()=>{
  axios.post("http://localhost:8080/api/rooms",{name,price,image}).then(load);
 }

 return(
  <div>
   <h2 className="text-xl mb-4">Room Management</h2>
   <input placeholder="Room name" onChange={e=>setName(e.target.value)}/>
   <input placeholder="Price" onChange={e=>setPrice(e.target.value)}/>
   <input placeholder="Image URL" onChange={e=>setImage(e.target.value)}/>
   <button onClick={add}>Add</button>

   <div className="grid grid-cols-3 mt-4">
    {rooms.map(r=>(
      <div key={r.id}>
        <img src={r.image} className="h-32"/>
        <p>{r.name} - Rs.{r.price}</p>
      </div>
    ))}
   </div>
  </div>
 )
}*/
/*import { useEffect, useState } from "react";
import axios from "axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // ✅ Correct way: define async function inside useEffect
    async function fetchRooms() {
      try {
        const res = await axios.get("http://localhost:8080/api/rooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    fetchRooms();
  }, []); // empty dependency array → runs once on mount

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              {room.number} - {room.type} - ${room.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, Home, Image } from "lucide-react";

const API_URL = "http://localhost:8080/api/rooms";
const IMAGE_URL = "http://localhost:8080/uploads/";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    id: null,
    roomType: "",
    price: "",
    totalRooms: "",
    description: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setRooms(res.data);
    } catch (error) {
      console.error("Error loading rooms:", error);
      alert("Failed to load rooms. Make sure backend is running on port 8080");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert("Please select a PNG, JPG, or JPEG image file");
        e.target.value = '';
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Validation
    if (!form.roomType.trim()) {
      alert("Please enter room type");
      return;
    }

    if (!form.price || parseFloat(form.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (!form.totalRooms || parseInt(form.totalRooms) <= 0) {
      alert("Please enter valid number of total rooms");
      return;
    }

    if (!form.description.trim()) {
      alert("Please enter room description");
      return;
    }

    if (!isEditing && !image) {
      alert("Please upload a room image");
      return;
    }

    try {
      setLoading(true);
      
      const data = new FormData();
      data.append("roomType", form.roomType.trim());
      data.append("price", parseFloat(form.price));
      data.append("totalRooms", parseInt(form.totalRooms));
      data.append("description", form.description.trim());
      
      if (image) {
        data.append("image", image);
      }

      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Room updated successfully!");
      } else {
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Room added successfully!");
      }

      resetForm();
      await loadRooms();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving room:", error);
      
      if (error.response) {
        alert(`Failed to save room: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        alert("Cannot connect to backend. Please ensure:\n1. Backend is running on port 8080\n2. CORS is configured correctly");
      } else {
        alert("Failed to save room: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room? This action cannot be undone.")) return;
    
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      alert("Room deleted successfully!");
      await loadRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Failed to delete room: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const editRoom = (room) => {
    setForm({
      id: room.id,
      roomType: room.roomType,
      price: room.price.toString(),
      totalRooms: room.totalRooms.toString(),
      description: room.description || ""
    });
    setImagePreview(`${IMAGE_URL}${room.image}`);
    setImage(null);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setForm({
      id: null,
      roomType: "",
      price: "",
      totalRooms: "",
      description: ""
    });
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Home className="text-indigo-600" size={32} />
                OceanView Resort - Room Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your hotel rooms efficiently</p>
            </div>
            <button
              onClick={openAddModal}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md"
            >
              <Plus size={20} />
              Add New Room
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && rooms.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading rooms...</p>
          </div>
        )}

        {/* Room Cards Grid */}
        {!loading && rooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Room Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={`${IMAGE_URL}${room.image}`}
                    alt={room.roomType}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23ddd" width="400" height="300"/><text x="50%" y="50%" font-size="18" text-anchor="middle" fill="%23999">Image Not Found</text></svg>';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-sm font-semibold text-gray-700">
                      {room.availableRooms}/{room.totalRooms} Available
                    </span>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{room.roomType}</h3>
                  
                  {room.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{room.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price per night:</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        Rs. {parseFloat(room.price).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Rooms:</span>
                      <span className="font-semibold text-gray-800">{room.totalRooms}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className={`font-semibold ${room.availableRooms > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {room.availableRooms}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    {room.availableRooms > 0 ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Fully Booked
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => editRoom(room)}
                      disabled={loading}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRoom(room.id)}
                      disabled={loading}
                      className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && rooms.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Home size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Rooms Available</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first room</p>
            <button
              onClick={openAddModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Add Room
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-indigo-600 text-white p-6 rounded-t-lg sticky top-0 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {isEditing ? "Edit Room" : "Add New Room"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    disabled={loading}
                    className="text-white hover:bg-indigo-700 p-1 rounded-full transition-colors disabled:opacity-50"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Type *
                    </label>
                    <input
                      type="text"
                      name="roomType"
                      placeholder="e.g., Deluxe Suite, Ocean View"
                      value={form.roomType}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Night (Rs.) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="e.g., 15000"
                      value={form.price}
                      onChange={handleChange}
                      disabled={loading}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Rooms *
                    </label>
                    <input
                      type="number"
                      name="totalRooms"
                      placeholder="e.g., 10"
                      value={form.totalRooms}
                      onChange={handleChange}
                      disabled={loading}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      placeholder="Enter room description, amenities, features..."
                      value={form.description}
                      onChange={handleChange}
                      disabled={loading}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Image {!isEditing && "*"} {isEditing && "(Optional - leave empty to keep current)"}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg mb-2"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImage(null);
                              setImagePreview(null);
                            }}
                            disabled={loading}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:opacity-50"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="py-8">
                          <Image size={48} className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload image</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, or JPEG</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        onChange={handleImageChange}
                        disabled={loading}
                        className="w-full mt-2 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      disabled={loading}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      {loading ? "Saving..." : (isEditing ? "Update Room" : "Add Room")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;