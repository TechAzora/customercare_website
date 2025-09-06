import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Thankyou() {
  const location = useLocation();
  const bookingData = location.state;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-xl w-full p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-teal-700 mb-4">🎉 Booking Confirmed!</h1>
        <p className="text-gray-600 mb-2">Thank you for booking with <strong>Stay Vilmaris</strong>.</p>
        <p className="text-sm text-gray-500 mb-6">You will receive a confirmation email shortly.</p>

        {bookingData ? (
          <div className="text-left text-sm text-gray-700 space-y-2 bg-gray-100 p-4 rounded">
            <p><strong>Name:</strong> {bookingData.guestName}</p>
            <p><strong>Email:</strong> {bookingData.guestEmail}</p>
            <p><strong>Phone:</strong> {bookingData.guestPhone}</p>
            <p><strong>Check-in:</strong> {bookingData.checkInDate}</p>
            <p><strong>Check-out:</strong> {bookingData.checkOutDate}</p>
            <p><strong>Guests:</strong> {bookingData.guests} (Adults: {bookingData.adults}, Children: {bookingData.children})</p>
            <p><strong>Total Paid:</strong> ₹{bookingData.totalPrice}</p>
            <p><strong>Payment ID:</strong> {bookingData.paymentId}</p>
          </div>
        ) : (
          <p className="text-gray-400">Booking details not available.</p>
        )}

        <Link to="/" className="inline-block mt-6 bg-teal-700 text-white py-2 px-6 rounded hover:bg-teal-800 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Thankyou;
