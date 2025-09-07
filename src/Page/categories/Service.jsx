import React, { useEffect } from "react";
import { Heading, Wrapper } from "../../components/ComponentsIndex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../ReduxToolkit/Slice/Service";

const ServicesSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Services, status } = useSelector((state) => state.Service);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleServiceClick = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <Wrapper className="container w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <Heading className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
          Find Services Near You
        </Heading>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Services?.map((service) => (
          <div
            key={service.id}
            className="w-full bg-white rounded-xl shadow-md border hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <Link to={`/provider/${service.id}`}>
              <div className="relative">
                <img
                  src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                  alt={service.name}
                  className="w-full h-36 sm:h-44 md:h-52 object-cover rounded-t-xl"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 sm:p-4 text-left space-y-1 sm:space-y-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                {service.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{service.gender}</p>
              <p className="text-xs sm:text-sm text-gray-600">📍 {service.address}</p>
              <p className="text-xs sm:text-sm text-gray-600">
                Pincode: {service.pincode}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">📞 {service.mobile}</p>

              <button
                onClick={() => handleServiceClick(service.id)}
                className="mt-2 w-full bg-[#205c64] text-white py-1.5 sm:py-2 px-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#184950] transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More */}
      <div className="text-center mt-8">
        <Link to="/service">
          <button className="px-5 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition text-xs sm:text-sm font-medium">
            Explore More
          </button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ServicesSlider;
