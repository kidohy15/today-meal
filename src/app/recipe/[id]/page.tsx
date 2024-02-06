"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RecipeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  // const { id } = router.query;

  // const [recipeId, setRecipeId] = useState<any>(searchParams.id)
  // const router = useRouter();
  // const { id } = router.query;

  console.log("params", params);
  console.log("id", id);
  // console.log("recipeId", recipeId);

  const recipeData = async () => {
    // console.log("recipe.id", recipe.id);

    const {data: data}: any = await axios.get(`/api/recipe?id=${id}`);
    // return await axios.get(`/api/recipe?id=${recipe.id}`);
    return data;
  };
  console.log("data 리턴 확인", recipeData);

  const { data: recipe, isLoading } = useQuery({
    queryKey: [`recipe-${id}`],
    queryFn: recipeData,
    enabled: !!id,
  });
  // console.log("recipe.id", recipe?.id);

  console.log("상세 페이지 recipe", recipe);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="min-w-[412px] bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">{recipe?.title}</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">재료</h2>
          <p>{recipe?.ingredients}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">과정</h2>
          <p>{recipe?.contents}</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">작성자</h2>
            <p>{recipe?.writer}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">등록 날짜</h2>
            <p>{recipe?.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
