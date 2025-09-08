import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginImage, logo } from "../../components/Img/ImportedImage";
import { User, Briefcase } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const LoginDashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const handleContinue = () => {
    if (selected === "individual") {
      navigate("/provider-registration");
    } else if (selected === "company") {
      navigate("/company-registration");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image */}
      <div
        className="w-1/2 bg-cover bg-center md:block hidden"
        style={{ backgroundImage: `url(${loginImage})` }}
      ></div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full bg-[#2B5F75] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md text-center">
          {/* Logo */}
          <div className="flex justify-center items-center py-5">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">Register as Provider</h2>
          <p className="text-gray-500 text-sm mb-6">
            Join Our Trusted Network of Caregivers & Creches
          </p>

          {/* Selection */}
          <p className="text-left text-gray-600 mb-3 font-medium">
            Select one of them :
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Individual Provider */}
            <button
              onClick={() => setSelected("individual")}
              className={`flex flex-col items-center justify-center border rounded-xl py-6 px-4 transition ${
                selected === "individual"
                  ? "border-[#2b5f75] bg-[#f0f9fb] shadow"
                  : "border-gray-300"
              }`}
            >
              <User className="w-10 h-10 mb-2 text-gray-600" />
              <span className="text-gray-700 font-medium">
                Individual Provider
              </span>
            </button>

            {/* Company Provider */}
            <button
              onClick={() => setSelected("company")}
              className={`flex flex-col items-center justify-center border rounded-xl py-6 px-4 transition ${
                selected === "company"
                  ? "border-[#2b5f75] bg-[#f0f9fb] shadow"
                  : "border-gray-300"
              }`}
            >
              <Briefcase className="w-10 h-10 mb-2 text-gray-600" />
              <span className="text-gray-700 font-medium">Company Provider</span>
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`w-full py-3 rounded-full text-white font-medium transition ${
              selected
                ? "bg-[#2b5f75] hover:bg-[#244e5e]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDashboard;
