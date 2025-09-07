import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../../components/ComponentsIndex";
import { Link, useNavigate } from "react-router-dom";
import { User, Phone, MapPin, Edit2, Plus, Trash2, Calendar } from "lucide-react";

const Profile = () => {
    const server = "http://139.59.16.89";
    const [profile, setProfile] = useState(null);
    const [family, setFamily] = useState([]);
    const [loading, setLoading] = useState(false);

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
    console.log(token)
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

    useEffect(() => {
        fetchProfile();
        fetchFamily();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.success("Logged out successfully");
        setTimeout(() => navigate("/login"), 1000);
        window.location.reload(false)

    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateStr).toLocaleDateString("en-GB", options);
    };

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Open modal
    const openModal = (member = null) => {
        if (member) {
            setEditingMember(member);
            setFormData(member);
        } else {
            setEditingMember(null);
            setFormData({
                name: "",
                gender: "",
                age: "",
                relation: "",
                note: "",
            });
        }
        setShowModal(true);
    };

    // Create or Update
    const handleSave = async () => {
        try {
            if (editingMember) {
                // Update
                await axios.put(
                    `${server}/api/v1/customer/familyMember/updateFamilyMember/${editingMember.id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Family member updated successfully");
            } else {
                // Create
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

    // Delete
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
                <p className="text-lg font-semibold text-gray-600">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className=" bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-[#2d6a74] text-white flex justify-between items-center px-6 py-4 shadow">
                <h1 className="text-xl font-bold">My Profile</h1>
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-8 p-6 max-w-6xl mx-auto w-full">
                {/* Left - Image + Add Member */}
                <div className="bg-white p-6 shadow-md rounded-xl w-full md:w-1/3 flex flex-col items-center">
                    <img
                        src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                        alt="Profile"
                        className="w-40 h-40 object-cover rounded-xl mb-4 border-4 border-gray-200"
                    />
                    <Link to="/update_profile">
                        <button className="flex items-center gap-2 text-[#2d6a74] font-medium mb-6">
                            <Edit2 size={18} /> Edit Image
                        </button>
                    </Link>

                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 border border-[#2d6a74] px-6 py-2 rounded-full text-[#2d6a74] hover:bg-[#2d6a74] hover:text-white transition"
                    >
                        <Plus size={18} /> Add Member
                    </button>
                </div>

                {/* Right - Info */}
                <div className="bg-white p-6 shadow-md rounded-xl w-full md:w-2/3">
                    {/* Personal Info */}
                    <h2 className="text-xl font-bold mb-4">Personal Info</h2>
                    {profile && (
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 border rounded-lg p-3">
                                <User size={20} className="text-gray-500" />
                                <input
                                    type="text"
                                    disabled
                                    value={profile.name}
                                    className="w-full bg-transparent outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 border rounded-lg p-3">
                                <Calendar size={20} className="text-gray-500" />
                                <input
                                    type="text"
                                    disabled
                                    value={formatDate(profile.dob) || ""}
                                    className="w-full bg-transparent outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 border rounded-lg p-3">
                                <MapPin size={20} className="text-gray-500" />
                                <input
                                    type="text"
                                    disabled
                                    value={profile.address || ""}
                                    className="w-full bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* Family Info */}
                    <h2 className="text-xl font-bold mb-4">Family Info</h2>
                    <div className="space-y-4">
                        {family.length === 0 ? (
                            <p className="text-gray-500 text-center sm:text-left">
                                No family members added yet.
                            </p>
                        ) : (
                            family.map((member) => (
                                <div
                                    key={member.id}
                                    className="p-4 border rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 sm:items-start"
                                >
                                    {/* Avatar */}
                                    <img
                                        src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                                        alt={member.name}
                                        className="w-20 h-20 sm:w-14 sm:h-14 rounded-full object-cover mx-auto sm:mx-0"
                                    />

                                    {/* Member details */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <p className="font-semibold">{member.name}</p>
                                        <p className="text-sm text-gray-600">
                                            <span className="capitalize text-primary"> {member.relation}</span> • {member.age} yrs • {member.gender}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">{member.note}</p>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex justify-center sm:justify-end gap-3">
                                        <button
                                            onClick={() => openModal(member)}
                                            className="text-primary hover:underline text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            className="text-red-500 hover:underline text-sm flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {editingMember ? "Edit Family Member" : "Add Family Member"}
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full border rounded p-2"
                            >
                                <option value="defalut">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="text"
                                name="relation"
                                placeholder="Relation"
                                value={formData.relation}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                            <textarea
                                name="note"
                                placeholder="Note"
                                value={formData.note}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded bg-[#2d6a74] text-white hover:bg-[#1f4b52]"
                            >
                                {editingMember ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Profile;
