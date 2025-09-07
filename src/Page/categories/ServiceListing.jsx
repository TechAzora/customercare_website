import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
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

  console.log(categories)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [serviceCategoryId, setServiceCategoryId] = useState(""); // category filter
  const [skillIds, setSkillIds] = useState(""); // 👈 skill filter

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

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow rounded-xl p-5 space-y-6">
          <button className="bg-primary text-white w-full py-2 rounded-lg font-medium">
            Filters
          </button>

          {/* Category Filter */}
          <div>
            <h2 className="font-semibold mb-2">Select Category</h2>
            <select className="border p-2 rounded w-full" onChange={(e) => {
              setServiceCategoryId(e.target.value);
              setPage(1);
            }}>
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
              Result ({providers.length})
            </h2>
            <div className="relative w-full md:w-72">
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

          {/* Loading */}
          {status === "loading" && <p>Loading providers...</p>}
          {status === "failed" && <p className="text-red-500">Error fetching providers</p>}

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                 <div className="relative">
                <img
                  src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
                  alt={provider.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
              </div>
                <div className="p-4">
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.address}</p>
                  <p className="text-sm text-gray-600">{provider.mobile}</p>
                  <p className="text-sm text-gray-600">{provider.email}</p>

                  <Link to={`/booking/${provider.id}`}>
                    <button className="w-full mt-3 border border-primary text-primary rounded-full py-2 hover:bg-blue-50">
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

export default ServiceListing;
