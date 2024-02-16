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
// import { Mousewheel, Pagination } from 'swiper';

const MainSlidePage = () => {
  return (
    <div className="h-[954px] relative">
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          {/* <div className="flex items-center w-full h-full bg-[#fff]"> */}
          <div className="h-full bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover p-1">
            {/* <div className="flex items-center w-full h-full bg-opacity-10 bg-[url('/images/textile-2918844_1280.jpg')] bg-center bg-cover bg-no-repeat"> */}
          </div>
          <div className="absolute inset-0 w-full h-full justify-end bg-green-300 brightness-50 opacity-75 z-10 clip-path-polygon"></div>
          <div className="absolute flex flex-col items-center justify-center  bottom-[20%] left-[9%] z-20">
            <p className="inline-block w-[220px] text-center text-3xl text-white mb-10">
              오늘 뭐 먹을지 고민이신가요?
            </p>
            <button className="bg-black p-4 h-[80px] text-xl text-white hover:bg-white hover:text-black ">
              레시피 추천받으러 가기!
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full flex flex-col justify-between">
            <SecondSlidePage />
            {/* <div className="bg-red-100 h-full text-center leading-[350px] text-4xl"> */}
            <div className="bg-[url('/images/depositphotos_217128602-stock-photo-top-view-blue-tablecloth-left1.jpg')] h-full text-center leading-[350px] text-4xl">
              <p className="h-[240px]">더 많은 레시피를 확인하세요!</p>
              <button className="block mt-1 w-[320px] mx-auto h-[72px] text-white bg-black text-xl hover:bg-white hover:text-black hover:text-xl">
                레시피 등록
              </button>
            </div>
            <SecondSlidePage />
          </div>
          {/* <div className="h-full bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover p-1"></div> */}
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover p-1">
            {/* <OpenaiCook /> */}
            <div className="flex flex-wrap w-[1080px] w-max-[1280px] mx-auto justify-center gap-12 mt-12 p-16 bg-[#f4f4f4]">
              {/* <div className="bg-white w-[500px] h-[300px] rounded-md text-center	leading-[300px] "> */}
              <div className="bg-white w-[400px] h-[150px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">OpenAI</span>를 통한 다양한
                  레시피 제공!
                </p>
              </div>
              <div className="bg-white w-[400px] h-[150px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  냉장고 <span className="text-green-500">남은 재료</span> 걱정
                  노노
                </p>
              </div>
              <div className="bg-white w-[400px] h-[150px] rounded-lg text-center leading-[70px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  AI 를 능가하는
                  <span className="text-green-500"> 나만의 레시피</span> 가
                  있다면 공유해주세요
                </p>
              </div>
              <div className="bg-white w-[400px] h-[150px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">다양한 이벤트를</span>를 통한
                  정보 제공
                </p>
              </div>
              <div className="bg-white w-[400px] h-[150px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">날짜별 추천 요리</span>를
                  확인해보세요!
                </p>
              </div>
              <div className="bg-white w-[400px] h-[150px] rounded-lg text-center leading-[150px] text-2xl font-semibold">
                <p className="whitespace-pre-wrap">
                  <span className="text-green-500">다른 사용자</span>의 레시피
                  노하우를 확인해보세요 !
                </p>
              </div>
            </div>
            <div className="mt-10 w-[700px] mx-auto text-slate-50 text-center">
              <p className="text-4xl font-semibold">
                나만의 맛있는 레시피를 공유해주세요 !
              </p>
              <button className="block mt-5 w-[320px] mx-auto h-[72px] bg-black text-xl hover:bg-white hover:text-black hover:text-xl">
                레시피 등록
              </button>
            </div>
          </div>
        </SwiperSlide>
        <div className="w-[1320px] mx-auto">
          <div className="w-full h-[100px] bg-slate-500">Footer 영역입니다</div>
        </div>
      </Swiper>
    </div>
  );
};

export default MainSlidePage;
