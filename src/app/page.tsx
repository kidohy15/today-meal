"use client";

import Layout from "@/components/Layout";
import Openai from "@/components/openai/Openai3";
import Link from "next/link";

export default function Home() {
  const fetchData: any = getData(); 
  // console.log("fetchData", fetchData);

  return (
    <div className="w-[100%] h-[100%]">
      <h1>Map Meal Page</h1>
      <div className="h-[300px] bg-slate-500">오늘의 추천 요리</div>
      <div className="flex w-[100%] h-[520px] bg-zinc-600">
        레시피 요청 input
        <Openai />
      </div>
      <ul>
        <li>
          <Link href={"/recipe"}>레시피 목록</Link>
        </li>
        <li>
          <Link href={"/recipe/new"}>레시피 등록</Link>
        </li>
        <li>
          <Link href={"/recipe/1"}>레시피 상세</Link>
        </li>
        <li>
          <Link href={"/recipe/1/edit"}>레시피 수정</Link>
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


export async function getData() {
  // fetch 로 데이터 가져오는 방법
  // const stores = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  // ).then((res) => res.json());

  // axios 로 데이터 가져오는 방법
  const fetchData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fetch`, {
      cache: "no-store",
    }
  );

  return {
    props: { fetchData: fetchData },
    // revalidate: 60 * 60,
  };
}
