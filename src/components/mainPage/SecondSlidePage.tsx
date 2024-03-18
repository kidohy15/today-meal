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
  "/images/slide/slide1/a-dish-of-grilled-meat-on-the-black-wooden-surface-top-view_508835-5944.avif";
const img2 =
  "/images/slide/slide1/bibimbap-on-a-dark-concrete-background-traditional-korean-dish-top-view_233226-997.jpg";
const img3 =
  "/images/slide/slide1/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42992.avif";
const img4 =
  "/images/slide/slide1/close-up-on-delicious-asian-food_23-2149091611.avif";
const img5 =
  "/images/slide/slide1/grilled-pork-served-with-sauce-in-korean-style_1150-42934.avif";
const img6 =
  "/images/slide/slide1/high-protein-meal-close-up-detail_23-2149098887.avif";
const img7 =
  "/images/slide/slide1/korean-food-fried-rice-with-kimchi-serve-with-fried-egg_1150-42929.avif";
const img8 =
  "/images/slide/slide1/noodle-pasta-with-vegetables-and-egg-on-bowl-top-view_116380-113.avif";
const img9 =
  "/images/slide/slide1/offal-with-sweet-pepper-and-green-beans-on-a-white-plate_171081-216.avif";
const img10 =
  "/images/slide/slide1/portion-of-asian-sweet-and-sour-shrimp-with-rice_219193-10611.jpg";
const img11 =
  "/images/slide/slide1/restaurant-food-restaurant-menu-photos-for-the-menu_830198-1280.jpg";
const img12 =
  "/images/slide/slide1/seafood-salad-with-crabsters-and-cherry-tomatoes_114579-1718.avif";
const img13 =
  "/images/slide/slide1/stir-fried-pork-with-korean-sauce-on-dark-background_1150-37952.avif";
const img14 =
  "/images/slide/slide1/thai-food_181624-35416.avif";
const img15 =
  "/images/slide/slide1/tofu-and-yolk-boiled-in-spicy-soup_1150-42895.avif";

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
  return (
    <div className="hidden lg:block p-1 h-[220px]">
      <Swiper
        slidesPerView={8}
        spaceBetween={1}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {slideImages.map((image: string, i: number) => (
          <SwiperSlide key={i} className="w-full w-min-[235px]">
            <div
              // w-[235px] h-[180px]
              className="w-full w-min-[235px] h-full bg-center bg-no-repeat overflow-hidden m-1"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SecondSlidePage;
