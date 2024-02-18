"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SecondSlidePage from "./SecondSlidePage";
// import OpenaiRecipe from "@/components/openai/OpenaiRecipe";
// import OpenaiCook from "@/components/openai/OpenaiCook";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import Swiper styles
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// import required modules
import { Mousewheel, Pagination } from "swiper/modules";
import Link from "next/link";
import SecondSlidePage2 from "./SecondSlidePage2";
// import { Mousewheel, Pagination } from 'swiper';

const MainSlidePage = () => {
  return (
    // h-[954px]
    <div className="relative h-full pt-[96px]">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="mySwiper"
      >
        <SwiperSlide>
          {/* <div className="flex items-center w-full h-full bg-[#fff]"> images2*/}
          {/* peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif*/}
          <div className="h-full flex justify-center items-center bg-[url('/images/tapas-table.jpg')] bg-cover p-1">
            {/* <div className="flex items-center w-full h-full bg-opacity-10 bg-[url('/images/textile-2918844_1280.jpg')] bg-center bg-cover bg-no-repeat"> */}
            <div className="pb-[200px]">
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
          <div className="absolute inset-0 w-full h-full justify-end bg-gray-100 brightness-50 opacity-75 z-10 clip-path-polygon"></div>
          <div className="absolute flex flex-col items-center justify-center bottom-[20%] left-[9%] z-20">
            <p className="inline-block w-[320px] text-center text-xl text-white mb-5">
              오늘 무엇을 먹을지 고민이라면 ?!
            </p>
            <Link
              className="bg-black p-4 text-xl text-white hover:bg-white hover:text-black hover:font-semibold"
              href={"/recipe/todayMeal"}
            >
              레시피 추천받으러 가기!
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {/* peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif */}
          {/* zrownowazone-jedzenie-dieta-tlo-700-130630474 */}
          <div className="relative flex flex-col justify-center h-full bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover p-1">
            {/* <OpenaiCook /> */}
            <div className="absolute inset-0  w-full h-full justify-end bg-amber-500 brightness-50 opacity-75 clip-path-polygon3 z-0"></div>
            <div className="relative flex flex-wrap w-[1080px] w-max-[1280px] mx-auto justify-center gap-12 mt-12 p-12 bg-[#f4f4f4] z-10">
              {/* <div className="bg-white w-[500px] h-[300px] rounded-md text-center	leading-[300px] "> */}
              <div className="bg-white w-[450px] h-[120px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">OpenAI</span>를 통한 다양한
                  레시피 제공!
                </p>
              </div>
              <div className="bg-white w-[450px] h-[120px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  냉장고 <span className="text-green-500">남은 재료</span> 걱정
                  노노
                </p>
              </div>
              <div className="bg-white w-[450px] h-[120px] rounded-lg text-center leading-[70px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  AI 를 능가하는
                  <span className="text-green-500"> 나만의 레시피</span> 가
                  있다면 공유해주세요
                </p>
              </div>
              <div className="bg-white w-[450px] h-[120px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">다양한 이벤트를</span>를 통한
                  정보 제공
                </p>
              </div>
              <div className="bg-white w-[450px] h-[120px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">날짜별 추천 요리</span>를
                  확인해보세요!
                </p>
              </div>
              <div className="bg-white w-[450px] h-[120px] rounded-lg text-center leading-[150px] text-2xl font-semibold ">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">다른 사용자</span>의 레시피
                  노하우를 확인해보세요 !
                </p>
              </div>
            </div>
            <div className="mt-10 w-[700px] mx-auto text-slate-50 text-center z-20">
              <p className="text-4xl font-semibold">
                나만의 맛있는 레시피를 공유해주세요 !
              </p>
              <Link
                className="block mt-5 p-4 w-[320px] mx-auto bg-black text-xl hover:bg-white hover:text-black hover:text-xl hover:font-semibold"
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
            {/* <div className="bg-red-100 h-full text-center leading-[350px] text-4xl"> */}
            {/* zrownowazone-jedzenie-dieta-tlo-700-130630474.jpg */}
            {/* 130543440-design-wooden-fork-and-spoon-on-wood-texture-background.jpg */}
            <div className="relative bg-[url('/images/wood-texture-background-rough-vintage-wooden-table-brown-timber-for-backdrop-top-view_230497-3208.avif')] h-full text-center leading-[350px] text-4xl bg-cover bg-center z-0">
              <div className="absolute inset-0 left-[-100%] justify-end bg-green-200 brightness-50 opacity-75 z-10 clip-path-polygon2"></div>
              <p className="mt-40 text-6xl font-bold text-shadow">
                더 많은 레시피를 확인하세요!
              </p>
              <Link
                className="block m-16 p-4 w-[320px] mx-auto text-white bg-black text-xl hover:bg-white hover:text-black hover:text-xl hover:font-semibold"
                href={"/recipe"}
              >
                레시피 목록 확인
              </Link>
            </div>
            <SecondSlidePage2 />
          </div>
          {/* <div className="h-full bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover p-1"></div> */}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainSlidePage;
