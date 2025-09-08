import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginImage, logo } from '../../components/Img/ImportedImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyRegistration = () => {
  const [authStep, setAuthStep] = useState(1); // login/otp step
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [tempTokens, setTempTokens] = useState(null);

  const navigate = useNavigate();
  const server = 'https://api.vittasarthi.com';
  const inputRefs = useRef([]);

  // Profile state
  const [profileData, setProfileData] = useState({
    companyName: '',
    email: '',
    address: '',
    pincode: '',
    gst: '',
  });

  const handleSendOTP = async () => {
    if (!mobile) {
      toast.warn('Please enter mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${server}/api/v1/customer/auth/sendLoginOTP`, {
        userType: 'Company',
        mobile,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuthStep(2);
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
        userType: 'Company',
        mobile,
        otp: fullOtp,
      });

      if (res.data.success) {
        const { isRegistered, tokens } = res.data.data;
        setTempTokens(tokens);
        toast.success('OTP Verified Successfully');

        if (!isRegistered) {
          setShowProfileForm(true);
        } else {
          localStorage.setItem('accessTokenProvider', tokens.accessToken);
          localStorage.setItem('refreshTokenProvider', tokens.refreshToken);
          navigate('/ProviderDashboard');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      const res = await axios.put(
        `${server}/api/v1/company/auth/completeCompanyProfile`,
        {
          companyName: profileData.companyName,
          email: profileData.email,
          address: profileData.address,
          pincode: profileData.pincode,
          gst: profileData.gst,
        },
        {
          headers: {
            Authorization: `Bearer ${tempTokens.accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success('Profile completed successfully!');
        setShowProfileForm(false);
        navigate('/ProviderSuccess');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to complete profile. Please try again.');
    } finally {
      setProfileLoading(false);
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
      <div className="md:w-1/2 w-full bg-[#2B5F75] flex items-center justify-center p-4">
        {!showProfileForm ? (
          <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
            <div className="flex justify-center items-center">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </div>
            <h3 className="font-bold text-center py-4">Company Registration</h3>
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>

            {authStep === 1 ? (
              <>
                <label className="block font-semibold mb-2">
                  Enter your phone number:
                </label>
                <input
                  value={mobile}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91"
                  className="w-full p-3 rounded-full border border-gray-300 mb-4"
                />
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className={`w-full py-3 rounded-full text-white ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#2B5F75] hover:bg-[#24555d]'
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
                  We've sent a 6-digit OTP to +91-XXXXX{mobile.slice(-4)}
                </p>

                <div className="flex justify-between mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-12 text-center text-xl border rounded-full"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className={`w-full py-3 rounded-full text-white ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#2B5F75] hover:bg-[#24555d]'
                  }`}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">Complete Company Profile</h2>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                value={profileData.companyName}
                onChange={(e) =>
                  setProfileData({ ...profileData, companyName: e.target.value })
                }
                className="w-full border rounded-lg p-3"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full border rounded-lg p-3"
                required
              />
              <textarea
                placeholder="Address"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="w-full border rounded-lg p-3"
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={profileData.pincode}
                onChange={(e) =>
                  setProfileData({ ...profileData, pincode: e.target.value })
                }
                className="w-full border rounded-lg p-3"
                required
              />
              <input
                type="text"
                placeholder="GST Number"
                value={profileData.gst}
                onChange={(e) =>
                  setProfileData({ ...profileData, gst: e.target.value })
                }
                className="w-full border rounded-lg p-3"
              />

              <button
                type="submit"
                disabled={profileLoading}
                className="w-full py-3 rounded-full bg-[#2B5F75] text-white"
              >
                {profileLoading ? 'Submitting...' : 'Complete Profile'}
              </button>
            </form>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CompanyRegistration;
