"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { Router, useRouter } from "next/router";
import { useRouter } from "next/navigation";
import SearchFilter from "@/components/SearchFilter";
import { useSession } from "next-auth/react";

const RecipeListPage = () => {
  const router = useRouter();
  // const { data, status } = useSession();
  const [maskedUsername, setMaskedUsername] = useState("");

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    writerId();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recipesData = async () => {
    const result = await axios.get("/api/recipe", {
      params: {
        searchKeyword: searchKeyword,
      },
    });
    console.log("result", result);
    return result;
  };

  console.log("searchparams", searchKeyword);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes", searchKeyword],
    queryFn: recipesData,
  }); // 데이터는 data 속성에 있다

  const writerId = () => {
    const writer = recipes?.data?.writer;
    console.log("writer", writer);
    if (writer) {
      const atIndex = writer.indexOf("@");
      if (atIndex) {
        const username = writer.slice(0, atIndex);
        const maskedUsername =
          username.slice(0, 3) + "*".repeat(username.length - 3);
        console.log("maskedUsername", maskedUsername);
        setMaskedUsername(maskedUsername);
      } else {
        const username = writer.slice(0, 3);
        const maskedUsername =
          username.slice(0, 3) + "*".repeat(username.length - 3);
        console.log("maskedUsername", maskedUsername);
        setMaskedUsername(maskedUsername);
      }
    }
  };

  console.log("목록 페이지 writerId", writerId());
  console.log("목록 페이지 recipes", recipes);
  return (
    // <div className="bg-[url('/images/19558288.jpg')]">
    // <div className="bg-[#FFFAFA]">
    <div className="fixed w-full h-full bg-[url('/images/menu_beaver_resize.jpg')] bg-cover">
      <div className="absolute inset-0 bg-black brightness-50 w-full h-full w-min-[860px] opacity-25"></div>
      <div className="px-4 md:max-w-4xl mx-auto py-12 h-full bg-white relative z-10">
        <SearchFilter setSearchKeyword={setSearchKeyword} />
        <ul role="list" className="pt-2">
          {isLoading ? (
            <div>로딩중입니다.</div>
          ) : (
            recipes?.data?.map((recipe: any, index: any) => (
              <li
                className="flex justify-between gap-x-6 h-[160px] py-5 border border-solid border-gray-200 px-4 mb-2 cursor-pointer z-10"
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
                <div className="sm:flex sm:flex-col sm:items-end">
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {recipe.writer}
                    {maskedUsername}
                  </div>
                  <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                    {new Date(recipe?.createdAt)?.toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default RecipeListPage;
