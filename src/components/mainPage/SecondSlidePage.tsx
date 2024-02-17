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

const img1 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZi6JvsjNbsAu35vfRDA_2c__xzDzP6dD8ww&usqp=CAU";
const img2 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKuLP6B8S4AYye8i67-d35clvfYXMsY0Bi5w&usqp=CAU";
const img3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFQi-aHb6DGpURPRq79vwS4f2iEVwc-HIMA&usqp=CAU";
const img4 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKuLP7B9DPR4_gr4X9hs0O4ZsOZuB6KFjW-A&usqp=CAU";
const img5 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvVYFLPFxQ35LMgob9pu2j8tka0hhoCi1h5g&usqp=CAU";
const img6 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCpISk1gMD1BTE7TII4teFLHapbCn3ebT_Cw&usqp=CAU";
const img7 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD6lD1HJT9C-RbYdCI8UctihUBeYxGTiUnLg&usqp=CAU";
const img8 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBqLbPfJ09Nw8dJd9xCCZ_q-TBgH13FLX0w&usqp=CAU";
const img9 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe5ko14Beyj3wrUpQgAz6VxS-54iT85ufvjQ&usqp=CAU";
const img10 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSne-KMXnhUqmq3YaL-CT50GQvOXEsdYksjtw&usqp=CAU";
const img11 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0768iaqsaa-gM7m-OAWUhJ6dFCeSceIa1Q&usqp=CAU";
const img12 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK0P7BWky1xbhD2tt-qVMAHY35c6nFa1J2ITWOUyGWT34OJHrghBOmGwE5T56WuNU2IXQ&usqp=CAU";
const img13 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKmr6zKwTTkNDto9lIlnje_kzkT9FdA6coeUoA2-4o6smeZsmiL6TTOzbJ3uXqIU1CW4o&usqp=CAU";
const img14 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfDHt_USVEXECVXriVeeAO8tjQEb4jmiSrA&usqp=CAU";
const img15 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkkpQ347UISu6Nl0LC3RgsWwXqGpRXbJtg5A&usqp=CAU";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const SecondSlidePage = () => {
  // const slideNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [slideImages, setSlideImages] = useState(images);
  console.log("slideImages", slideImages);
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
        {slideImages.map((image: any, i: any) => (
          <SwiperSlide key={i}>
            <div
              className="w-[260px] h-[180px]"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SecondSlidePage;
