/* eslint-disable @next/next/no-img-element */
"use client";

import Comments from "@/components/comments";
import Loader from "@/components/loader";
import { RecipeType } from "@/interface";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RecipeDetailPage = ({ params }: { params: { id: string } }) => {
  const supabase = useSupabaseClient();
  const id = params.id;
  const router = useRouter();
  const { data: session, status } = useSession();

  const [maskId, setMaskId] = useState("");

  const recipeData = async () => {
    const { data: data } = await axios.get(`/api/recipe?id=${id}`);
    writerId(data);
    const imageName = await getImages(data.image);

    return { ...data, imagePath: imageName } as RecipeType;
  };

  const { data: recipe, isFetching } = useQuery({
    queryKey: [`recipe-${id}`],
    queryFn: recipeData,
    enabled: !!id,
  });

  useEffect(() => {}, []);

  // ==============================
  // 목록 이동 (로직 테스트, 삭제 하기)
  const handleList = () => {
    router.push(`/recipe`);
  };
  // ==============================

  // 수정
  const handleEdit = () => {
    router.push(`/recipe/${id}/edit`);
  };

  // 삭제
  const handleDelete = async () => {
    const confirm = window.confirm("해당 레시피를 삭제하겠습니까?");

    if (confirm) {
      try {
        const result = await axios.delete(`/api/recipe?id=${recipe?.id}`);

        // 삭제 성공하면 메인 페이지로 이동
        if (result.status === 200) {
          toast.success("레시피를 삭제했습니다.");
          router.replace("/recipe");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (error) {
        console.log(error);
        toast.error("다시 시도해주세요.");
      }
    }
  };

  const writerId = (data: RecipeType) => {
    const writer = data?.writer;
    if (writer) {
      const atIndex = writer.indexOf("@");
      const username = writer.slice(0, atIndex);
      const maskedUsername =
        username.slice(0, 3) + "*".repeat(username.length - 3);
      setMaskId(maskedUsername);
    }
  };

  const getImages = async (image: string) => {
    const { data } = await supabase.storage.from("images").getPublicUrl(image);

    return data.publicUrl;
  };

  if (isFetching) {
    return <Loader className="my-[20%]" />;
  }

  return (
    <div className="w-full h-full min-h-[100vh] pt-[112px]">
      <div className="shadow-lg md:max-w-6xl mx-auto h-full min-h-[100vh] px-8 py-12 bg-white border-gray-400 border-2">
        <div className="block py-5 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
          <h2 className="text-2xl">{recipe?.title}</h2>
          <br />
          <div className="flex justify-between">
            <div className="">
              <p className="text-lg font-semibold">
                작성자 : <span className="font-normal">{maskId}</span>
              </p>{" "}
            </div>
            <div className="text-gray-500">
              <p className="text-xm font-medium">
                생성일 :{" "}
                <span>
                  {new Date(recipe?.createdAt as Date)?.toLocaleDateString()}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:p-10">
          <span className="text-xl font-semibold">이미지</span>
          <div className="flex items-center gap-7">
            {recipe?.image?.map((image: string, i: any) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center w-[150px] h-[150px] shadow-lg overflow-hidden"
              >
                <img
                  src={`${image}`}
                  alt="음식 사진"
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            ))}
          </div>

          <div className="my-8">
            <span className="text-xl font-semibold">재료</span>
            <div>
              {recipe?.ingredients?.map((ingredient: string, i: any) => (
                <span className="leading-7" key={i}>
                  {ingredient} <br />
                </span>
              ))}
            </div>
          </div>
          <div className="mb-8 py-2">
            <span className="text-xl font-semibold">과정</span>
            <div className="mt-2 whitespace-pre-line">{recipe?.contents}</div>
          </div>
          {session?.user.email === recipe?.writer && (
            <div className="flex justify-end my-2 gap-2">
              {/* =========================== */}
              {/* 로직 테스트 삭제 */}
              <button
                className="block bottom-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={handleList}
              >
                목록
              </button>
              {/* <button
                className="block bottom-2 right-2 px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none"
                onClick={() => {
                  router.back();
                }}
              >
                뒤로가기
              </button> */}
              {/* =========================== */}
              <button
                className="block bottom-2 right-2 px-4 py-2 bg-zinc-500 text-white rounded-md hover:bg-zinc-700 focus:outline-none"
                onClick={handleEdit}
              >
                수정
              </button>
              <button
                className="block bottom-2 right-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-slate-600 focus:outline-none"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <hr />

        <div className="my-10 p-10">
          <h3 className="py-2 text-base font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-gray-100">
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
