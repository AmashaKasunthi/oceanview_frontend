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
    phone: "",
  
    address: "",
    nic: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Signup validations
    if (!isLogin) {
      if (!formData.name || formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
        newErrors.phone = "Phone number must be 10 digits";
      }

      

      if (!formData.nic) {
        newErrors.nic = "NIC is required";
      }

      if (!formData.address || formData.address.trim().length < 5) {
        newErrors.address = "Address must be at least 5 characters";
      }
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
        // Login request
        const response = await axios.post(
          "http://localhost:8080/api/customer/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        if (response.data) {
          localStorage.setItem("customer", JSON.stringify(response.data));
          localStorage.setItem("customerId", response.data.id);

          setMessage({ type: "success", text: "Login successful!" });
          setTimeout(() => {
            navigate("/customer/rooms");
          }, 1500);
        } else {
          setMessage({
            type: "error",
            text: "Invalid email or password. Please try again.",
          });
        }
      } else {
        // Signup request
        const response = await axios.post(
          "http://localhost:8080/api/customer/register",
          {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
            nic: formData.nic,
            address: formData.address,
            password: formData.password,
          }
        );

        if (response.data) {
          setMessage({
            type: "success",
            text: "Account created successfully! Please login.",
          });
          setTimeout(() => {
            setIsLogin(true);
            setFormData({
              email: formData.email,
              password: "",
              name: "",
              phone: "",
              nic: "",
              address: "",
            });
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
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      nic: "",
    });
    setErrors({});
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-500 via-blue-600 to-blue-800 p-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          to="/customer"
          className="inline-flex items-center gap-2 text-white mb-6 hover:text-cyan-200 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        {/* Login/Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-cyan-600 to-blue-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-cyan-100">
              {isLogin ? "Sign in to your account" : "Join Ocean View Resort today"}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-xl ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">{message.text}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="1234567890"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="nic" className="block text-sm font-semibold text-gray-700 mb-2">
                      NIC
                    </label>
                    <input
                      type="text"
                      id="nic"
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                      placeholder="123456789V"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Ocean St, Colombo"
                      className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-200"
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-200"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-200"
                />
              </div>

              

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 transition-all"
              >
                {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={toggleMode} className="ml-2 text-cyan-600 hover:text-cyan-700 font-semibold">
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
