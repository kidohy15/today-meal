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
      <div className="h-screen bg-[url('/images/peking-roast-duck-recipe-food-on-dish-ai-generated_848903-845.avif')] bg-cover">
        <h1 className="text-slate-300">오늘의 추천 요리</h1>
        <OpenaiCook />
      </div>
      <div className="w-full h-screen bg-opacity-10 bg-[url('/images/MYH20180715003800038.jpg')] bg-center bg-cover bg-no-repeat">
        <div className="text-slate-300 w-full">
          냉장고에 남은 재료로 최고의 요리를 만들어 보아요!
        </div>
        <OpenaiRecipe />
      </div>
      <ul>
        <li>
          <Link href={"/recipe"}>레시피 목록</Link>
        </li>
        <li>
          <Link href={"/recipe/new"}>레시피 등록</Link>
        </li>
        <li>
          <Link href={"/users/likes"}>레시피 찜 페이지</Link>
        </li>
        <li>
          <Link href={"/users/mypage"}>마이 페이지</Link>
        </li>
        <li>
          <Link href={"/users/login"}>로그인 페이지</Link>
        </li>
      </ul>
      <div>
        테스트 영역입니다
        {/* {fetchData} */}
      </div>
    </div>
  );
}
