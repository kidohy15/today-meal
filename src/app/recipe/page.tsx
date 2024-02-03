"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const RecipeListPage = () => {
  const recipe = async () => {
    return axios.get("/api/recipe");
  };
  const { data:recipes } = useQuery({ queryKey: ["recipe"], queryFn: recipe }); // 데이터는 data 속성에 있다

  console.log("result", recipes);
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y devide-gray-100">
        {recipes?.data?.map((recipe:any, index:any) => (
          <li className="flex justify-between gap-x-6 py-5" key={index}>
            <div className="flex gap-x-4">
              <div>이미지 자리</div>
              <div>
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {recipe?.title}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {recipe?.content}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                {recipe?.writer}
              </div>
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                {recipe?.createdAt}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeListPage;
