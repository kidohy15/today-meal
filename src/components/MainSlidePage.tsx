"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
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
    <div>
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
          Slide 1{/* 2b1f13 */}
          <div className="flex items-center w-full h-full bg-[#fff]">
            {/* <div className="flex items-center w-full h-full bg-opacity-10 bg-[url('/images/textile-2918844_1280.jpg')] bg-center bg-cover bg-no-repeat"> */}
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>
          Slide 3
          <div className="h-full mt-10 bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover p-16">
            {/* <OpenaiCook /> */}
            <div className="flex flex-wrap w-[1080px] w-max-[1280px] mx-auto justify-center gap-12 mt-20 p-20 bg-[#f4f4f4]">
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
              <button className="block mt-10 w-[320px] mx-auto h-[72px] bg-black text-xl hover:bg-white hover:text-black hover:text-xl">
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
