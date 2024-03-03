"use client";

import Pagination from "@/components/Pagination";
import Comments from "@/components/comments";
import Loader from "@/components/loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RecipeDetailPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  // const { id } = router.query;
  console.log("params", params);

  const [maskId, setMaskId] = useState("");

  const recipeData = async () => {
    const { data: data }: any = await axios.get(`/api/recipe?id=${id}`);
    writerId(data);
    // return await axios.get(`/api/recipe?id=${recipe.id}`);
    return data;
  };
  console.log("data 리턴 확인", recipeData);

  const { data: recipe, isLoading, isFetching } = useQuery({
    queryKey: [`recipe-${id}`],
    queryFn: recipeData,
    enabled: !!id,
  });

  useEffect(() => {}, []);

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

  const writerId = (data: any) => {
    const writer = data?.writer;
    if (writer) {
      const atIndex = writer.indexOf("@");
      const username = writer.slice(0, atIndex);
      const maskedUsername =
        username.slice(0, 3) + "*".repeat(username.length - 3);
      console.log("maskedUsername", maskedUsername);
      setMaskId(maskedUsername);
    }
  };

  if (isFetching) {
    return <Loader className="my-[20%]" />;
  }

  return (
    <div className="w-full h-full min-h-[100vh] pt-[112px]">
      <div className="shadow-lg md:max-w-6xl mx-auto h-full px-8 py-12 bg-white border-gray-400 border-2">
        <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
          {recipe?.title}
        </h2>
        <div className="flex flex-col p-10">
          <div className="flex justify-between">
            <div className="mb-8">
              <span className="text-lg font-semibold">작성자</span>
              {/* <p>{recipe?.writer}</p> */}
              <div>{maskId}</div>
            </div>
            <div className="mt-1 text-xm font-semibold leading-5 text-gray-500">
              <span className="">생성일</span>
              {new Date(recipe?.createdAt)?.toLocaleDateString()}
            </div>
            {/* <div>
            <h2 className="text-lg font-semibold">등록 날짜</h2>
            <p>{recipe?.createdAt}</p>
          </div> */}
          </div>
          <div className="mb-8">
            <span className="text-lg font-semibold">재료</span>
            <div>{recipe?.ingredients}</div>
          </div>
          <div className="mb-8">
            <span className="text-lg font-semibold">과정</span>
            <div>{recipe?.contents}</div>
          </div>

          <div className="flex justify-end my-2 gap-2">
            <button
              className="block bottom-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              className="block bottom-2 right-2 px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
        <div className="my-10">
          <h3 className="px-3 py-2 text-base font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-gray-100">
            댓글
          </h3>
          {/* 댓글 */}
          {recipe?.id && (
            <div>
              <Comments recipeId={recipe?.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
