"use client"

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Map Meal Page</h1>
      <p>
        오늘의 추천 요리
      </p>
      <p>
        레시피 요청 input
      </p>
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
    </div>
  );
}
