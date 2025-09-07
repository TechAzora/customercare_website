import React, { useEffect } from "react";
import { Heading, Wrapper } from "../../components/ComponentsIndex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyServices } from "../../ReduxToolkit/Slice/CompanyService";

const CompanyServiceHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { CompanyServices, status } = useSelector((state) => state.CompanyService);
   
  useEffect(() => {
    // if (status === "idle") {
    //   dispatch(getAllCompanyServices());
    // }
     dispatch(getAllCompanyServices());
  }, [dispatch, status]);

  const handleServiceClick = (id) => {
    navigate(`/company-service-booking/${id}`);
  };

  // Extract companies safely from response

  return (
    <Wrapper className="container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Heading className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Find Company Services Near You
        </Heading>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {CompanyServices.map((company) => (
          <div
            key={company.id}
            className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300"
          >
            {/* Image (placeholder since no image in API) */}
            <Link to={`/compnay-provider/${company.id}`}>
              <div className="relative">
                <img
                  src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                  alt={company.companyName}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-5 text-left space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {company.companyName}
              </h3>
              <p className="text-sm text-gray-600">📍 {company.address}</p>
              <p className="text-sm text-gray-600">
                Pincode: {company.pincode}
              </p>
              <p className="text-sm text-gray-600">📞 {company.mobile}</p>
              <p className="text-sm text-gray-600">✉️ {company.email}</p>

              <button
                onClick={() => handleServiceClick(company.id)}
                className="mt-3 w-full bg-[#205c64] text-white py-2 px-4 rounded-xl font-medium hover:bg-[#184950] transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More */}
      <div className="text-center mt-10">
        <Link to="/service">
          <button className="px-6 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition text-sm font-medium">
            Explore More
          </button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default CompanyServiceHome;
