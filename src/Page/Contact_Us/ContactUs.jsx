import React, { useState } from "react";
// import CommanBanner from "../../components/Banners/CommanBanner";

const DealerContactForm = () => {
    return (
    <div>
      {/* <CommanBanner heading="Contact Us" children={contactus} /> */}
      <div className="container mx-auto px-4 my-10">
        {/* Contact Header */}
        <div className="text-center mb-10">
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Whether you're planning a stay, looking to make a group booking, or wish to connect with our team,
            we're here to help. Please reach out to the appropriate email address below, and we'll respond at the earliest.
          </p>
        </div>

        {/* Contact Info Section - Centered Format */}
        <div className="space-y-8 text-gray-700 text-center max-w-2xl mx-auto">
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">For Reservations:</h3>
            <p className="mb-1">
              <a href="mailto:reservations@Careconnect.com" className="text-blue-600 hover:underline font-medium">
                reservations@Careconnect.com
              </a>
            </p>
            <p className="text-gray-600">+91 99710 56666</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">For Bulk/Sales Inquiries:</h3>
            <p className="mb-1">
              <a href="mailto:reservations@Careconnect.com" className="text-blue-600 hover:underline font-medium">
                reservations@Careconnect.com
              </a>
            </p>
            <p className="text-gray-600">+91 99710 78888 / +91 99710 26666 / +91 99710 56666</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">To Reach Our Reception Desk:</h3>
            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-800">Vilmaris Hotel</p>
                <p className="text-gray-600">+91 98188 91720</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Careconnect Villa</p>
                <p className="text-gray-600">+91 98188 70394</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">To List Your Property with Us:</h3>
            <p className="mb-1">
              <a href="mailto:vilmarispropertymanager@gmail.com" className="text-blue-600 hover:underline font-medium">
                vilmarispropertymanager@gmail.com
              </a>
            </p>
            <p className="text-gray-600">+91 99100 65454 / +91 99710 65555</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DealerContactForm;