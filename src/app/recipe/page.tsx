"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { Router, useRouter } from "next/router";
import { useRouter } from "next/navigation";
import SearchFilter from "@/components/SearchFilter";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Pagination from "@/components/Pagination";

interface RecipeListProps {
  params: { id: string; page: string };
}

// const RecipeListPage = ({ params }: RecipeListProps) => {
const RecipeListPage = () => {
  const router = useRouter();
  // const id = params.id;
  // const { page="1" }: { page?: string } = params;
  // const page = params?.page || "1";
  // const params = useParams()
  // const { page = "1" }: { page?: string } = params;
  const searchParams = useSearchParams();
  const page: any = searchParams.get("page") ?? "1";

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(searchParams);

  console.log("========= params", searchParams);
  console.log("========= router", router);
  console.log("========= page", page);

  // const { page = "0 " } = router.query;
  const [writer, setWriter] = useState<any>("");
  const [maskedUsername, setMaskedUsername] = useState("");

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("searchparams 입력값", searchKeyword);

  const recipesData = async () => {
    const res = await axios.get(`/api/recipe?page=${page}`, {
      params: {
        searchKeyword: searchKeyword,
      },
    });
    const result = res?.data;
    console.log("================= result", result);

    return result;
  };

  const { data: recipes, isLoading } = useQuery({
    queryKey: [`recipes-${page}`, searchKeyword],
    queryFn: recipesData,
  }); // 데이터는 data 속성에 있다

  const totalPage: any = parseInt(recipes?.totalPage, 10);

  // 함수 추가: 작성자 정보를 마스킹 처리
  const maskWriter = (writer: any) => {
    if (!writer) return ""; // writer가 없을 경우 빈 문자열 반환

    const atIndex = writer.indexOf("@");
    const username = writer.slice(0, atIndex);
    return atIndex !== -1
      ? username.slice(0, 3) + "*".repeat(username.length - 3)
      : writer;
  };

  return (
    //
    <div className="w-full h-full pt-[96px]">
      <div className="px-8 py-12 md:max-w-6xl mx-auto h-full bg-white">
        <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
          레시피 목록
        </h2>
        <SearchFilter setSearchKeyword={setSearchKeyword} />
        <ul role="list" className="pt-2 flex flex-col">
          {isLoading ? (
            <div>로딩중입니다.</div>
          ) : (
            recipes?.data?.map((recipe: any, index: any) => (
              <li
                className="flex justify-between gap-x-6 h-[160px] py-6 border border-solid border-gray-200 px-4 my-2 cursor-pointer z-10"
                key={index}
                onClick={() => router.push(`/recipe/${recipe.id}`)}
              >
                <div className="flex gap-x-4">
                  <div className="w-24 h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                    이미지
                  </div>
                  <div>
                    <div className="text-3xl font-semibold leading-6 text-gray-900 py-2">
                      {recipe.title}
                    </div>
                    <div className="mt-1 text-xl truncate font-semibold leading-5 text-gray-500 py-2">
                      {recipe.ingredients}
                    </div>
                    <div className="mt-1 text-xl truncate font-semibold leading-5 text-gray-500 py-2">
                      {recipe.contents}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {maskWriter(recipe?.writer)}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {new Date(recipe?.createdAt)?.toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="py-10">
          <Pagination page={page} totalPage={totalPage} pathname={`/recipe`} />
        </div>
      </div>
    </div>
  );
};

export default RecipeListPage;
