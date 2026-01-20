import { useState } from "react";
import axios from "axios";

export default function Login({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // optional loading state

  const login = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true); // start loading

    try {
      // POST to Spring Boot backend
      const res = await axios.post("http://localhost:8080/api/admin/login", {
        username,
        password,
      });

      // Check response
      if (res.data === "SUCCESS") {
        setLogin(true); // go to dashboard
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(
        "Cannot connect to server. Make sure Spring Boot backend is running and CORS is enabled."
      );
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="bg-white p-10 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl mb-5 font-bold text-center">Admin Login</h2>

        <input
          type="text"
          className="w-full p-2 border mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}