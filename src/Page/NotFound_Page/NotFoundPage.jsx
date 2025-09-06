import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 mt-4">
        Page Not Found
      </h2>
      <p className="text-center text-gray-500 mt-2">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-6 py-3 bg-custom-purple text-white text-lg font-medium rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
