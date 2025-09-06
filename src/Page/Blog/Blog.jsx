import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getallBlog } from "../../ReduxToolkit/Slice/Blog";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Wrapper } from "../../components/ComponentsIndex";
import CommanBanner from "../../components/Banners/CommanBanner";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs, status } = useSelector((state) => state.blog);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getallBlog());
    }
  }, [dispatch, status]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
     <Wrapper className="container mx-auto p-5">
      {/* Heading */}
      <div className="text-center mb-6">
        <Heading className="text-2xl md:text-3xl font-bold text-black mb-2">
           Blogs 
        </Heading>
        {/* <p className="text-gray-600 text-sm md:text-base max-w-3xl text-center">
          Unparalleled Luxury and Opulence with our Exclusive High-End Amenities & Luxe Experience at our Luxury Resort Villas in North Goa For Rent with Private Pool.
        </p> */}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {status === "loading"
          ? Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md">
                <Skeleton height={250} />
                <div className="p-4">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={14} width="60%" className="mt-2" />
                </div>
              </div>
            ))
          : blogs.data?.slice(0, 4).map((blog) => (
            <Link
              to={`/blog/${blog.slugUrl}`}
              key={blog._id}
              className="relative rounded-xl overflow-hidden shadow-md group hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={blog.image}
                alt={blog.blogTitle}
                className="w-full h-[420px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-5 text-white">
                <h3 className="text-lg font-bold mb-1">{blog.blogTitle}</h3>
                <p
                  className="text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: blog.description.length > 70
                      ? blog.description.slice(0, 70) + '...'
                      : blog.description
                  }}
                ></p>

              </div>
            </Link>
          ))}
      </div>
    </Wrapper>
    </>
   
  );
};

export default Blog;
