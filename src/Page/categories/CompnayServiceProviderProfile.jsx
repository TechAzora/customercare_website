import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, BadgeCheck, Briefcase, MapPin, Mail } from "lucide-react";

function CompanyServiceProviderProfile() {
  const { id } = useParams(); // get id from URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(
          `https://api.vittasarthi.com/api/v1/company/auth/getCompanyProfileByID/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setCompany(data.data);
        } else {
          setError("Failed to fetch company profile");
        }
      } catch (err) {
        setError("Something went wrong while fetching company profile");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading company profile...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Company Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border">
        <img
          src={
            company.companyLogo ||
            "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
          }
          alt={company.companyName}
          className="w-40 h-40 rounded-2xl object-cover mb-4"
        />
        <h2 className="text-xl font-semibold flex items-center gap-1">
          {company.companyName}
          <BadgeCheck className="w-5 h-5 text-blue-500" />
        </h2>

        <span className="mt-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-600 flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> Active
        </span>

        <div className="w-full border-t my-6"></div>

        {/* <p className="text-gray-600 text-sm">Starting From</p>
        <p className="text-2xl font-bold">₹450/day</p> */}

        <button className="mt-6 bg-[#2d6a74] text-white w-full py-2 rounded-2xl hover:bg-[#24555d]">
          <Link to={`/company-service-booking/${company.id}`}>Book Now</Link>
        </button>
      </div>

      {/* Right Overview */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 border">
        <h3 className="text-2xl font-semibold mb-6">Company Overview</h3>

        {/* About */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">About</h4>
          <p className="text-gray-700">
            {company.about ||
              `${company.companyName} is a trusted healthcare service provider.`}
          </p>
        </div>

        {/* Company Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 border rounded-lg p-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>{company.email}</span>
          </div>

          <div className="flex items-center gap-3 border rounded-lg p-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>{company.address}, {company.pincode}</span>
          </div>
        </div>

        {/* Experience (Static for now) */}
        <div className="mb-6 border rounded-xl p-4 flex items-start gap-3">
          <Briefcase className="w-6 h-6 text-gray-600 mt-1" />
          <div>
            <p className="font-medium">10+ years of excellence</p>
            <p className="text-sm text-gray-600">
              Delivering quality healthcare and caregiving services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyServiceProviderProfile;
