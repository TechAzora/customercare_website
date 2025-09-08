import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, BadgeCheck, Briefcase, MapPin, Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyProviderService } from "../../ReduxToolkit/Slice/CompanyProviderServices";

function CompanyServiceProviderProfile() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { CompanyProviderServices } = useSelector(
    (state) => state.CompanyProviderService
  );
  const dispatch = useDispatch();

  // Fetch services
  useEffect(() => {
    if (id) {
      dispatch(getCompanyProviderService(id));
    }
  }, [dispatch, id]);

  // Fetch company profile
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

        <button className="mt-6 bg-[#2B5F75] text-white w-full py-2 rounded-2xl hover:bg-[#24555d]">
          <Link to={`/company-service-booking/${company.id}`}>Book Now</Link>
        </button>
      </div>

      {/* Right Overview */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 border">
        <h3 className="text-2xl font-semibold mb-6">Company Overview</h3>
        <hr />

        {/* About */}
        <div className="mb-6 mt-6">
          <h4 className="font-semibold mb-2">About</h4>
          <p className="text-gray-700">
            {company.about ||
              `${company.companyName} is a trusted healthcare service provider.`}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 border rounded-lg p-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>{company.email || "Not provided"}</span>
          </div>

          <div className="flex items-center gap-3 border rounded-lg p-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>
              {company.address ? `${company.address}, ${company.pincode}` : "Address not available"}
            </span>
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

        {/* Services */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Services</h4>
          <hr />
          <div className="mt-4">
            {CompanyProviderServices && CompanyProviderServices.length > 0 ? (
              <div className="space-y-3">
                {CompanyProviderServices.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-xl p-3 bg-white shadow-sm"
                  >
                    {/* Left: Icon + Name + Description */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                        {/* Bag Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 7.5l.525-1.05a1.125 1.125 0 011.012-.618h7.426c.436 0 .832.247 1.012.618l.525 1.05M6.75 7.5h10.5M6.75 7.5A2.25 2.25 0 004.5 9.75v7.5A2.25 2.25 0 006.75 19.5h10.5a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0017.25 7.5M9 12h6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">{item.service?.name || "Unnamed Service"}</p>
                        <p className="text-sm text-gray-500">
                          {item.service?.description || "No description"}
                        </p>
                      </div>
                    </div>

                    {/* Right: Price */}
                    <div className="text-right font-semibold text-lg">
                      ₹{item.pricePerDay}/day
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No services available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyServiceProviderProfile;
