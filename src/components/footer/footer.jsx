import React from "react";
import { Link, useLocation } from "react-router-dom";
import { linkedin, facebook, instagram, logo } from "../Img/ImportedImage";

const Footer = () => {
  const location = useLocation();

  const isCartPage =
    ["/product", "/Categories"].includes(location.pathname) ||
    location.pathname.startsWith("/order-Details/");

  if (isCartPage) return null;

  return (
    <footer className="bg-gray-50 text-gray-800 pt-10 px-6 md:px-12 lg:px-20 font-inter mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Logo + Description (Half Width) */}
        <div>
          <div className="flex-shrink-0 mb-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md">
            This service is developed with the support of the Mission for Urban
            Poverty Alleviation and the United Nations Development Programme (UNDP). 
            Together, we aim to provide accessible, reliable, and dignified childcare 
            and eldercare solutions that empower families, support caregivers, and 
            strengthen inclusive urban communities.
          </p>
        </div>

        {/* Customers + Providers (Half Width, Split Inside) */}
       <div className="grid grid-cols-2 gap-10 justify-start text-left">
  {/* Customers */}
  <div>
    <h4 className="text-black font-semibold mb-3">Customers</h4>
    <ul className="space-y-2 text-sm">
      <li>
       <Link to="/login" className="hover:underline">
          Sign Up
        </Link>
      </li>
     
      <li>
        <Link to="/service" className="hover:underline">
          Book a Service
        </Link>
      </li>
    </ul>
  </div>

  {/* Providers */}
  <div>
    <h4 className="text-black font-semibold mb-3">Providers</h4>
    <ul className="space-y-2 text-sm">
     
       <li>
        <Link to="/login-dashboard" className="hover:underline">
           Registration
        </Link>
      </li>
    </ul>
  </div>
</div>

      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>Powered by Access Assist | Made in India</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
            aria-label="Twitter / X"
          >
            <span className="text-lg font-bold">𝕏</span>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
            aria-label="Facebook"
          >
            <img src={facebook} alt="Facebook" className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
            aria-label="Instagram"
          >
            <img src={instagram} alt="Instagram" className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
            aria-label="LinkedIn"
          >
            <img src={linkedin} alt="LinkedIn" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
