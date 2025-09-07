import React, { useState, useEffect } from "react";
import CommanBanner from "../../components/Banners/CommanBanner";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getProviderServices } from "../../ReduxToolkit/Slice/ProviderServicesSlice";
import { useDispatch, useSelector } from "react-redux";

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
    console.log(token)
    const server = "http://139.59.16.89";

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
        // Set loading state immediately when button is clicked
        setPaymentLoading(true);
        
        try {
            const { total } = calculateTotal();
            
            // Debug: Log the total amount
            console.log("Calculated total amount:", total);
            
            // Validate amount before proceeding
            if (!total || total <= 0) {
                alert("Invalid booking amount. Please check your booking details.");
                return;
            }

            const res = await loadRazorpayScript();
            if (!res) {
                alert("Razorpay SDK failed to load. Check your internet.");
                return;
            }

            // Step 1: Create order on backend
            const orderRes = await axios.post(
                "https://stayvilmaris-backend.vercel.app/api/v1/stayvilmaris/payment/createRazorpay",
                {
                    amount: total * 100, // Convert to paisa
                    currency: "INR",
                }
            );

            console.log("Order creation response:", orderRes.data);
            const { id: order_id, amount, currency } = orderRes.data;
              console.log("amount" ,amount)
            // Step 2: Open Razorpay checkout
            const options = {
                key: "rzp_test_03ADIbjtraoMGJ",
                amount: total * 100, // This should be in paisa from backend
                currency: currency,
                name: "Elder Care Services",
                description: `${bookingData.serviceName} - ${calculateTotal().days} days`,
                order_id: order_id,
                handler: async function (paymentResponse) {
                    console.log("Payment Success:", paymentResponse);

                    try {
                        // Keep loading state during booking API call
                        const bookingRes = await axios.post(
                            `${server}/api/v1/customer/booking/createBookingRequest`,
                            {
                                familyMemberId: bookingData.familyMemberId,
                                // providerSvcId: id,
                                providerSvcId: bookingData.companySvcId,
                                startDate: bookingData.startDate,
                                endDate: bookingData.endDate,
                                // razorpayPaymentId: paymentResponse.razorpay_payment_id,
                                // razorpayOrderId: paymentResponse.razorpay_order_id,
                                // razorpaySignature: paymentResponse.razorpay_signature,
                            },
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            }
                        );

                        console.log("Booking API Response:", bookingRes.data);
                        setStep(5);
                    } catch (apiError) {
                        console.error("Booking API error:", apiError);
                        alert("Payment successful but booking registration failed. Please contact support.");
                    } finally {
                        setPaymentLoading(false);
                    }
                },
                modal: {
                    ondismiss: function() {
                        console.log("Payment modal closed");
                        setPaymentLoading(false);
                    }
                },
                prefill: {
                    name: profile?.name || "Customer",
                    email: profile?.email || "customer@example.com",
                    contact: profile?.phone || "9876543210",
                },
                theme: { color: "#205c64" },
            };

            const rzp = new window.Razorpay(options);
            
            // Handle payment failure
            rzp.on('payment.failed', function (response) {
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
                                className={`flex-1 h-2 mx-1 rounded-full ${
                                    step >= s ? "bg-teal-700" : "bg-gray-300"
                                }`}
                            ></div>
                        ))}
                    </div>
                )}

                {/* Step 1: Select Service */}
               {step === 1 && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Select Service</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {providerServices.map((svc) => (
        <div
          key={svc.serviceId}
          onClick={() =>
            setBookingData({
              ...bookingData,
              companySvcId: svc.serviceId, // provider service id
              serviceName: svc.service.name, // nested name
              price: svc.pricePerDay, // use pricePerDay
            })
          }
          className={`p-4 border rounded-xl text-center cursor-pointer transition-all ${
            bookingData.companySvcId === svc.serviceId
              ? "border-teal-700 bg-teal-50"
              : "hover:border-teal-700"
          }`}
        >
          <p className="text-sm">{svc.service.name}</p>
          <p className="font-semibold text-teal-700 mt-2">
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
                            <button
                                onClick={() => setShowAddFamilyModal(true)}
                                className="px-4 py-2 bg-teal-700 text-white rounded-full text-sm"
                            >
                                ➕ Add Family Member
                            </button>
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
                                        className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                                            bookingData.familyMemberId === member.id
                                                ? "border-teal-700 bg-teal-50"
                                                : "hover:border-teal-700"
                                        }`}
                                    >
                                        <img
                                            src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">{member.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {member.relation} • {member.age} yrs • {member.gender}
                                            </p>
                                        </div>
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
                            <div className="p-4 border rounded-lg bg-gray-50">
                                <h3 className="font-semibold mb-3">Booking Summary</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p><strong>Service:</strong> {bookingData.serviceName}</p>
                                        <p><strong>Rate:</strong> ₹{bookingData.price}/day</p>
                                    </div>
                                    <div>
                                        <p><strong>Start Date:</strong> {new Date(bookingData.startDate).toLocaleDateString()}</p>
                                        <p><strong>End Date:</strong> {new Date(bookingData.endDate).toLocaleDateString()}</p>
                                        <p><strong>Duration:</strong> {calculateTotal().days} days</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border rounded-lg bg-gray-50">
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

                            <div className="p-4 border-2 border-teal-700 rounded-lg bg-teal-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total Amount:</span>
                                    <span className="text-2xl font-bold text-teal-700">₹{calculateTotal().total}</span>
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
                            onClick={() => navigate('/bookings')}
                            className="px-6 py-2 bg-teal-700 text-white rounded-full"
                        >
                            View My Bookings
                        </button>
                    </div>
                )}

                {/* Navigation Buttons */}
                {step <= 4 && (
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={prevStep}
                            disabled={step === 1 || paymentLoading}
                            className="px-6 py-2 border rounded-full text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        <button
                            onClick={step === 4 ? handleBooking : nextStep}
                            disabled={!canProceedToNext() || paymentLoading}
                            className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                                canProceedToNext() && !paymentLoading
                                    ? "bg-teal-700 text-white hover:bg-teal-800"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            {paymentLoading && step === 4 && (
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            )}
                            {step === 4 ? 
                                (paymentLoading ? "Processing Payment..." : "Confirm & Pay") 
                                : "Continue"
                            }
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
                                <button
                                    type="button"
                                    onClick={() => setShowAddFamilyModal(false)}
                                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? "Adding..." : "Add Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookingPage;