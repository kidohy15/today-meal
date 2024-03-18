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
  "/images/slide/slide2/above-view-delicious-food-still-life_23-2149178180.avif";
const img2 =
  "/images/slide/slide2/asian-cooked-beef-with-spring-onion-and-rice_219193-10698.jpg";
const img3 =
  "/images/slide/slide2/bean-paste-soup-in-korean-style_1150-42945.avif";
const img4 =
  "/images/slide/slide2/classic-spaghetti-bolognese-with-parmesan_140725-2273.avif";
const img5 =
  "/images/slide/slide2/close-up-of-food-in-plate-on-table_1048944-2346665.jpg";
const img6 =
  "/images/slide/slide2/composition-of-delicious-indonesian-bakso_23-2148933301.avif";
const img7 =
  "/images/slide/slide2/delicious-thai-food-still-life_23-2149508915.avif";
const img8 =
  "/images/slide/slide2/korean-food-jeyuk-bokkeum-or-fried-pork-in-korean-style-sauce_1150-42837.avif";
const img9 =
  "/images/slide/slide2/person-eating-chinese-food-from-a-black-plate-with-chopsticks_181624-27129.avif";
const img10 =
  "/images/slide/slide2/photo-basil-minced-pork-with-rice-and-fried-egg-food-photography_131346-140.avif";
const img11 =
  "/images/slide/slide2/spicy-meat-and-pork-boil-in-hot-pot_1150-42915.avif";
const img12 =
  "/images/slide/slide2/top-view-composition-of-delicious-poke-bowl_23-2148873843.avif";
const img13 =
  "/images/slide/slide2/top-view-delicious-vegetarian-meal_23-2149178175.avif";
const img14 =
  "/images/slide/slide2/top-view-over-chinese-hot-pot_23-2149529786.avif";
const img15 =
  "/images/slide/slide2/top-view-over-hotpot-dishes_23-2149563775.avif";

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

const SecondSlidePage2 = () => {
  const [slideImages, setSlideImages] = useState(images);
  return (
    <div className="hidden lg:block p-1 h-[220px]">
      <Swiper
        dir="rtl"
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
              className="w-full w-min-[235px] h-full bg-center bg-no-repeat overflow-hidden m-1"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SecondSlidePage2;
