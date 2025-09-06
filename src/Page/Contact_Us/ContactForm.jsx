import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { contactForm } from "../../components/Img/ImportedImage";
import { Heading, Input } from "../../components/ComponentsIndex";
import { createContact } from "../../ReduxToolkit/Slice/Contact";
import { useDispatch, useSelector } from "react-redux";
import { X, Phone, Mail, MessageCircle, User } from "lucide-react";

const ContactPopupForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.Contact);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    message: "",
    email: "",
    status: false
  });

  // Auto open popup when component mounts (website loads)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // Opens after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createContact(formData));
    setFormData({ 
      name: "", 
      number: "", 
      message: "", 
      email: "",
      reason: "reason",
      status: true 
    });
    // toast.success("Message sent successfully!");
    setIsOpen(false);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={closePopup}
      >
        {/* Modal Container */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary to-teal-600 p-6 rounded-t-2xl">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-white" />
              </div>
              <Heading className="text-2xl font-bold text-white mb-2">
                Let's Connect!
              </Heading>
              <p className="text-white/90 text-sm">
                Get in touch and we'll respond within 24 hours
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="+91 Your phone number"
                  className="pl-10"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@example.com"
                  className="pl-10"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How can we help you today?"
                  className="block w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none text-sm"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gradient-to-r from-primary to-teal-600 hover:from-teal-600 hover:to-primary text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {status === "loading" ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Image Section - Now Below Content */}
          {/* <div className="relative overflow-hidden rounded-b-2xl">
            <img
              src={contactForm}
              alt="Contact us"
              className="w-full h-32 object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ContactPopupForm;