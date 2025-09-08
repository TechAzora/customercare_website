import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, BadgeCheck, Briefcase } from "lucide-react";
import { Button } from "../../components/ComponentsIndex";
import { useDispatch, useSelector } from "react-redux";
import { getProviderServices } from "../../ReduxToolkit/Slice/ProviderServicesSlice";

function ServiceProviderProfile() {
  const { id } = useParams(); // get id from URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { providerServices, status } = useSelector(
    (state) => state.providerServices
  );
  const dispatch = useDispatch();


  useEffect(() => {
    if (id) {
      dispatch(getProviderServices(id));
    }
  }, [dispatch, id]);

  console.log(providerServices)
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
      <div className="bg-white rounded p-6 flex flex-col items-center border-r">
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

        {/* <p className="text-gray-600 text-sm">Starting From</p>
        <p className="text-2xl font-bold">₹450/day</p> */}


        <Button> <Link to={`/booking/${profile.id}`}>
          Book Now
        </Link> </Button>
      </div>

      {/* Right Overview */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 border">

        <h3 className="text-2xl font-semibold mb-6">Overview</h3>
        <hr />
        {/* About */}
        <div className="mb-6">
          <h4 className="font-semibold mt-5">About</h4>

          <p className="text-gray-700">
            {profile.about ||
              `${profile.name} is a dedicated healthcare professional.`}
          </p>
        </div>

        {/* Experience */}
        <h4 className="font-semibold mb-2">Experince</h4>
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
                className="px-3 py-1 rounded-full border text-sm text-primary bg-[#2B5F7526]"
              >
                {skillItem.skill?.name}
              </span>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Services</h4>
          <hr />
          <div className="">
            <h3 className="font-semibold text-gray-700 my-3">Available Services</h3>

            <div className="space-y-3">
              {providerServices.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-xl p-3 bg-white shadow-sm"
                >
                  {/* Left side: Icon + Name + Category */}
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
                        {item.service?.description || "No category"}
                      </p>
                    </div>
                  </div>

                  {/* Right side: Price */}
                  <div className="text-right font-semibold text-lg">
                    ₹{item.pricePerDay}/day
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ServiceProviderProfile;
