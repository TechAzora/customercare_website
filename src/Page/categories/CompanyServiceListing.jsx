import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import CommanBanner from "../../components/Banners/CommanBanner";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../ReduxToolkit/Slice/Category";
import { getAllSkills } from "../../ReduxToolkit/Slice/Skill";
import { CompanyGetAllProviders } from "../../ReduxToolkit/Slice/CompanyService";

const CompnayServiceListing = () => {
  const dispatch = useDispatch();
  const { providers, status } = useSelector((state) => state.CompanyService);
  const { categories } = useSelector((state) => state.categories);
  const { skills } = useSelector((state) => state.skills);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [serviceCategoryId, setServiceCategoryId] = useState(""); // category filter
  const [skillIds, setSkillIds] = useState(""); // skill filter
  const [showFilters, setShowFilters] = useState(false); // ✅ Mobile filters toggle

  useEffect(() => {
    dispatch(
      CompanyGetAllProviders({ search, page, limit, serviceCategoryId, skillIds })
    );
    dispatch(getAllCategories());
    dispatch(getAllSkills());
  }, [dispatch, search, page, limit, serviceCategoryId, skillIds]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ✅ Extract pagination safely
  const pagination = providers?.data?.pagination || { page: 1, totalPages: 1 };

  // ✅ Extract company list safely
  const companies = Array.isArray(providers?.data?.companies)
    ? providers.data.companies
    : providers || [];

  return (
    <>
      <CommanBanner heading={"Services"} />

      <div className="flex flex-col lg:flex-row gap-6 p-6 relative">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg mb-4 w-fit"
        >
          <FaFilter /> Filters
        </button>

        {/* Filters Sidebar (Desktop + Mobile Drawer) */}
        <div
          className={`fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white shadow-lg z-50 transform transition-transform p-5 space-y-6 lg:static lg:translate-x-0 lg:w-1/4 rounded-xl
          ${showFilters ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Close Button (Mobile) */}
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-600"
          >
            <FaTimes size={20} />
          </button>

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
            <label className="block text-sm font-medium mb-2">Skill</label>
            <select
              value={skillIds}
              onChange={(e) => {
                setSkillIds(e.target.value);
                setPage(1);
              }}
              className="w-full border rounded-lg p-2"
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
              Result ({companies.length})
            </h2>
            <div className="relative w-full md:w-72">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search for Company"
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:ring focus:ring-blue-300"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Loading / Error */}
          {status === "loading" && <p>Loading companies...</p>}
          {status === "failed" && (
            <p className="text-red-500">Error fetching companies</p>
          )}

          {/* Cards Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {companies.map((company) => (
    <div
      key={company.id}
      className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
    >
      <div className="relative">
        <img
          src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
          alt={company.companyName}
          className="w-full h-32 sm:h-40 md:h-56 object-cover rounded-t-xl" 
          // 👆 smaller image on phone, normal on bigger screens
        />
      </div>
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="font-semibold text-xs sm:text-sm md:text-base">
          {company.companyName}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
          📍 {company.address}
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
          📞 {company.mobile}
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
          ✉️ {company.email}
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
          Pincode: {company.pincode}
        </p>

        <Link to={`/company-service-booking/${company.id}`}>
          <button className="w-full mt-2 border border-primary text-primary rounded-full py-1 text-xs sm:text-sm md:text-base hover:bg-blue-50">
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
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
              disabled={page === pagination.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompnayServiceListing;
