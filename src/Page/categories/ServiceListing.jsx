import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import CommanBanner from "../../components/Banners/CommanBanner";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProviders } from "../../ReduxToolkit/Slice/Service";
import { getAllCategories } from "../../ReduxToolkit/Slice/Category";
import { getAllSkills } from "../../ReduxToolkit/Slice/Skill";

const ServiceListing = () => {
  const dispatch = useDispatch();
  const { providers, pagination, status } = useSelector((state) => state.Service);
  const { categories } = useSelector((state) => state.categories);
  const { skills } = useSelector((state) => state.skills);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [serviceCategoryId, setServiceCategoryId] = useState("");
  const [skillIds, setSkillIds] = useState("");
  const [showFilter, setShowFilter] = useState(false); // 👈 mobile filter toggle

  useEffect(() => {
    dispatch(getAllProviders({ search, page, limit, serviceCategoryId, skillIds }));
    dispatch(getAllCategories());
    dispatch(getAllSkills());
  }, [dispatch, search, page, limit, serviceCategoryId, skillIds]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <>
      <CommanBanner heading={"Services"} />

      <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden lg:block w-1/4 bg-white shadow rounded-xl p-5 space-y-6">
          <button className="bg-primary text-white w-full py-2 rounded-lg font-medium">
            Filters
          </button>

          {/* Category Filter */}
          <div>
            <h2 className="font-semibold mb-2">Select Category</h2>
            <select
              className="border p-2 rounded w-full"
              onChange={(e) => {
                setServiceCategoryId(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Filter */}
          <div>
            <h2 className="font-semibold mb-2">Select Skill</h2>
            <select
              value={skillIds}
              onChange={(e) => {
                setSkillIds(e.target.value);
                setPage(1);
              }}
              className="border p-2 rounded w-full"
            >
              <option value="">All Skills</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Services Section */}
        <div className="w-full lg:w-3/4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold">
              Result ({providers.length})
            </h2>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilter(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-gray-100"
              >
                <FaFilter /> Filters
              </button>

              {/* Search */}
              <div className="relative flex-1 md:flex-initial">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for Service"
                  className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring focus:ring-blue-300"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* Loading */}
          {status === "loading" && <p>Loading providers...</p>}
          {status === "failed" && (
            <p className="text-red-500">Error fetching providers</p>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="relative">
                  <img
                    src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                    alt={provider.name}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base">
                    {provider.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                    {provider.address}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                    {provider.mobile}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 overflow-auto">
                    {provider.email}
                  </p>

                  <Link to={`/booking/${provider.id}`}>
                    <button className="w-full mt-2 border border-primary text-primary rounded-full py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-blue-50">
                      Book Now
                    </button>
                  </Link>
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

            <h2 className="font-semibold mb-4">Filters</h2>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-2">Select Category</h3>
              <select
                className="border p-2 rounded w-full"
                onChange={(e) => {
                  setServiceCategoryId(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Skill Filter */}
            <div>
              <h3 className="font-semibold mb-2">Select Skill</h3>
              <select
                value={skillIds}
                onChange={(e) => {
                  setSkillIds(e.target.value);
                  setPage(1);
                }}
                className="border p-2 rounded w-full"
              >
                <option value="">All Skills</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceListing;
