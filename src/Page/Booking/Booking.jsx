import React, { useState, useEffect } from "react";
import CommanBanner from "../../components/Banners/CommanBanner";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getProviderServices } from "../../ReduxToolkit/Slice/ProviderServicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, ButtonWhite } from "../../components/ComponentsIndex";

function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { providerServices, status } = useSelector(
        (state) => state.providerServices
    );
    const dispatch = useDispatch();


    useEffect(() => {
        if (id) {
            dispatch(getProviderServices(id));
        }
    }, [dispatch, id]);


    const [family, setFamily] = useState([]);
    const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const token = localStorage.getItem("accessToken");
    const server = "https://api.vittasarthi.com";

    const [bookingData, setBookingData] = useState({
        familyMemberId: "",
        companySvcId: "",
        startDate: "",
        endDate: "",
        // serviceName: "",
        // price: 0,
    });

    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        relation: "",
        note: "",
    });

    const canProceedToNext = () => {
        switch (step) {
            case 1:
                return bookingData.companySvcId !== "";
            case 2:
                return bookingData.startDate !== "" && bookingData.endDate !== "";
            case 3:
                return bookingData.familyMemberId !== "";
            case 4:
                return true;
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (canProceedToNext()) {
            setStep((prev) => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const calculateTotal = () => {
        if (!bookingData.startDate || !bookingData.endDate || !bookingData.price) {
            return { days: 0, total: 0 };
        }

        const start = new Date(bookingData.startDate);
        const end = new Date(bookingData.endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

        return {
            days: days > 0 ? days : 0,
            total: days > 0 ? days * bookingData.price : 0
        };
    };

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
            alert("Error fetching profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchFamily = async () => {
            if (step === 3) {
                try {
                    const response = await axios.get(
                        `${server}/api/v1/customer/familyMember/getFamilyMembers`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setFamily(response.data?.data || []);
                } catch (err) {
                    console.error("Error fetching family members:", err);
                }
            }
        };
        fetchFamily();
    }, [step]);

    const handleAddFamilyMember = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${server}/api/v1/customer/familyMember/createFamilyMember`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                const familyResponse = await axios.get(
                    `${server}/api/v1/customer/familyMember/getFamilyMembers`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setFamily(familyResponse.data?.data || []);

                setFormData({
                    name: "",
                    gender: "",
                    age: "",
                    relation: "",
                    note: "",
                });
                setShowAddFamilyModal(false);
                alert("Family member added successfully!");
            }
        } catch (err) {
            console.error("Error adding family member:", err);
            alert("Error adding family member. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
                const checkRazorpay = () => {
                    if (window.Razorpay) {
                        resolve(true);
                    } else {
                        setTimeout(checkRazorpay, 100);
                    }
                };
                checkRazorpay();
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => {
                console.log("Razorpay script loaded");
                resolve(true);
            };
            script.onerror = (error) => {
                console.error("Razorpay script failed to load:", error);
                resolve(false);
            };
            document.head.appendChild(script);
        });
    };


    const handleBooking = async () => {
        // Show loading spinner
        setPaymentLoading(true);

        try {
            const { total } = calculateTotal();

            if (!total || total <= 0) {
                alert("Invalid booking amount. Please check your booking details.");
                setPaymentLoading(false);
                return;
            }

            const res = await loadRazorpayScript();
            if (!res) {
                alert("Razorpay SDK failed to load. Check your internet.");
                setPaymentLoading(false);
                return;
            }

            // Step 1: Create Razorpay order
            const orderRes = await axios.post(
                `${server}/api/v1/customer/booking/createRazorpayOrder`,
                {
                    amount: total * 100, // paisa
                    // currency: "INR",
                }
            );

            const { id: order_id, amount, currency } = orderRes.data;

            // Step 2: Open Razorpay checkout
            const options = {
                  key: "rzp_test_03ADIbjtraoMGJ",
                // key: "rzp_live_JvkjF5eE8Pz7NR",
                amount: total * 100,
                currency,
                name: "careconnect",
                description: `${bookingData.serviceName} - ${calculateTotal().days} days`,
                order_id,
                handler: async function (paymentResponse) {
                    console.log("Payment Success:", paymentResponse);

                    try {
                        // ✅ Step 3: Add money to wallet
                        const walletPayload = {
                            amount: total, // in rupees
                            description: "Initial top-up",
                        };

                        const walletRes = await axios.patch(
                            `${server}/api/v1/customer/wallet/addMoney`,
                            walletPayload,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        console.log("Wallet API Response:", walletRes.data);

                        // ✅ Step 4: Create booking after wallet success
                        const bookingPayload = {
                            familyMemberId: bookingData.familyMemberId,
                            providerSvcId: bookingData.companySvcId, // ✅ correct field
                            startDate: bookingData.startDate,
                            endDate: bookingData.endDate,
                            // If backend requires payment details, uncomment these:
                            // razorpayPaymentId: paymentResponse.razorpay_payment_id,
                            // razorpayOrderId: paymentResponse.razorpay_order_id,
                            // razorpaySignature: paymentResponse.razorpay_signature,
                        };

                        const bookingRes = await axios.post(
                            `${server}/api/v1/customer/booking/createBookingRequest`,
                            bookingPayload,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        console.log("Booking API Response:", bookingRes.data);

                        // ✅ Step 5: Show success
                        setStep(5);
                        toast.success("Booking created successfully!");
                    } catch (apiError) {
                        console.error("Booking flow error:", apiError.response?.data || apiError.message);
                        alert("Payment successful, but booking/wallet update failed.");
                    } finally {
                        setPaymentLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log("Payment modal closed");
                        setPaymentLoading(false);
                    },
                },
                prefill: {
                    name: profile?.name || "Customer",
                    email: profile?.email || "customer@example.com",
                    contact: profile?.phone || "9876543210",
                },
                theme: { color: "#2b5f75" },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function (response) {
                console.error("Payment failed:", response.error);
                alert(`Payment failed: ${response.error.description}`);
                setPaymentLoading(false);
            });

            rzp.open();
        } catch (error) {
            console.error("Booking error:", error);
            alert("Something went wrong. Please try again.");
            setPaymentLoading(false);
        }
    };


    const getSelectedFamilyMember = () => {
        return family.find(member => member.id === bookingData.familyMemberId);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <>
            <CommanBanner heading={"Booking"} />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">

                {/* Progress Bar */}
                {step <= 4 && (
                    <div className="flex items-center justify-between mb-6">
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`flex-1 h-2 mx-1 rounded-full ${step >= s ? "bg-[#2B5F75]" : "bg-gray-300"
                                    }`}
                            ></div>
                        ))}
                    </div>
                )}
                {/* steps */}
                {step <= 4 && (
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
                        <span className="text-sm font-medium text-gray-800">
                            {step === 1 && "Service Selection"}
                            {step === 2 && "Select Dates"}
                            {step === 3 && "Assign Family Member"}
                            {step === 4 && "Review & Confirm"}
                        </span>
                    </div>
                )}

                {/* Step 1: Select Service */}
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Select Service</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {providerServices.map((svc) => (
                                <div
                                    key={svc.serviceId}
                                    onClick={() =>
                                        setBookingData({
                                            ...bookingData,
                                            companySvcId: svc.id, // provider service id
                                            serviceName: svc.service.name, // nested name
                                            price: svc.pricePerDay, // use pricePerDay
                                        })
                                    }
                                    className={`p-4 border rounded-xl text-left cursor-pointer transition-all ${bookingData.companySvcId === svc.id
                                        ? "border-[#2B5F75]"
                                        : "hover:border-[#2B5F75]"
                                        }`}
                                >   <p className="bi bi-briefcase"></p>
                                    <p className="text-sm">{svc.service.name}</p>
                                    <p className="font-semibold text-[#2B5F75] mt-2 text-lg">
                                        ₹{svc.pricePerDay}/Day
                                    </p>
                                </div>
                            ))}
                        </div>

                        {!canProceedToNext() && (
                            <p className="text-red-500 text-sm mt-2">
                                Please select a service to continue
                            </p>
                        )}
                    </div>
                )}


                {/* Step 2: Dates */}
                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Select Dates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Start Date</label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full border rounded-lg p-2"
                                    value={bookingData.startDate}
                                    onChange={(e) =>
                                        setBookingData({ ...bookingData, startDate: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <input
                                    type="date"
                                    min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                                    className="w-full border rounded-lg p-2"
                                    value={bookingData.endDate}
                                    onChange={(e) =>
                                        setBookingData({ ...bookingData, endDate: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        {bookingData.startDate && bookingData.endDate && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm">
                                    Duration: <strong>{calculateTotal().days} days</strong>
                                </p>
                                <p className="text-sm">
                                    Estimated Cost: <strong>₹{calculateTotal().total}</strong>
                                </p>
                            </div>
                        )}
                        {!canProceedToNext() && (
                            <p className="text-red-500 text-sm mt-2">Please select both start and end dates</p>
                        )}
                    </div>
                )}

                {/* Step 3: Family Member */}
                {step === 3 && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Assign Family Member</h2>


                            <ButtonWhite children={" Add Family Member"} icon="plus" onClick={() => setShowAddFamilyModal(true)} />
                        </div>

                        {family.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">No family members found.</p>
                                <p className="text-sm text-gray-400">Please add a family member to continue with booking.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {family.map((member) => (
                                    <div
                                        key={member.id}
                                        onClick={() =>
                                            setBookingData({
                                                ...bookingData,
                                                familyMemberId: member.id,
                                            })
                                        }
                                        className={`p-4 border rounded-2xl cursor-pointer transition-all shadow-sm ${bookingData.familyMemberId === member.id
                                            ? "border-[#2B5F75] "
                                            : "hover:border-[#2B5F75]"
                                            }`}
                                    >
                                        {/* Top Section */}
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    member.image ||
                                                    "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                                                }
                                                alt={member.name}
                                                className="w-14 h-14 rounded-full border-1 border-primary"
                                            />
                                            <div>
                                                <p className="font-semibold text-lg">{member.name}</p>
                                                <p className="text-sm text-gray-500 capitalize flex items-center gap-2">
                                                    {member.relation} <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span> {member.age}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Note Section */}
                                        {member.note && (
                                            <p className="text-sm text-gray-500 mt-3">{member.note}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                        )}

                        {!canProceedToNext() && family.length > 0 && (
                            <p className="text-red-500 text-sm mt-2">Please select a family member</p>
                        )}
                    </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-xl bg-white">
                                {/* Heading with icon */}
                                <div className="flex items-center gap-2 mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 7.5l.525-1.05a1.125 1.125 0 011.012-.618h7.426c.436 0 .832.247 1.012.618l.525 1.05M6.75 7.5h10.5M6.75 7.5A2.25 2.25 0 004.5 9.75v7.5A2.25 2.25 0 006.75 19.5h10.5a2.25 2.25 0 002.25-2.25v-7.5A2.25 2.25 0 0017.25 7.5M9 12h6"
                                        />
                                    </svg>
                                    <h3 className="font-semibold">Service Details</h3>
                                </div>

                                {/* Details */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service Type</span>
                                        <span className="font-medium">{bookingData.serviceName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration</span>
                                        <span className="font-medium">{calculateTotal().days} Days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date</span>
                                        <span className="font-medium">
                                            {new Date(bookingData.startDate).toLocaleDateString()} –{" "}
                                            {new Date(bookingData.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {/* <div className="flex justify-between">
                                        <span className="text-gray-600">Time</span>
                                        <span className="font-medium">{bookingData.time || "10:00 am"}</span>
                                    </div> */}
                                    {/* <div className="flex justify-between">
                                        <span className="text-gray-600">Family Member</span>
                                        <span className="font-medium">
                                            {bookingData.familyMemberName || "Arjun Sharma"}
                                        </span>
                                    </div> */}
                                </div>
                            </div>



                            <div className="p-4 border rounded-3xl">
                                <h3 className="font-semibold mb-3">Patient Details</h3>
                                {getSelectedFamilyMember() && (
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                                            alt={getSelectedFamilyMember().name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <p className="font-medium">{getSelectedFamilyMember().name}</p>
                                            <p className="text-xs text-gray-500">
                                                {getSelectedFamilyMember().relation} • {getSelectedFamilyMember().age} yrs • {getSelectedFamilyMember().gender}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border border-[#2B5F75] rounded-3xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total Amount:</span>
                                    <span className="text-2xl font-bold text-[#2B5F75]">₹{calculateTotal().total}</span>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    ({calculateTotal().days} days × ₹{bookingData.price})
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                    <div className="text-center py-8">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">
                            🎉 Booking Successful!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Your booking has been confirmed and payment received.
                        </p>
                        <button
                            onClick={() => navigate('/profile')}
                            className="px-6 py-2 bg-[#2B5F75] text-white rounded-full"
                        >
                            View My Bookings
                        </button>
                    </div>
                )}

                {/* Navigation Buttons */}
                {step <= 4 && (
                    <div className="flex mt-8 gap-4">
                        <button
                            onClick={prevStep}
                            disabled={step === 1 || paymentLoading}
                            className="w-1/2 px-6 py-3 border rounded-full text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        <button
                            onClick={step === 4 ? handleBooking : nextStep}
                            disabled={!canProceedToNext() || paymentLoading}
                            className={`w-1/2 px-6 py-3 rounded-full flex items-center justify-center gap-2 ${canProceedToNext() && !paymentLoading
                                ? "bg-[#2B5F75] text-white hover:bg-teal-800"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {paymentLoading && step === 4 && (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            )}
                            {step === 4
                                ? paymentLoading
                                    ? "Processing Payment..."
                                    : "Confirm & Pay"
                                : "Continue"}
                        </button>
                    </div>
                )}
            </div>

            {/* Add Family Member Modal */}
            {showAddFamilyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add Family Member</h3>
                            <button
                                onClick={() => setShowAddFamilyModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddFamilyMember} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border rounded-lg p-2"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Gender *</label>
                                <select
                                    required
                                    className="w-full border rounded-lg p-2"
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Age *</label>
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    max="120"
                                    className="w-full border rounded-lg p-2"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Relation *</label>
                                <select
                                    required
                                    className="w-full border rounded-lg p-2"
                                    value={formData.relation}
                                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                                >
                                    <option value="">Select Relation</option>
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Son">Son</option>
                                    <option value="Daughter">Daughter</option>
                                    <option value="Brother">Brother</option>
                                    <option value="Sister">Sister</option>
                                    <option value="Grandfather">Grandfather</option>
                                    <option value="Grandmother">Grandmother</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Additional Notes</label>
                                <textarea
                                    className="w-full border rounded-lg p-2 h-20 resize-none"
                                    value={formData.note}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                    placeholder="Any additional information..."
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                {/* <button
                                    type="button"
                                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                                >

                                </button> */}
                                <ButtonWhite onClick={() => setShowAddFamilyModal(false)} disabled={loading} children={"Cancel"}

                                />
                                {/* <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#2B5F75] text-white rounded-lg hover:bg-teal-800 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    
                                </button> */}
                                <Button type="submit">{loading ? "Adding..." : "Add Member"}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookingPage;