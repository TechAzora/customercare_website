import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, BadgeCheck, Briefcase } from "lucide-react";

function ServiceProviderProfile() {
  const { id } = useParams(); // get id from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://api.vittasarthi.com/api/v1/provider/auth/getProviderProfileById/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setProfile(data.data);
        } else {
          setError("Failed to fetch provider profile");
        }
      } catch (err) {
        setError("Something went wrong while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading profile...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Profile Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border">
        <img
          src={profile.profileImage || "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"}
          alt={profile.name}
          className="w-40 h-40 rounded-2xl object-cover mb-4"
        />
        <h2 className="text-xl font-semibold flex items-center gap-1">
          {profile.name}
          <BadgeCheck className="w-5 h-5 text-blue-500" />
        </h2>
        <span className="mt-2 px-3 py-1 rounded-full text-sm bg-green-100 text-green-600 flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> Available
        </span>

        <div className="w-full border-t my-6"></div>

        <p className="text-gray-600 text-sm">Starting From</p>
        <p className="text-2xl font-bold">₹450/day</p>

             <button className="mt-6 bg-[#2d6a74] text-white w-full py-2 rounded-2xl hover:bg-[#24555d]"> <Link to={`/booking/${profile.id}`}> 
                  Book Now
              </Link> </button>
      </div>

      {/* Right Overview */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 border">
        <h3 className="text-2xl font-semibold mb-6">Overview</h3>

        {/* About */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">About</h4>
          <p className="text-gray-700">
            {profile.about ||
              `${profile.name} is a dedicated healthcare professional.`}
          </p>
        </div>

        {/* Experience */}
        <div className="mb-6 border rounded-xl p-4 flex items-start gap-3">
          <Briefcase className="w-6 h-6 text-gray-600 mt-1" />
          <div>
            <p className="font-medium">8 years of experience</p>
            <p className="text-sm text-gray-600">
              Professional caregiving service
            </p>
          </div>
        </div>

        {/* Certification */}
        {profile.certification && (
          <div className="mb-6 border rounded-xl p-4 flex items-start gap-3">
            <BadgeCheck className="w-6 h-6 text-gray-600 mt-1" />
            <div>
              <p className="font-medium">{profile.certification}</p>
            </div>
          </div>
        )}

        {/* Skills */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.providerSkill?.map((skillItem) => (
              <span
                key={skillItem.id}
                className="px-3 py-1 rounded-full border text-sm text-gray-700 bg-gray-50"
              >
                {skillItem.skill?.name}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xl font-semibold">Services</h4>
          <p className="text-gray-500 text-sm mt-2">
            Services offered will be listed here...
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderProfile;
