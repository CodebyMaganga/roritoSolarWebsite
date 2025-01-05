import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from 'swiper/modules';
import Tabs from "../utils/tabs";

const IntroCarousel = () => {


  const tabData = [
    { label: "Home", content: <p className="text-white">Welcome to the Home tab!</p> },
    { label: "Profile", content: <p>Here is your Profile tab content.</p> },
    { label: "Settings", content: <p>Manage your Settings here.</p> },
  ];

  return (
    <div className="h-screen text-black">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        
        className="h-screen"
      >
        <SwiperSlide>
          <div className="intro-slide h-screen relative">
            {/* Video Background */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="/solarPanel.mp4"
              autoPlay
              loop
              muted
            />
            {/* Slide Content */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full">
            <h1 className="text-4xl font-bold">Empowering Your Future With <span className="text-[#FFA200]">Solar</span> <span className="text-[#FFEA00]">Energy</span></h1>
<p className="text-lg mt-4">Shop smarter, live greener, and harness the power of the sun.</p>

            </div>
            {/* Overlay for Better Contrast */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="intro-slide h-screen relative bg-[#FFEA00]">
        
            <div className="relative z-10 flex flex-col justify-center items-center  text-center text-white h-full">
            <Tabs tabs={tabData} />
            </div>
           
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
  
};

export default IntroCarousel;
