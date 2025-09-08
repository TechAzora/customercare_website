import React , { useState,useEffect } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation, useNavigate } from "react-router-dom";
import CommanBanner from "../../components/Banners/CommanBanner";

const UpdateProfile = () => {
  const server = "https://api.vittasarthi.com";
  const navigate = useNavigate();
  const location = useLocation();

  // Get profile from state (passed from Link)
  const profile = location.state?.profile;
 console.log(profile)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    pincode: "",
  });

 useEffect(() => {
  if (profile) {
    setFormData({
      name: profile.name || "",
      email: profile.email || "",
      gender: profile.gender || "",
      dob: profile.dob ? profile.dob.split("T")[0] : "", 
      address: profile.address || "",
      pincode: profile.pincode || "",
    });
  }
}, [profile]);


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.put(
        `${server}/api/v1/customer/auth/completeCustomerProfile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully 🎉");
        navigate("/profile");
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <CommanBanner heading={"Update Profile"}/>
   
    <div className="flex justify-center items-center  bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-6 text-center text-[#2d6a74]">
         Update Details
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 col-span-2"
          />
{/*  */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 col-span-2"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 col-span-2"
          >
            <option value="defalut">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

        <input
  required
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleChange}
  className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 col-span-2"
/>


          <input
          required
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 col-span-2"
          />

          {/* <input
            type="text"
            name="countryId"
            value={formData.countryId}
            onChange={handleChange}
            placeholder="Country ID"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            name="stateId"
            value={formData.stateId}
            onChange={handleChange}
            placeholder="State ID"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
          /> */}

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className={`col-span-2 py-3 rounded-full text-white font-semibold shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2d6a74] hover:bg-[#24555d]"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
     </>
  );
};

export default UpdateProfile;
