import React, { useEffect } from "react";
import { Button, Heading, Wrapper } from "../../components/ComponentsIndex";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyServices } from "../../ReduxToolkit/Slice/CompanyService";

const CompanyServiceHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { CompanyServices, status } = useSelector(
    (state) => state.CompanyService
  );

  useEffect(() => {
    dispatch(getAllCompanyServices());
  }, [dispatch]);

  const handleServiceClick = (id) => {
    navigate(`/company-service-booking/${id}`);
  };

  return (
    <Wrapper className="container w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      {/* <div className="text-center mb-8">
        <Heading className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
          Find Company Services Near You
        </Heading>
      </div> */}

      {/* Grid Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {CompanyServices?.slice(0, 4).map((company) => (
          <div
            key={company.id}
            className="w-full bg-white rounded-[24px] shadow-md border hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <Link to={`/compnay-provider/${company.id}`}>
              <div className="relative">
                <img
                  src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                  alt={company.companyName}
                  className="w-full h-36 sm:h-44 md:h-52 object-cover rounded-t-[24px]"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 sm:p-4 text-left space-y-1 sm:space-y-2">
              <h3 className="text-sm  md:text-[20px] font-semibold text-gray-900">
                {company.companyName}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {/* {company.address} */}Skill
              </p>
              {/* <p className="text-xs sm:text-sm text-gray-600">
                Pincode: {company.pincode}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {company.mobile}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {company.email}
              </p> */}
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
          <button
            className="px-5 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition text-xs sm:text-sm font-medium"
          >
            Explore More
          </button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default CompanyServiceHome;
