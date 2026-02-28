import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    contact: "",
    address: "",
    nic: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isLogin) {
      if (!formData.name || formData.name.trim().length < 2)
        newErrors.name = "Name must be at least 2 characters";
      if (!formData.contact) newErrors.contact = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.contact.replace(/[-\s]/g, "")))
        newErrors.contact = "Phone number must be 10 digits";
      if (!formData.nic) newErrors.nic = "NIC is required";
      if (!formData.address || formData.address.trim().length < 5)
        newErrors.address = "Address must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:8080/api/customer/login",
          { email: formData.email, password: formData.password }
        );

        if (response.data) {
          localStorage.setItem("customer", JSON.stringify(response.data));
          localStorage.setItem("customerId", response.data.id);
          setMessage({ type: "success", text: "Login successful!" });
          setTimeout(() => navigate("/customer/cusdashboard"), 1500);
        } else {
          setMessage({ type: "error", text: "Invalid email or password" });
        }
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/customer/register",
          formData
        );

        if (response.data) {
          setMessage({
            type: "success",
            text: "Account created successfully! Please login.",
          });
          setTimeout(() => {
            setIsLogin(true);
            setFormData({ email: formData.email, password: "", name: "", contact: "", nic: "", address: "" });
          }, 2000);
        }
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          `${isLogin ? "Login" : "Registration"} failed. Please try again.`,
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "", contact: "", address: "", nic: "" });
    setErrors({});
    setMessage({ type: "", text: "" });
  };

  // Shared Tailwind classes for inputs
  const inputClass =
    "w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-500 via-blue-600 to-blue-800 p-4 relative">
      <div className="relative w-full max-w-md">
        <Link to="/customer" className="inline-flex items-center gap-2 text-white mb-6 hover:text-cyan-200 transition">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-cyan-600 to-blue-600 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-cyan-100">{isLogin ? "Sign in to your account" : "Join Ocean View Resort today"}</p>
          </div>

          <div className="p-8">
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="Phone Number"
                      value={formData.contact}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="nic"
                      placeholder="NIC"
                      value={formData.nic}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.nic && <p className="text-red-600 text-sm mt-1">{errors.nic}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                  </div>
                </>
                
              )}

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 transition-all"
              >
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={toggleMode} className="ml-2 text-cyan-600 hover:text-cyan-700 font-semibold">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
