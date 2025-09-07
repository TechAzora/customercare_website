import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/ComponentsIndex";
import { Link, useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Edit2, Plus, Trash2, Calendar } from "lucide-react";

const Profile = () => {
    const server = "https://api.vittasarthi.com";
    const [profile, setProfile] = useState(null);
    const [family, setFamily] = useState([]);
    const [bookings, setBookings] = useState([]);   // ✅ new state for bookings
    const [loading, setLoading] = useState(false);
  console.log(bookings)
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        relation: "",
        note: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    // Fetch Profile
    const fetchProfile = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${server}/api/v1/customer/auth/getCustomerProfile`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) setProfile(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error("Error fetching profile");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Family Members
    const fetchFamily = async () => {
        try {
            const res = await axios.get(
                `${server}/api/v1/customer/familyMember/getFamilyMembers`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) setFamily(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Fetch Bookings
    const fetchBookings = async () => {
        try {
            const res = await axios.get(
                `${server}/api/v1/customer/booking/getCustomerBookings`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) setBookings(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error("Error fetching bookings");
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchFamily();
        fetchBookings(); // ✅ call bookings
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.success("Logged out successfully");
        setTimeout(() => navigate("/login"), 1000);
        window.location.reload(false);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // --- Family Modal handlers ---
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const openModal = (member = null) => {
        if (member) {
            setEditingMember(member);
            setFormData(member);
        } else {
            setEditingMember(null);
            setFormData({ name: "", gender: "", age: "", relation: "", note: "" });
        }
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            if (editingMember) {
                await axios.put(
                    `${server}/api/v1/customer/familyMember/updateFamilyMember/${editingMember.id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Family member updated successfully");
            } else {
                await axios.post(
                    `${server}/api/v1/customer/familyMember/createFamilyMember`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Family member added successfully");
            }
            setShowModal(false);
            fetchFamily();
        } catch (err) {
            console.error(err);
            toast.error("Error saving family member");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;
        try {
            await axios.delete(
                `${server}/api/v1/customer/familyMember/deleteFamilyMember/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Family member deleted successfully");
            fetchFamily();
        } catch (err) {
            console.error(err);
            toast.error("Error deleting family member");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg font-semibold text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
       <div className="bg-gray-50 flex flex-col">
  {/* Header */}
  <div className="bg-[#2d6a74] text-white flex justify-between items-center px-4 py-3 md:px-6 md:py-4 shadow">
    <h1 className="text-lg md:text-xl font-bold">My Profile</h1>
    <Button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base"
    >
      Logout
    </Button>
  </div>

  {/* Content */}
  <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6 max-w-6xl mx-auto w-full">
    {/* Left */}
    <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-full md:w-1/3 flex flex-col items-center">
      <img
        src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
        alt="Profile"
        className="w-24 h-24 md:w-40 md:h-40 object-cover rounded-xl mb-3 md:mb-4 border-2 md:border-4 border-gray-200"
      />
      <Link to="/update_profile">
        <button className="flex items-center gap-1 md:gap-2 text-[#2d6a74] font-medium text-sm md:text-base mb-4">
          <Edit2 size={16} className="md:w-5 md:h-5" /> Edit Image
        </button>
      </Link>
      <button
        onClick={() => openModal()}
        className="flex items-center gap-1 md:gap-2 border border-[#2d6a74] px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[#2d6a74] hover:bg-[#2d6a74] hover:text-white transition text-sm md:text-base"
      >
        <Plus size={16} className="md:w-5 md:h-5" /> Add Member
      </button>
    </div>

    {/* Right */}
    <div className="bg-white p-4 md:p-6 shadow-md rounded-xl w-full md:w-2/3 space-y-6 md:space-y-10">
      {/* Personal Info */}
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Personal Info</h2>
        {profile && (
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3 border rounded-lg p-2 md:p-3 text-sm md:text-base">
              <User size={18} className="text-gray-500" />
              <input type="text" disabled value={profile.name} className="w-full bg-transparent outline-none" />
            </div>
            <div className="flex items-center gap-2 md:gap-3 border rounded-lg p-2 md:p-3 text-sm md:text-base">
              <Calendar size={18} className="text-gray-500" />
              <input type="text" disabled value={formatDate(profile.dob) || ""} className="w-full bg-transparent outline-none" />
            </div>
            <div className="flex items-center gap-2 md:gap-3 border rounded-lg p-2 md:p-3 text-sm md:text-base">
              <MapPin size={18} className="text-gray-500" />
              <input type="text" disabled value={profile.address || ""} className="w-full bg-transparent outline-none" />
            </div>
          </div>
        )}
      </div>

      {/* Family Info */}
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Family Info</h2>
        {family.length === 0 ? (
          <p className="text-gray-500 text-sm md:text-base">No family members added yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            {family.map((member) => (
              <div
                key={member.id}
                className="p-3 md:p-4 border rounded-xl shadow-sm flex flex-col sm:flex-row gap-3 sm:items-start text-sm md:text-base"
              >
                <img
                  src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                  alt={member.name}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {member.relation} • {member.age} yrs • {member.gender}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">{member.note}</p>
                </div>
                <div className="flex gap-2 md:gap-3">
                  <button onClick={() => openModal(member)} className="text-primary hover:underline text-xs md:text-sm">Edit</button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:underline text-xs md:text-sm flex items-center gap-1">
                    <Trash2 size={12} className="md:w-4 md:h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bookings */}
      <div>
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-sm md:text-base">No bookings yet.</p>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {bookings.map((booking) => {
              const svc = booking.companySvc || booking.providerSvc;
              const svcName = svc?.service?.name || "Unknown Service";
              const providerName =
                booking.providerSvc?.provider?.provider?.name ||
                booking.companySvc?.company?.company?.companyName ||
                "N/A";

              return (
                <div key={booking.id} className="p-3 md:p-4 border rounded-xl shadow-sm flex flex-col sm:flex-row justify-between text-sm md:text-base">
                  <div>
                    <p className="font-semibold">{svcName}</p>
                    <p className="text-xs md:text-sm text-gray-600">Provider: {providerName}</p>
                    <p className="text-xs md:text-sm text-gray-500">From: {formatDate(booking.startDate)} → To: {formatDate(booking.endDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{booking.totalAmount}</p>
                    <p className={`text-xs ${booking.status === "PENDING" ? "text-yellow-600" : "text-green-600"}`}>
                      {booking.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </div>
</div>

    );
};

export default Profile;
