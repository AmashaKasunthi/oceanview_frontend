/*import { useState } from "react";
import axios from "axios";

export default function Login({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/admin/login", {
        username,
        password,
      });

      if (res.data === "SUCCESS") {
        setLogin(true);
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-200 to-blue-400">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

       /* {/* Logo */
        /*<div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg mb-3">
            <img
              src="/oceanview.logo.png" // place logo in public folder
              alt="OceanView Resort Logo"
              className="object-contain w-full h-full p-2"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-800">Admin Login</h2>
          
        </div>*/

        /*{/* Form */
        /*<input
          type="text"
          className="w-full p-2 border mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}*/
import { useState } from "react";
import axios from "axios";

export default function Login({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username || !password || (isRegister && !secretKey)) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const url = isRegister
        ? "http://localhost:8080/api/admin/register"
        : "http://localhost:8080/api/admin/login";

      const payload = isRegister
        ? { username, password, secretKey }
        : { username, password };

      const res = await axios.post(url, payload);

      if (res.data === "SUCCESS") {
        alert(isRegister ? "Admin registered successfully!" : "Login successful");
        if (!isRegister) setLogin(true);
        setIsRegister(false);
      } else {
        alert(res.data);
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

        {/* Secret key (only for register) */}
        {isRegister && (
          <input
            className="w-full p-2 border mb-3 rounded border-red-400"
            placeholder="Admin Secret Key"
            onChange={(e) => setSecretKey(e.target.value)}
          />
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-500"
        >
          {loading
            ? "Please wait..."
            : isRegister
            ? "Register Admin"
            : "Login"}
        </button>

        {/* Hidden Register Toggle */}
        <p
          className="text-xs text-center text-blue-600 mt-4 cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Back to Login"
            : "Register as Admin (Authorized only)"}
        </p>

      </div>
    </div>
  );
}

