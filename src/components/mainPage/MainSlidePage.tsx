"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SecondSlidePage from "./SecondSlidePage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import Swiper styles
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// import required modules
import { Mousewheel } from "swiper/modules";
import Link from "next/link";
import SecondSlidePage2 from "./SecondSlidePage2";
// import SideNavbar from "./SideNavbar";
import { Swiper as SwiperType } from "swiper/types";

const MainSlidePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <div className="relative h-full">
      {/* <div>
        <SideNavbar activeSlide={activeSlide} />
      </div> */}
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <div className="relative h-full w-full flex justify-center items-center bg-[url('/images/main-slide1.jpg')] bg-cover p-1">
            <div className="pb-[320px] sm:pb-[200px]">
              <p className="mt-56 text-8xl font-bold text-lime-300 text-shadow">
                Yummy Recipe
              </p>
              <p className="mt-10 text-3xl font-semibold text-lime-200 text-shadow">
                Create an amazing dish
                <br />
                with the remaining ingredients in your refrigerator.
                <br />
                The best food, the best day, the best life.
                <br />
                Enjoy a fantastic mealtime.
              </p>
            </div>
          </div>
          <div className="hidden lg:block absolute inset-0 w-full h-full justify-end bg-gray-100 brightness-50 opacity-75 z-10 clip-path-polygon"></div>
          <div className="absolute bottom-[8%] sm:bottom-[16%] lg:bottom-[12%] w-[260px] right-[50%] mr-[-130px] lg:left-10 flex flex-col items-center justify-center z-20 ">
            <p className="hidden lg:inline-block w-[320px] text-center text-xl text-white mb-5">
              오늘 무엇을 먹을지 <br />
              고민이라면 ?!
            </p>
            <Link
              className="block w-[260px] mx-auto bg-black p-3 mt-1 text-xl text-white hover:bg-white hover:text-black hover:font-semibold"
              href={"/recipe/todayMeal"}
            >
              레시피 추천받으러 가기!
            </Link>
            <div className="sm:hidden">
              <Link
                className="block w-[260px] sm:bottom-12 mx-auto bg-black p-3 mt-1 text-xl text-white hover:bg-white hover:text-black hover:font-semibold"
                href={"/recipe/new"}
              >
                레시피 등록하러 가기!
              </Link>
              <Link
                className="block w-[260px] sm:bottom-12 mx-auto bg-black p-3 mt-1 text-xl text-white hover:bg-white hover:text-black hover:font-semibold"
                href={"/recipe/"}
              >
                레시피 목록 확인하기!
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* <div className="relative flex flex-col justify-center h-full w-full bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover p-1 overflow-hidden"> */}
          <div className="relative flex flex-col justify-center h-full w-full bg-[url('/images/main-slide2.avif')] bg-cover p-1 overflow-hidden">
            <div className="hidden lg:block absolute inset-0 w-full h-full justify-end bg-amber-500 brightness-50 opacity-75 clip-path-polygon3 z-0"></div>
            <div className="relative hidden xl:flex flex-wrap md:w-[760px] xl:h-[520px] xl:w-[980px] mx-auto justify-center gap-8 mt-24 p-8 bg-[#f4f4f4] z-10">
              <div className="bg-white xl:w-[420px] h-[100px] rounded-lg text-center xl:leading-[112px] xl:text-xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">OpenAI</span>를 통한 다양한
                  레시피 제공!
                </p>
              </div>
              <div className="bg-white xl:w-[420px] h-[100px] rounded-lg text-center xl:leading-[112px] xl:text-xl font-semibold">
                <p className="whitespace-pre-wrap">
                  냉장고 <span className="text-green-500">남은 재료</span> 걱정
                  노노
                </p>
              </div>
              <div className="bg-white xl:w-[420px] h-[100px] rounded-lg text-center xl:leading-[50px] xl:text-xl font-semibold">
                <p className="whitespace-pre-wrap">
                  AI 를 능가하는
                  <span className="text-green-500"> 나만의 레시피</span> 가
                  있다면 <br /> 공유해주세요
                </p>
              </div>
              <div className="bg-white xl:w-[420px] h-[100px] rounded-lg text-center xl:leading-[112px] xl:text-xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">다양한 이벤트를</span>를 통한
                  정보 제공
                </p>
              </div>
              <div className="bg-white xl:w-[420px] h-[100px] rounded-lg text-center xl:leading-[112px] xl:text-xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">날짜별 추천 요리</span>를
                  확인해보세요!
                </p>
              </div>
              <div className="bg-white xl:w-[420px] h-[100px] rounded-lg text-center xl:leading-[112px] xl:text-xl font-semibold ">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">다른 사용자</span>의 레시피
                  노하우를 확인해보세요 !
                </p>
              </div>
            </div>
            <div className="mt-5 w-full sm:w-[700px] mx-auto text-slate-50 text-center z-20">
              <p className="text-4xl font-semibold">
                나만의 맛있는 레시피를 <br /> 공유해주세요 !
              </p>
              <Link
                className="block mt-5 mb-28 xl:mb-0 p-4 w-[320px] mx-auto bg-black text-xl hover:bg-white hover:text-black hover:text-xl hover:font-semibold"
                href={"/recipe/new"}
              >
                레시피 등록
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex flex-col justify-between">
            <SecondSlidePage />
            {/* <div className="relative bg-[url('/images/wood-texture-background-rough-vintage-wooden-table-brown-timber-for-backdrop-top-view_230497-3208.avif')] h-full text-center leading-[350px] text-4xl bg-cover bg-center z-0"> */}
            <div className="relative bg-[url('/images/main-slide3.avif')] h-full text-center leading-[350px] text-4xl bg-cover bg-center z-0">
              <div className="hidden lg:block absolute inset-0 left-[-100%] justify-end bg-green-200 brightness-50 opacity-75 z-10 clip-path-polygon2"></div>
              <p className="mt-80 md:mt-72 lg:mt-40 text-4xl font-bold text-shadow">
                더 많은 레시피를 확인하세요!
              </p>
              <Link
                className="block mt-12 p-4 w-[320px] mx-auto text-white bg-black text-xl hover:bg-white hover:text-black hover:text-xl hover:font-semibold"
                href={"/recipe"}
              >
                레시피 목록 확인
              </Link>
            </div>
            <SecondSlidePage2 />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSlidePage;
