import React, { useState } from "react";
import { toast } from "react-toastify";
import { Heading, Input } from "../../components/ComponentsIndex";
import { createPropertyForm } from "../../ReduxToolkit/Slice/Contact";
import { useDispatch, useSelector } from "react-redux";
import CommanBanner from "../../components/Banners/CommanBanner";
import { commanbanner } from "../../components/Img/ImportedImage";

const PropertyForm = () => {
  const dispatch = useDispatch();
  const { PropertyFormStatus } = useSelector((state) => state.Contact);

  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    area: "",
    propertyType: "",
    numberOfRooms: "",
    description: "",
    number: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files), // for multiple images
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (key === "images") {
        formData.images.forEach((img) => {
          data.append("images", img); // multiple images
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    dispatch(createPropertyForm(data));

    setFormData({
      name: "",
      state: "",
      city: "",
      area: "",
      propertyType: "",
      numberOfRooms: "",
      description: "",
      number: "",
      images: [],
    });
  };

  return (
    <>
      <CommanBanner heading="Property Submit Form" children={commanbanner} />
      <div className="max-w-6xl mx-auto bg-gray-50 rounded-3xl overflow-hidden shadow-md p-8 md:p-12 my-5">
        <Heading className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          Submit Your Property
        </Heading>
        <p className="text-gray-600 mb-8">
          Share your property details and we’ll reach out shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Property Name"
              required
            />
            <Input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <Input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Pin Code / Area Code"
              required
            />
            <Input
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              placeholder="Property Type (e.g., Hotel)"
              required
            />
            <Input
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              placeholder="Number of Rooms"
              type="number"
              required
            />
            <Input
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
            <Input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Property Description"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="bg-primary hover:bg-teal-800 text-white font-medium py-3 px-6 rounded-full transition-all"
          >
            {PropertyFormStatus === "loading" ? "Submitting..." : "Submit Property"}
          </button>
        </form>
      </div>
    </>

  );
};

export default PropertyForm;
