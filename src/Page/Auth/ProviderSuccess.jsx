import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";


const ProviderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        {/* Success Icon */}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        {/* Success Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Registration Completed 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your provider registration is successfully completed.
        </p>

        {/* Next Step */}
        <p className="text-gray-700 mb-4">
          For a better experience, download and use our Android app:
        </p>

        {/* Play Store Download */}
        <a
          href="https://play.google.com/store" // <-- replace with your app link
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={"https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png?hl=hi"}
            alt="Download on Play Store"
            className="mx-auto h-12"
          />
        </a>

        {/* Back to Dashboard */}
        {/* <div className="mt-6">
          <Button
            onClick={() => navigate("/provider/dashboard")}
            className="bg-[#2d6a74] text-white hover:bg-[#24555d] px-6 py-2 rounded-lg"
          >
            Go to Dashboard
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ProviderSuccess;
