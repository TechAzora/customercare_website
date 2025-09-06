import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import CommanBanner from "../../components/Banners/CommanBanner";
import { Link } from "react-router-dom";
import axios from "axios";

const ServiceListing = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("accessToken");
console.log(providers)
const fetchProviders = async () => {
  try {
    setLoading(true);
    const response = await axios.get(
      `http://139.59.16.89/api/v1/provider/auth/getOnlineProvidersForWeb`,
      {
        params: {
          search,
          page,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`, // make sure token is valid
        },
      }
    );

    if (response.data.success) {
      setProviders(response.data.data.providers);
      setTotalPages(response.data.data.pagination.totalPages);
    }
    setLoading(false);
  } catch (error) {
    console.error("Error fetching providers:", error.response || error);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProviders();
  }, [search, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page on new search
  };

  return (
    <>
      <CommanBanner heading={"Services"} />

      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white shadow rounded-xl p-5">
          <button className="bg-primary text-white w-full py-2 rounded-lg font-medium">
            Filters
          </button>
          {/* Add your other filters here */}
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
          {loading && <p>Loading providers...</p>}

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
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
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
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
