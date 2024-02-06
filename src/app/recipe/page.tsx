"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { Router, useRouter } from "next/router";
import { useRouter } from "next/navigation";

const RecipeListPage = () => {
  const router = useRouter();
  // useEffect(() => {
  // }, [])

  const recipesData = async () => {
    return await axios.get("/api/recipe");
  };

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: recipesData,
  }); // 데이터는 data 속성에 있다
  console.log("목록 페이지 recipes", recipes);
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="py-2">
        {isLoading ? (
          <div>로딩중입니다.</div>
        ) : (
          recipes?.data?.map((recipe: any, index: any) => (
            <li
              className="flex justify-between gap-x-6 h-[160px] py-5 border border-solid border-gray-200 px-4 mb-2 cursor-pointer"
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
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {recipe.writer}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {recipe.createdAt}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipeListPage;
