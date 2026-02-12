import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StaffLogin({ setLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    if (!username || !password) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/staff/login",
        { username, password }
      );

      if (res.data && res.data !== "FAILED") {
        localStorage.setItem("token", res.data);
        localStorage.setItem("staffUsername", username);
        alert("Login Successful");
        setLogin(true);
        navigate("/staff");   //  redirect
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Server error. Check backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-100 to-indigo-500">


      <div className="bg-white/40 p-8 rounded-2xl shadow-2xl w-96">

        <div className="text-center mb-6">
          <div className="w-30 h-30 bg-white/10 rounded-xl mx-auto mb-3 flex items-center justify-center">
            <img src="/oceanview.logo.png" className="p-2" />
          </div>
          <h2 className="text-xl font-bold">Ocean View Resort</h2>
          <p className="text-xl font-bold text-blue-500">Staff Login</p>
        </div>

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
