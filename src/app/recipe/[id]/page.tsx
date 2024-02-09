"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

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

    const { data: data }: any = await axios.get(`/api/recipe?id=${id}`);
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

  // 수정
  const handleEdit = () => {
    router.push(`/recipe/${id}/edit`);
  };

  // 삭제
  const handleDelete = async () => {
    const confirm = window.confirm("해당 레시피를 삭제하겠습니까?");

    if (confirm) {
      try {
        const result = await axios.delete(`/api/recipe?id=${recipe.id}`);

        // 삭제 성공하면 메인 페이지로 이동
        if (result.status === 200) {
          toast.success("레시피를 삭제했습니다.");
          router.replace("/");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (error) {
        console.log(error);
        toast.error("다시 시도해주세요.");
      }
    }
  };

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
        <div className="flex flex-col md:flex-row justify-between mb-10">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">작성자</h2>
            <p>{recipe?.writer}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">등록 날짜</h2>
            <p>{recipe?.createdAt}</p>
          </div>
        </div>
        <div className="flex justify-end my-2 gap-2">
          <button
            className="block bottom-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleEdit}
          >
            수정
          </button>
          <button
            className="block bottom-2 right-2 px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
