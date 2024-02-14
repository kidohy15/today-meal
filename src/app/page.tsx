"use client";

import Layout from "@/components/Layout";
import OpenaiRecipe from "@/components/openai/OpenaiRecipe";
import OpenaiCook from "@/components/openai/OpenaiCook";
import Link from "next/link";
import { useEffect } from "react";
// import { QueryClient } from "react-query";

export default function Home() {
  // const queryClient = new QueryClient();
  useEffect(() => {
    console.log("start");
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full h-screen bg-opacity-10 bg-[url('/images/MYH20180715003800038.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="text-slate-300 w-full">
          냉장고에 남은 재료로 최고의 요리를 만들어 보아요!
        </div>
        <OpenaiRecipe />
      </div>
      <div className="h-screen bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover">
        <h1 className="text-slate-300">오늘의 추천 요리</h1>
        {/* <OpenaiCook /> */}
      </div>

      <div className="w-full h-[100px] bg-slate-500">Footer 영역입니다</div>
    </div>
  );
}
