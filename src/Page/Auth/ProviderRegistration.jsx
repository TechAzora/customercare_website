import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginImage } from '../../components/Img/ImportedImage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logo } from '../../components/Img/ImportedImage';
import { getAllSkills } from '../../ReduxToolkit/Slice/Skill';

const ProviderRegistration = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Temporary token storage (not in localStorage yet)
  const [tempTokens, setTempTokens] = useState(null);
  
  const navigate = useNavigate();
  const server = 'https://api.vittasarthi.com';
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  // Get skills from Redux store
  const { skills } = useSelector((state) => state.skills);
  useEffect(() => {
    
     dispatch(getAllSkills());

  }, [dispatch]);
  console.log(skills)
  // Profile form state
// Add to initial profileData state
const [profileData, setProfileData] = useState({
  name: '',
  skills: '',
  email: '',
  gender: '',
  dob: '',
  address: '',
  pincode: '',
  govtID: null,
  certification: null,
  skillVerification: '',   // ✅ New field
  language: []             // ✅ New field
});

// Handle language change
const handleLanguageChange = (lang) => {
  setProfileData((prev) => {
    const alreadySelected = prev.language.includes(lang);
    return {
      ...prev,
      language: alreadySelected
        ? prev.language.filter((l) => l !== lang) // remove if already selected
        : [...prev.language, lang]                // add if not selected
    };
  });
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
        userType: 'Provider',
        mobile,
        otp: fullOtp,
      });

      if (res.data.success) {
        const { isRegistered, tokens } = res.data.data;

        // Store tokens temporarily (not in localStorage yet)
        setTempTokens(tokens);
        
        toast.success('OTP Verified Successfully');
        
        if (!isRegistered) {
          // Show profile completion modal instead of navigating
          setShowProfileModal(true);
        } else {
          // For registered users, store tokens and navigate
          localStorage.setItem('accessTokenProvider', tokens.accessToken);
          localStorage.setItem('refreshTokenProvider', tokens.refreshToken);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setProfileData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      const formData = new FormData();
      
      // Append all form fields
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

      if (profileData.govtID) {
        formData.append('govtID', profileData.govtID);
      }
      if (profileData.certification) {
        formData.append('certification', profileData.certification);
      }

      const res = await axios.put(
        `${server}/api/v1/provider/auth/completeProviderProfile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${tempTokens.accessToken}`
          }
        }
      );

      if (res.data.success) {
      
        
        toast.success('Profile completed successfully!');
        setShowProfileModal(false);
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
      <div className="md:w-1/2 w-full bg-[#2d6a74] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>
<h3 className="font-bold text-center py-4">
  Provider Registration
</h3>
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

      {/* Profile Completion Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Complete Your Profile</h3>
                <p className="text-sm text-gray-500">Please fill in your details to continue</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Skills *</label>
                    <select
                      required
                      value={profileData.skills}
                      onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Skill</option>
                      {skills && skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender *</label>
                    <select
                      required
                      value={profileData.gender}
                      onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={profileData.dob}
                      onChange={(e) => setProfileData({...profileData, dob: e.target.value})}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={profileData.pincode}
                      onChange={(e) => setProfileData({...profileData, pincode: e.target.value})}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <textarea
                    required
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="w-full border rounded-lg p-2 h-20 resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your full address"
                  />
                </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Skill Verification */}
  <div>
    <label className="block text-sm font-medium mb-1">Verification *</label>
    <select
      required
      value={profileData.skillVerification}
      onChange={(e) =>
        setProfileData({ ...profileData, skillVerification: e.target.value })
      }
      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    >
      <option value="">Select Verification</option>
      <option value="Self-declared">Self-declared</option>
      <option value="Verified">Verified</option>
      <option value="Certified">Certified</option>
    </select>
  </div>

  {/* Languages */}
  <div>
    <label className="block text-sm font-medium mb-1">Languages *</label>
    <div className="grid grid-cols-2 gap-2 text-sm">
      {[
        "Hindi","English","Marathi","Bengali",
        "Tamil","Telugu","Kannada","Malayalam",
        "Gujarati","Punjabi","Odia","Assamese","Urdu"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Government ID */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Government ID *</label>
                    <input
                      type="file"
                      required
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'govtID')}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload Aadhar, Passport, or Driver's License</p>
                  </div>

                  {/* Certification */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Certification *</label>
                    <input
                      type="file"
                      required
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'certification')}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload relevant skill certification</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className={`px-6 py-2 rounded-lg text-white font-medium ${
                      profileLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#2d6a74] hover:bg-[#24555d]'
                    }`}
                  >
                    {profileLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Completing...
                      </div>
                    ) : (
                      'Complete Profile'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProviderRegistration;