// src/utils/useRazorpayPayment.js
import axios from 'axios';

export const useRazorpayPayment = () => {
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const startPayment = async ({
    amount,
    bookingDetails,
    formData,
    onSuccess,
    onFailure,
    setIsProcessing,
  }) => {
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      setIsProcessing(true);

      const orderRes = await axios.post(
        'https://Careconnect-backend.vercel.app/api/v1/Careconnect/payment/createRoomRazorpay',
        {
          amount,
          currency: 'INR',
        }
      );

      const orderId = orderRes?.data?.data?.orderId;
      if (!orderId) {
        alert("Failed to create order");
        setIsProcessing(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: 'rzp_test_d3TSwF7k11BC3Y', // Replace with live key
        amount: amount * 100,
        currency: 'INR',
        name: 'Stay Vilmaris',
        description: bookingDetails?.title || "Room Booking",
        image: bookingDetails?.firstImage || '',
        order_id: orderId,
        handler: async (response) => {
          const payload = {
            ...formData,
            roomId: bookingDetails.roomId,
            totalPrice: amount,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            paymentGateway: "razorpay",
            modeOfPayment: "Online",
          };

          try {
            const bookingRes = await axios.post(
              'https://Careconnect-backend.vercel.app/api/v1/Careconnect/booking/create',
              payload
            );
            setIsProcessing(false);
            onSuccess(bookingRes.data, payload);
          } catch (error) {
            console.error("Booking failed:", error);
            setIsProcessing(false);
            onFailure(error);
          }
        },
        prefill: {
          name: formData.guestName,
          email: formData.guestEmail,
          contact: formData.guestPhone,
        },
        theme: { color: "#0f766e" },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      });

      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      onFailure(err);
    }
  };

  return { startPayment };
};
