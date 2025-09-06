import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginImage } from '../../components/Img/ImportedImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false); // 🔹 loading state
  const navigate = useNavigate();
  const server = 'http://139.59.16.89';

  const inputRefs = useRef([]);

  const handleSendOTP = async () => {
    if (!mobile) {
      toast.warn('Please enter mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${server}/api/v1/customer/auth/sendLoginOTP`, {
        userType: 'Customer',
        mobile,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerifyOTP = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      toast.warn('Enter all 6 digits');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${server}/api/v1/customer/auth/verifyOTP`, {
        userType: 'Customer',
        mobile,
        otp: fullOtp,
      });

      if (res.data.success) {
        const { isRegistered } = res.data.data.user;

        localStorage.setItem('accessToken', res.data.data.tokens.accessToken);
        localStorage.setItem('refreshToken', res.data.data.tokens.refreshToken);

        toast.success('OTP Verified Successfully 🎉');
        if (!isRegistered) {
          navigate('/update_profile');
        } else {
          navigate('/profile');
         window.location.reload(false)
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image */}
      <div
        className="w-1/2 bg-cover bg-center md:block hidden"
        style={{ backgroundImage: `url(${loginImage})` }}
      ></div>

      {/* Right Form */}
      <div className="md:w-1/2 w-full  bg-[#2d6a74] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>

          {step === 1 ? (
            <>
              <label className="block font-semibold mb-2">
                Enter your phone number:
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
                className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
              />
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className={`w-full py-3 rounded-full shadow-md text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#2d6a74] hover:bg-[#24555d]'
                }`}
              >
                {loading ? 'Sending...' : 'Get OTP'}
              </button>
            </>
          ) : (
            <>
              <label className="block font-semibold mb-1">
                Verify your number
              </label>
              <p className="text-sm text-gray-600 mb-4">
                We’ve sent a 6-digit OTP to +91-XXXXX{mobile.slice(-4)}
              </p>

              <div className="flex justify-between mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className={`w-full py-3 rounded-full shadow-md text-white ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#2d6a74] hover:bg-[#24555d]'
                }`}
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
