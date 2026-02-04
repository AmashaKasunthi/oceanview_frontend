import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CustomerHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            
            <span
              className={`text-2xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Ocean View Resort
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/customer/rooms"
              className={`font-medium transition ${
                scrolled
                  ? "text-gray-700 hover:text-cyan-600"
                  : "text-white hover:text-cyan-200"
              }`}
            >
              Rooms
            </Link>
            <Link
              to="/customer/login"
              className="px-6 py-2 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000')",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-rrom-blue-900/80 to-cyan-900/60"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            Luxury Awaits at the
            <span className="block text-cyan-300">Ocean's Edge</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay">
            Experience unparalleled comfort with breathtaking ocean views
          </p>
          <div className="flex gap-4 justify-center animate-fade-in-delay-2">
            <Link
              to="/customer/rooms"
              className="px-8 py-4 bg-cyan-500 text-white rounded-full text-lg font-semibold hover:bg-cyan-600 hover:scale-105 transition-all shadow-xl"
            >
              Explore Rooms
            </Link>
            <a
              href="#about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/30"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Ocean View Resort
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover a perfect blend of luxury, comfort, and natural beauty
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-linear-to-br from-cyan-50 to-blue-50 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Luxury Rooms
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Elegantly designed rooms with premium amenities, plush bedding,
                and stunning ocean or garden views
              </p>
            </div>

            <div className="group p-8 bg-linear-to-brrom-blue-50 to-indigo-50 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fine Dining
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Savor exquisite cuisine at our oceanfront restaurant featuring
                fresh seafood and international flavors
              </p>
            </div>

            <div className="group p-8 bg-linear-to-br from-teal-50 to-cyan-50 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Spa & Wellness
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Rejuvenate your body and mind with our world-class spa
                treatments and fitness facilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Preview Section */}
      <section className="py-20 bg-linear-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Signature Rooms
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our collection of thoughtfully designed accommodations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div
                className="h-80 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800')",
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Deluxe Ocean View
                </h3>
                <p className="text-blue-100 mb-4">
                  Wake up to panoramic ocean vistas
                </p>
                <Link
                  to="/customer/rooms"
                  className="text-cyan-300 font-semibold hover:text-cyan-200 transition inline-flex items-center gap-2"
                >
                  View Details
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div
                className="h-80 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800')",
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Presidential Suite
                </h3>
                <p className="text-blue-100 mb-4">
                  Ultimate luxury with private terrace
                </p>
                <Link
                  to="/customer/rooms"
                  className="text-cyan-300 font-semibold hover:text-cyan-200 transition inline-flex items-center gap-2"
                >
                  View Details
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Amenities
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a perfect stay
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🏊", name: "Infinity Pool" },
              { icon: "🍽️", name: "Restaurant" },
              { icon: "💆", name: "Spa Services" },
              { icon: "🏋️", name: "Fitness Center" },
              { icon: "🚗", name: "Free Parking" },
              { icon: "📶", name: "High-Speed WiFi" },
              { icon: "🏖️", name: "Private Beach" },
              { icon: "🎯", name: "Concierge" },
            ].map((amenity, index) => (
              <div
                key={index}
                className="p-6 bg-linear-to-br from-slate-50 to-blue-50 rounded-2xl text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-5xl mb-3">{amenity.icon}</div>
                <p className="font-semibold text-gray-800">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-linear-to-br from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Guest Experiences
            </h2>
            <p className="text-xl text-cyan-100">
              See what our guests are saying
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                review:
                  "Absolutely stunning resort! The ocean views were breathtaking and the staff went above and beyond.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                review:
                  "Best vacation we've ever had. The rooms were immaculate and the food was exceptional.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                review:
                  "A true paradise. The spa treatments were divine and the beach access was perfect.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-cyan-50 mb-4 italic">
                  "{testimonial.review}"
                </p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Dream Vacation?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your stay today and experience luxury at its finest
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/customer/rooms"
              className="px-10 py-4 bg-cyan-500 text-white rounded-full text-lg font-semibold hover:bg-cyan-600 hover:scale-105 transition-all shadow-xl"
            >
              Book Now
            </Link>
            <Link
              to="/customer/login"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/30"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">
                Ocean View Resort
              </h3>
              <p className="text-sm">
                Experience luxury and comfort at the ocean's edge
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/customer/rooms" className="hover:text-cyan-400">
                    Rooms
                  </Link>
                </li>
                <li>
                  <a href="#about" className="hover:text-cyan-400">
                    About Us
                  </a>
                </li>
                <li>
                  <Link to="/customer/login" className="hover:text-cyan-400">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>123 Ocean Drive</li>
                <li>Paradise Bay, PB 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@oceanview.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cyan-600 transition"
                >
                  F
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cyan-600 transition"
                >
                  T
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-cyan-600 transition"
                >
                  I
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; 2026 Ocean View Resort. All rights reserved. |{" "}
              <a href="#" className="hover:text-cyan-400">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="hover:text-cyan-400">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s backwards;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s backwards;
        }
      `}</style>
    </div>
  );
}