import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../components/ComponentsIndex";
import { getAllGallery } from "../../ReduxToolkit/Slice/Gallery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assets/Img/logo.svg";
import left from "../../../src/assets/Img/left.png";
import right from "../../../src/assets/Img/right.png";

// Custom Arrow Components
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={right}
      alt="Next"
      className={className}
      style={{ ...style, position: "absolute", width: "90px", height: "90px" }}
      onClick={onClick}
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      src={left}
      alt="Previous"
      className={className}
      style={{ ...style, position: "absolute", width: "90px", height: "90px", zIndex: 99 }}
      onClick={onClick}
    />
  );
};

const galleryApi = () => {
  // API call setup
  const dispatch = useDispatch();
  const { galleries, status } = useSelector((state) => state.gallery);

  // Fetch gallery items on component load
  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllGallery());
    }
  }, [dispatch, status]);

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      {galleries?.data && galleries.data.length > 0 ? (
        <Slider {...settings}>
          {galleries.data.map((gallery, index) => (
            <div key={index} className="px-5 py-10">
              <div className="flex">
                <div className="card-slider w-full">
                  <div className="bg-[#06B13D] rounded-xl">
                    <img
                      className="h-64 bg-cover w-full object-cover rounded-xl"
                      src={gallery.Image}
                      alt="Gallery Item"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div>No stories available</div>
      )}
    </div>
  );
};

export default galleryApi;
