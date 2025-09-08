import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import CommanBanner from "../../components/Banners/CommanBanner";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProviders } from "../../ReduxToolkit/Slice/Service";
import { getAllCategories } from "../../ReduxToolkit/Slice/Category";
import { getAllSkills } from "../../ReduxToolkit/Slice/Skill";
import { Button, ButtonWhite } from "../../components/ComponentsIndex";

const ServiceListing = () => {
  const dispatch = useDispatch();
  const { providers, pagination, status } = useSelector((state) => state.Service);
  const { categories } = useSelector((state) => state.categories);
  const { skills } = useSelector((state) => state.skills);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [serviceCategoryId, setServiceCategoryId] = useState("");
  const [serviceId, setSkillIds] = useState("");
  const [showFilter, setShowFilter] = useState(false); // 👈 mobile filter toggle

  useEffect(() => {
    dispatch(getAllProviders({ search, page, limit, serviceCategoryId, serviceId }));
    dispatch(getAllCategories());
    dispatch(getAllSkills());
  }, [dispatch, search, page, limit, serviceCategoryId, serviceId]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <CommanBanner heading={"Services"} />

      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden lg:block w-1/4 p-5 ">
          <div className="border rounded-3xl space-y-6 p-4">
            <div className="grid">
              <Button children={"Filters"} icon={"filter"} />

            </div>
            {/* Skill Filter */}

            {/* Category Filter */}

            <div>
              <select
                value={serviceCategoryId}
                onChange={(e) => {
                  setServiceCategoryId(e.target.value);
                  setPage(1);
                }}
                className="border border-primary p-2 rounded-full w-full h-[48px] text-primary"
              >
                <option value="" className="text-primary">
                  Select Care Type
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={serviceId}
                onChange={(e) => {
                  setSkillIds(e.target.value);
                  setPage(1);
                }}
                className="border border-primary p-2 rounded-full w-full h-[48px] text-primary"
              >
                <option value="" className="text-primary">
                  Services
                </option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>

        {/* Services Section */}
        <div className="w-full lg:w-3/4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            {/* Left side title */}
            <h2 className="text-lg font-semibold">
              Result ({providers.length})
            </h2>

            {/* Right side controls */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilter(true)}
                className="lg:hidden flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg w-full md:w-fit h-[44px]"
              >
                <FaFilter /> Filters
              </button>

              {/* Toggle buttons */}

              <div className="flex bg-transparent rounded-full p-1 border w-full md:w-auto justify-center">
                <button className="px-6 py-2 rounded-full font-medium bg-[#2B5F75] text-white shadow w-1/2 md:w-auto">
                  Individual
                </button>
                <Link
                  to="/company-service"
                  className="px-6 py-2 rounded-full font-medium text-gray-600 flex items-center justify-center w-1/2 md:w-auto"
                >
                  Partner
                </Link>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <FaSearch className="absolute left-3 top-3.5 md:top-4 text-gray-400 text-sm md:text-base" />
                <input
                  type="text"
                  placeholder="Search for Service"
                  className="w-full pl-9 pr-4 py-2 h-[40px] md:h-[48px] border rounded-full focus:ring focus:ring-blue-300 text-sm md:text-base"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* Loading */}
          {status === "loading" && <p className="">Loading...</p>}
          {status === "failed" && (
            <p className="text-red-500">Error fetching providers</p>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {providers.map((service) => (
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
                  <div className="md:flex justify-between items-center mb-3">
                    {/* Left Heading */}

                    <h3 className="text-sm  md:text-lg font-semibold text-gray-900">
                      <span title={service.name}> {service.name.slice(0, 15)}</span>
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
                   <p className="text-xs text-gray-400 pb-5">
                {service?.serviceCategories.map((category) => (
                  <span key={category.id} className="border rounded-full p-1">{category.name} </span>
                ))}
              </p>
                  {" "}
                  <Link to={`/booking/${service.id}`}>
                    <div className="grid">
                      <ButtonWhite

                        onClick={() => handleServiceClick(service.id)}
                      >
                        Book Now
                      </ButtonWhite>


                    </div></Link>


                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1 border rounded">
              {page} / {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, pagination.totalPages))
              }
              disabled={page === pagination.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowFilter(false)}
          ></div>

          {/* Drawer */}
          <div className="relative bg-white w-72 max-w-xs h-full shadow-lg p-5 space-y-6">
            <button
              onClick={() => setShowFilter(false)}
              className="absolute top-3 right-3 text-gray-600"
            >
              ✖
            </button>

            <div className="border rounded-3xl space-y-6 p-4">
              <div className="grid">
                <Button children={"Filters"} icon={"filter"} />
              </div>

              {/* Skill Filter */}
              <div>
                <select
                  value={serviceId}
                  onChange={(e) => {
                    setSkillIds(e.target.value);
                    setPage(1);
                  }}
                  className="border border-primary p-2 rounded-full w-full h-[48px] text-primary"
                >
                  <option value="" className="text-primary">
                    Skills
                  </option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={serviceCategoryId}
                  onChange={(e) => {
                    setServiceCategoryId(e.target.value);
                    setPage(1);
                  }}
                  className="border border-primary p-2 rounded-full w-full h-[48px] text-primary"
                >
                  <option value="" className="text-primary">
                    Select Care Type
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apply Button */}
              <div>
                <button
                  onClick={() => setShowFilter(false)}
                  className="w-full h-[48px] bg-primary text-white rounded-full font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ServiceListing;
