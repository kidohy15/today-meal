"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EditPageProps {
  params: { id: string };
}

const EditPage = ({ params }: EditPageProps) => {
  const router = useRouter();
  const id = params.id;

  const recipeData = async () => {
    const { data: data } = await axios.put(`/api/recipe?id=${id}`);
    return data;
  };

  const {
    data: recipe,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [`recipe-${id}`],
    queryFn: recipeData,
    enabled: !!id,
  });

  console.log("edit recipe", recipe);

  if (isSuccess) {
    (recipe: any) => {
      setValue("writer", recipe.writer);
      setValue("title", recipe.title);
      setValue("createdAt", recipe.createdAt);
      setValue("ingredients", recipe.ingredients);
      setValue("contents", recipe.contents);
    };
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>();

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center bg-[url('/images/istockphoto-1402841412-612x612.jpg')] bg-cover bg-center">
      {/* <div className=" w-[1250px] h-[1250px] bg-[url('/images/301029217_PJ72317.jpg')] bg-cover bg-center"> */}
      <form
        className="bg-[#FFFAF0] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl bottom-0"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);

          try {
            const result = await axios.post("/api/recipe", data);
            console.log("result", result);

            if (result.status === 200) {
              // 레시피 등록 성공
              toast.success("레시피를 수정했습니다.");
            } else {
              // 레시피 등록 실패
              toast.error("다시 시도해주세요.");
            }
          } catch (error) {
            console.log(error);
            toast.error(
              "레시피 생성 중 문제가 발생했습니다. 다시 시도해주세요."
            );
          }
        })}
      >
        <div className="mb-4">
          <label
            htmlFor="writer"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            작성자
          </label>
          <input
            id="writer"
            type="text"
            {...register("writer", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.writer?.type === "required" && (
            <p className="text-xs text-red-500 pt-2">필수 입력사항입니다.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            레시피 제목
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.title?.type === "required" && (
            <p className="text-xs text-red-500 pt-2">필수 입력사항입니다.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            재료
          </label>
          <textarea
            id="ingredients"
            {...register("ingredients", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.ingredients?.type === "required" && (
            <p className="text-xs text-red-500 pt-2">필수 입력사항입니다.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="contents"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            과정
          </label>
          <textarea
            id="contents"
            {...register("contents", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors?.contents?.type === "required" && (
            <p className="text-xs text-red-500 pt-2">필수 입력사항입니다.</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            등록
          </button>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

export default EditPage;
