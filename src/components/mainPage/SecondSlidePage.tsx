"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SecondSlidePage = () => {
  const slideNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [slideNum, setSlideNum] = useState(slideNums);
  console.log("slideNum", slideNum);
  return (
    <div className="p-3">
      <Swiper
        slidesPerView={8}
        spaceBetween={30}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slideNum.map((slide: any, i: any) => (
          <SwiperSlide key={i}>
            <div className="w-[260px] h-[180px] bg-slate-400">{slide}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SecondSlidePage;
