import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ConvaiWidget = () => {
  const server = "https://api.vittasarthi.com";
  const token = localStorage.getItem("accessToken");

  const [profile, setProfile] = useState(null);
  const [family, setFamily] = useState([]);
  const [loading, setLoading] = useState(false);
  // ✅ Fetch profile API
  const fetchProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${server}/api/v1/customer/auth/getCustomerProfile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setProfile(res.data.data);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
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

  // ✅ Load external Convai script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Call API on mount
  useEffect(() => {
    fetchProfile();
    fetchFamily();

  }, []);
  const dynamicVars = {
    user_name: "Johnnnnnnnnn", account_type: "premium"
  };
  return (
    <>
      {token && (
        <elevenlabs-convai
          agent-id="agent_9101k4fbjc3sfp7rhws1m5tgyv0q"
          dynamic-variables={dynamicVars}
        ></elevenlabs-convai>
      )}
    </>

  );

}
export default ConvaiWidget;
