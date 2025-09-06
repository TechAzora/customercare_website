import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const menuItems = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Service", link: "/service" },
    // { id: 3, name: "Faqs", link: "/faqs" },
  ];

  const isLoggedIn = !!localStorage.getItem("accessToken"); // ✅ check token
  const [isSticky, setIsSticky] = useState(false);

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
      className={`w-full py-6 px-8  z-50 transition-all duration-300 ${
        isSticky ? "fixed top-0 bg-[#fff4ea] shadow-sm" : "relative  bg-[#fff4ea]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Center Menu */}
        <div className="flex-1 flex justify-center space-x-8 text-gray-700">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                ` transition-colors ${
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

        {/* Right Button */}
        <div className="md:absolute right-8">
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
      </div>
    </nav>
  );
}

export default Navbar;
