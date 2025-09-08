import React, { useEffect } from "react";
import { Button, Heading, Wrapper } from "../../components/ComponentsIndex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../ReduxToolkit/Slice/Service";

const ServicesSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Services, status } = useSelector((state) => state.Service);
  console.log(Services)
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleServiceClick = (id) => {
    navigate(`/booking/${id}`);
  };

  return (
    <Wrapper className="container w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      {/* <div className="text-center mb-8">
        <Heading className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
          Find Services Near You
        </Heading>
      </div> */}

      {/* Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Services?.slice(0, 4).map((service) => (
          <div
            key={service.id}
            className="w-full bg-white rounded-[24px] shadow-md border hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <Link to={`/provider/${service.id}`}>
              <div className="relative">
                <img
                  src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                  alt={service.name}
                  className="w-full h-36 sm:h-44 md:h-52 object-cover rounded-t-[24px]"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 sm:p-4 text-left space-y-1 sm:space-y-2">
              <div className="md:flex justify-between items-center">
                {/* Left Heading */}
                <h3 className="text-sm  md:text-lg font-semibold text-gray-900">
                 <span title={service.name}> {service.name.slice(0,15)}</span>
                </h3>

                {/* Right Rating */}
                {service.avgRating ? (
                  <div className="flex items-center gap-1 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${i < Math.round(service.avgRating)
                            ? "bi-star-fill text-yellow-500"
                            : "bi-star text-gray-300"
                          }`}
                      ></i>
                    ))}
                    {/* <span className="ml-1 text-gray-600">{service.avgRating}</span> */}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star text-gray-300`}
                      ></i>
                    ))}
                    {/* <span className="ml-1 text-gray-600">{service.avgRating}</span> */}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 py-3">
                {service?.serviceCategories.map((category) => (
                  <span key={category.id} className="border rounded-full p-1 me-1">{category.name} </span>
                ))}
              </p>

              <div className="grid">
                <Button

                  onClick={() => handleServiceClick(service.id)}
                >
                  Book Now
                </Button>
              </div>


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
