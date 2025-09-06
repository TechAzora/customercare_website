import React, { useState, useEffect } from "react";
import CommanBanner from "../../components/Banners/CommanBanner";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookingPage() {
    const {id} = useParams()
    console.log(id)
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([
    { id: "svc-1", name: "Comprehensive elderly care", price: 450 },
    { id: "svc-2", name: "Nursing Assistance", price: 600 },
    { id: "svc-3", name: "Physiotherapy Sessions", price: 700 },
  ]);
  const [family, setFamily] = useState([]);
    const token = localStorage.getItem("accessToken");
  console.log(token)

  const [bookingData, setBookingData] = useState({
    familyMemberId: "",
    companySvcId: "",
    startDate: "",
    endDate: "",
    serviceName: "",
    price: 0,
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ Fetch family members on Step 3
  useEffect(() => {
    const fetchFamily = async () => {
      if (step === 3) {
        try {
          const response = await axios.get(
            "http://139.59.16.89/api/v1/customer/familyMember/getFamilyMembers",
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

  // ✅ Handle booking API + Razorpay
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const handleBooking = async () => {
  try {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    const token = localStorage.getItem("token");

    // ✅ Step 1: Create order on backend
    const orderRes = await axios.post(
      "https://Careconnect-backend.vercel.app/api/v1/Careconnect/payment/createRazorpay",
      {
        amount: 10 * 100, // in paisa
        currency: "INR",
      },
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    );

    const { id: order_id, amount, currency } = orderRes.data;

    // ✅ Step 2: Open Razorpay checkout
    const options = {
      key: "rzp_test_03ADIbjtraoMGJ",
      amount: amount,
      currency: currency,
      name: "Elder Care Services",
      description: "Booking Payment",
      order_id: order_id, // backend order_id
      handler: async function (paymentResponse) {
        console.log("Payment Success:", paymentResponse);

        // ✅ Step 3: Call booking API after payment success
        try {
          const bookingRes = await axios.post(
            "http://139.59.16.89/api/v1/customer/booking/createBookingRequest",
            {
              familyMemberId: bookingData.familyMemberId,
              providerSvcId: id,
              companySvcId: bookingData.companySvcId,
              startDate: bookingData.startDate,
              endDate: bookingData.endDate,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpayOrderId: paymentResponse.razorpay_order_id,
              razorpaySignature: paymentResponse.razorpay_signature,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          console.log("Booking API Response:", bookingRes.data);
          setStep(5);
        } catch (apiError) {
          console.error("Booking API error:", apiError);
          alert("Payment done but booking failed!");
        }
      },
      prefill: {
        name: "Ravi Kumar",
        email: "ravi@example.com",
        contact: "9876543210",
      },
      theme: { color: "#205c64" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Booking error:", error);
    alert("Something went wrong. Try again.");
  }
};




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
              {services.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() =>
                    setBookingData({
                      ...bookingData,
                      providerSvcId: "provider-123", // dummy
                      companySvcId: svc.id,
                      serviceName: svc.name,
                      price: svc.price,
                    })
                  }
                  className={`p-4 border rounded-xl text-center cursor-pointer ${
                    bookingData.companySvcId === svc.id
                      ? "border-teal-700 bg-teal-50"
                      : "hover:border-teal-700"
                  }`}
                >
                  <p className="text-sm">{svc.name}</p>
                  <p className="font-semibold text-teal-700 mt-2">
                    ₹{svc.price}/Day
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Dates */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                onChange={(e) =>
                  setBookingData({ ...bookingData, startDate: e.target.value })
                }
              />
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                onChange={(e) =>
                  setBookingData({ ...bookingData, endDate: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {/* Step 3: Family Member */}
       {step === 3 && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Assign Family Member</h2>
    {family.length === 0 ? (
      <div className="text-center">
        <p className="text-gray-500 mb-4">No family members found.</p>

        <button
          onClick={() => (window.location.href = "/profile")}
          className="px-6 py-2 bg-teal-700 text-white rounded-full"
        >
          ➕ Add Family Member
        </button>
        <p className="text-gray-500 mb-4">When you add family member then book again</p>
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
            className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer ${
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
  </div>
)}


        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
            <div className="p-4 border rounded-lg">
              <p>
                <strong>Service:</strong> {bookingData.serviceName}
              </p>
              <p>
                <strong>Dates:</strong> {bookingData.startDate} -{" "}
                {bookingData.endDate}
              </p>
              <p>
                <strong>Member ID:</strong> {bookingData.familyMemberId}
              </p>
              <p className="font-bold text-teal-700 mt-3">
                Total: ₹{bookingData.price * 5} (example for 5 days)
              </p>
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 Booking Successful!
            </h2>
            <p className="mt-4 text-gray-600">
              Your booking has been confirmed and payment received.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        {step <= 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-2 border rounded-full text-gray-700 disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={step === 4 ? handleBooking : nextStep}
              className="px-6 py-2 bg-teal-700 text-white rounded-full"
            >
              {step === 4 ? "Confirm & Pay" : "Continue"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default BookingPage;
