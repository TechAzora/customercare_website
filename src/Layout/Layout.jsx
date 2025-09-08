import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Navbar } from "../components/ComponentsIndex";
import Footer from "../components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../TopToScroll";
import ConvaiWidget from "../components/Chat/ConvaiWidget";


function Layout() {
  return (
    <>
      <ToastContainer />
      <Container className="w-full">
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
       <ConvaiWidget/>
      </Container>
    </>
  );
}

export default Layout;
