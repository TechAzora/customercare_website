import React from "react";
import Layout from "./Layout/Layout";
import "./App.css";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import Home from "./Page/Home/Home";
import Blog from "./Page/Blog/Blog";
import ContactUs from "./Page/Contact_Us/ContactUs";
import NotFoundPage from "./Page/NotFound_Page/NotFoundPage";
import PrivacyPolicy from "./Page/Doc/PrivacyPolicy";
import TermsConditions from "./Page/Doc/TermsConditions";
import RefundCancellationPolicy from "./Page/Doc/RefundCancellationPolicy";
import "react-toastify/dist/ReactToastify.css";
import Faq from "./Page/Contact_Us/Faq";
import { HelmetProvider } from "react-helmet-async";
import ServiceListing from "./Page/categories/ServiceListing";
import BookingPage from "./Page/Booking/Booking";
import Login from "./Page/Auth/Login";
import UpdateProfile from "./Page/Auth/UpdateProfile";
import Profile from "./Page/Auth/Profile";
import ServiceProviderProfile from "./Page/categories/ServiceProviderProfile";
import ProviderRegistration from "./Page/Auth/ProviderRegistration";
import CompanyBookingPage from "./Page/Booking/CompanyBooking";
import CompnayServiceListing from "./Page/categories/CompanyServiceListing";
import CompanyServiceProviderProfile from "./Page/categories/CompnayServiceProviderProfile";
import ProviderSuccess from "./Page/Auth/ProviderSuccess";

// Helper to check token
const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken"); // use same key as in profile page
};

// PrivateRoute wrapper
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

// PublicRoute wrapper (for login page)
function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/profile" replace /> : children;
}

// Router Configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route path="" element={<Home />} />
      <Route path="blog" element={<Blog />} />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="update_profile"
        element={
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="service" element={<ServiceListing />} />
      <Route path="company-service" element={<CompnayServiceListing />} />
      <Route path="provider/:id" element={<ServiceProviderProfile />} />
      <Route path="compnay-provider/:id" element={<CompanyServiceProviderProfile />} />
      <Route path="provider-registration" element={<ProviderRegistration />} />
      <Route
        path="booking/:id"
        element={
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        }
      />
      <Route
        path="company-service-booking/:id"
        element={
          <PrivateRoute>
            <CompanyBookingPage />
          </PrivateRoute>
        }
      />

      <Route path="contact" element={<ContactUs />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-&-condition" element={<TermsConditions />} />
      <Route path="cancellation-&-refunds" element={<RefundCancellationPolicy />} />
      <Route path="ProviderSuccess" element={<ProviderSuccess />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
