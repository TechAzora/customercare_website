import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginImage, logo } from '../../components/Img/ImportedImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllSkills } from '../../ReduxToolkit/Slice/Skill';
import { Button, ButtonWhite } from '../../components/ComponentsIndex';

const ProviderRegistration = () => {
  const [authStep, setAuthStep] = useState(1); // login/otp step
  const [profileStep, setProfileStep] = useState(1); // profile form steps
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  const [tempTokens, setTempTokens] = useState(null);

  const navigate = useNavigate();
  const server = 'https://api.vittasarthi.com';
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  // Get skills
  const { skills } = useSelector((state) => state.skills);
  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    address: '',
    pincode: '',
    skills: '',
    skillVerification: '',
    language: [],
    govtID: null,
    certification: null,
  });

  const handleLanguageChange = (lang) => {
    setProfileData((prev) => ({
      ...prev,
      language: prev.language.includes(lang)
        ? prev.language.filter((l) => l !== lang)
        : [...prev.language, lang],
    }));
  };

  const handleFileChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.files[0] });
  };

  const handleSendOTP = async () => {
    if (!mobile) {
      toast.warn('Please enter mobile number');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${server}/api/v1/customer/auth/sendLoginOTP`, {
        userType: 'Provider',
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
        userType: 'Provider',
        mobile,
        otp: fullOtp,
      });

      if (res.data.success) {
        const { isRegistered, tokens } = res.data.data;
        setTempTokens(tokens);
        toast.success('OTP Verified Successfully');

        if (!isRegistered) {
          setShowProfileForm(true); // show stepper
        } else {
          localStorage.setItem('accessTokenProvider', tokens.accessToken);
          localStorage.setItem('refreshTokenProvider', tokens.refreshToken);
          navigate('/ProviderDashboard'); // go directly
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
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('skills', profileData.skills);
      formData.append('email', profileData.email);
      formData.append('mobile', mobile);
      formData.append('gender', profileData.gender);
      formData.append('dob', profileData.dob);
      formData.append('address', profileData.address);
      formData.append('pincode', profileData.pincode);
      formData.append('skillVerification', profileData.skillVerification);
      formData.append('language', JSON.stringify(profileData.language));

      if (profileData.govtID) formData.append('govtID', profileData.govtID);
      if (profileData.certification)
        formData.append('certification', profileData.certification);

      const res = await axios.put(
        `${server}/api/v1/provider/auth/completeProviderProfile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
            <h3 className="font-bold text-center py-4">Provider Registration</h3>
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>

            {authStep === 1 ? (
              <>
                <label className="block font-semibold mb-2">
                  Enter your phone number:
                </label>
                <input
                  type="text"
                  value={mobile}
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
                      type="text"
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
          // Profile Completion Stepper
         <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
  {/* Stepper */}
  <div className="flex items-center justify-between mb-6">
    {[1, 2, 3].map((s) => (
      <div
        key={s}
        className={`flex-1 h-2 mx-1 rounded-full ${
          profileStep >= s ? "bg-[#2B5F75]" : "bg-gray-300"
        }`}
      ></div>
    ))}
  </div>

  {/* Title */}
  <div className="text-center mb-6">
    <h2 className="text-xl font-semibold">Complete Your Profile</h2>
    <p className="text-gray-500">Step {profileStep} of 3</p>
  </div>

  {/* Form */}
  <form onSubmit={handleProfileSubmit} className="space-y-6">
    {/* --- Step 1 --- */}
    {profileStep === 1 && (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={profileData.name}
          onChange={(e) =>
            setProfileData({ ...profileData, name: e.target.value })
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
        <select
          value={profileData.gender}
          onChange={(e) =>
            setProfileData({ ...profileData, gender: e.target.value })
          }
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          type="date"
          value={profileData.dob}
          onChange={(e) =>
            setProfileData({ ...profileData, dob: e.target.value })
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
      </div>
    )}

    {/* --- Step 2 --- */}
    {profileStep === 2 && (
      <div className="space-y-4">
        <select
          value={profileData.skills}
          onChange={(e) =>
            setProfileData({ ...profileData, skills: e.target.value })
          }
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">Select Skill</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>

        <select
          value={profileData.skillVerification}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              skillVerification: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">Select Verification</option>
          <option>Self-declared</option>
          <option>Verified</option>
          <option>Certified</option>
        </select>

        <div>
          <p className="mb-2 font-medium">Languages *</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Hindi",
              "English",
              "Marathi",
              "Tamil",
              "Bengal",
              "Telugu",
              "Kannada",
              "Malayalam",
              "Gujarati",
              "Punjabi",
              "Odia",
              "Assamese",
              "Urdu",
            ].map((lang) => (
              <label key={lang} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={lang}
                  checked={profileData.language.includes(lang)}
                  onChange={() => handleLanguageChange(lang)}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* --- Step 3 --- */}
    {profileStep === 3 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Government ID *</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, "govtID")}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Certification *</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, "certification")}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
      </div>
    )}

    {/* Navigation */}
    <div className="flex justify-between pt-4">
      {profileStep > 1 && (
        <ButtonWhite
          children={"Back"}
          type="button"
          onClick={() => setProfileStep(profileStep - 1)}
        />
      )}

      {profileStep < 3 ? (
        <Button
          children={"Next"}
          type="button"
          onClick={() => setProfileStep(profileStep + 1)}
        />
      ) : (
        <button
          type="submit"
          disabled={profileLoading}
          className="px-6 py-2 rounded-3xl bg-primary text-white "
        >
          {profileLoading ? "Submitting..." : "Complete Profile"}
        </button>
      )}
    </div>
  </form>
</div>

        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProviderRegistration;
