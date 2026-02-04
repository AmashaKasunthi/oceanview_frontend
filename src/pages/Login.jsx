
import { useState } from "react";
import axios from "axios";

export default function Login({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const url = "http://localhost:8080/api/admin/login";
      const payload = { username, password };
      const res = await axios.post(url, payload);

      // Handle login - backend returns JWT token directly
      if (res.data && res.data !== "FAILED") {
        // ✅ Store JWT token
        localStorage.setItem("token", res.data);
        // ✅ Store admin username
        localStorage.setItem("adminUsername", username);
        alert("Login Successful");
        setLogin(true); // Navigate to admin panel
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Server error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login-bg1.jpg')"
      }}
    >
      <div className="bg-white/40 p-8 rounded-2xl shadow-2xl w-96">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-30 h-30 bg-white/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <img src="/oceanview.logo.png" className="p-2" />
          </div>
          <h2 className="text-xl font-bold">Ocean View Resort</h2>
          <p className="text-xl font-bold text-blue-500">Login</p>
        </div>

        {/* Form */}
        <input
          className="w-full p-3 border mb-3 rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 border mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-500"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

      </div>
    </div>
  );
}


