import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { logo } from "../Img/ImportedImage";
import { Menu, X } from "lucide-react"; // ✅ for hamburger icon

function Navbar() {
  const menuItems = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Service", link: "/service" },
    { id: 2, name: "Company Service", link: "/company-service" },
    // { id: 3, name: "Faqs", link: "/faqs" },
  ];

  const isLoggedIn = !!localStorage.getItem("accessToken"); // ✅ check token
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ toggle state

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full py-4 px-6 z-50 transition-all duration-300 ${
        isSticky ? "fixed top-0 bg-[#fff4ea] shadow-sm" : "relative bg-[#fff4ea]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-[#205c64] font-medium underline underline-offset-4"
                    : "hover:text-[#205c64]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right Button */}
        <div className="hidden md:flex flex-shrink-0">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="bg-[#205c64] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#17434a] transition-colors"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-[#205c64] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#17434a] transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 bg-[#fff4ea] p-4 rounded-lg shadow">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              onClick={() => setIsOpen(false)} // close on click
              className="block text-gray-700 hover:text-[#205c64] transition-colors"
            >
              {item.name}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block bg-[#205c64] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#17434a] transition-colors text-center"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block bg-[#205c64] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#17434a] transition-colors text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
