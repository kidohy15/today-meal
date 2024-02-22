"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const RecipeNewPage = () => {
  const [writer, setWriter] = useState<any>("");
  const [maskId, setMaskId] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const { data, status } = useSession();

  useEffect(() => {
    writerId();
  }, [data]);

  const writerId = () => {
    const email = data?.user?.email;
    setWriter(email);
    if (email) {
      const atIndex = email.indexOf("@");
      const username = email.slice(0, atIndex);
      const maskedUsername =
        username.slice(0, 3) + "*".repeat(username.length - 3);
      console.log("maskedUsername", maskedUsername);
      setMaskId(maskedUsername);
    }
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();

  //   console.log("작성자:", writer);
  //   console.log("요리 이름:", recipeName);
  //   console.log("재료:", ingredients);
  //   console.log("과정:", instructions);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full h-screen pt-[96px]">
      <div className="md:max-w-6xl mx-auto px-8 py-12 h-full shadow-md bg-white items-center">
        <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
          레시피 등록
        </h2>
        <p>111111</p>
        {/* <div className=" w-[1250px] h-[1250px] bg-[url('/images/301029217_PJ72317.jpg')] bg-cover bg-center"> */}
        <form
          className="bg-white rounded px-0 pt-10 pb-8 my-4 w-full mx-auto bottom-0"
          onSubmit={handleSubmit(async (data) => {
            try {
              const result = await axios.post("/api/recipe", data);

              if (result.status === 200) {
                // 레시피 등록 성공
                toast.success("레시피를 등록했습니다.");
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
              {/* 작성자 {data?.user?.email} */}
              작성자 {maskId}
            </label>
            <input
              id="writer"
              type="text"
              value={writer}
              className="hidden shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              onChange={(e) => setRecipeName(e.target.value)}
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
              onChange={(e) => setIngredients(e.target.value)}
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
              onChange={(e) => setInstructions(e.target.value)}
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
    </div>
  );
};

export default RecipeNewPage;
