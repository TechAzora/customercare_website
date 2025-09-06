import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllVideos } from "../../ReduxToolkit/Slice/Video";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { commanbanner } from "../../components/Img/ImportedImage";
import CommanBanner from "../../components/Banners/CommanBanner";
import { Wrapper } from "../../components/ComponentsIndex";

const VideoPage = () => {
  const dispatch = useDispatch();
  const { Videos, status } = useSelector((state) => state.Video);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllVideos());
    }
  }, [dispatch, status]);

  const skeletonItems = Array(4).fill(null); // Skeleton to simulate 4 categories

  return (
    <>
      <CommanBanner children={commanbanner} heading={"Videos"} />
      <Wrapper className="container w-full mx-auto px-4 sm:px-2">
        <div className="mt-8 p-4 sm:p-6 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {status === "loading"
              ? skeletonItems.map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden shadow-md animate-pulse bg-white"
                  >
                    <div className="h-[180px] bg-gray-300 w-full"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                      <div className="h-8 bg-gray-300 rounded-full w-1/2 mx-auto mt-4"></div>
                    </div>
                  </div>
                ))
              : Videos.map((video, index) => (
                  <div key={index} className="px-2">
                    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                      <div className="relative w-full h-[180px]">
                        <iframe
                          src={video.link}
                          title={video.title}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-2xl"
                        ></iframe>
                      </div>
                      <div className="bg-white text-center">
                        <h3 className="font-semibold text-sm text-gray-800 hover:bg-blue-900 hover:text-white transition duration-300 bg-gray-100 py-2 px-4 rounded-b-lg">
                          {video.title || "Unnamed Video"}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default VideoPage;
