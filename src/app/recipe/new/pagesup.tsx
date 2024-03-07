"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RecipeNewPage = () => {
  const [writer, setWriter] = useState<any>("");
  const [maskId, setMaskId] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState<any>([]);
  const [userInput, setUserInput] = useState<any>("");
  const [instructions, setInstructions] = useState("");
  const [errIngredients, setErrIngredients] = useState(false);
  const [imageFile, setImageFile] = useState<any>();

  const { data, status } = useSession();
  const inputRef = useRef(null);

  const router = useRouter();

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
      setMaskId(maskedUsername);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 입력한 재료를 배열에 추가
  const handleAddIngredient = () => {
    setIngredients((prevInputs: any) => [...prevInputs, userInput]);
    setUserInput("");
  };

  const handleImageClick = () => {
    inputRef.current;
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmitAction = async (formData: any) => {
    // 이미지 파일을 formData에 추가
    const formDataWithImage = new FormData();
    formDataWithImage.append("imageFile", imageFile);

    // 기존의 form 데이터를 formData에 추가
    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataWithImage.append(key, value);
    // });

    // formDataWithImage.forEach((value, key) => {
    // });

    let dataIngre = formData.ingredients;

    try {
      if (ingredients.length < 1) {
        setErrIngredients(true);
        toast.error("하나 이상의 재료를 입력해주세요.");
        return;
      }
      const result = await axios.post(
        "/api/recipe",
        {
          ...formData,
          writer: writer,
          imageFile: formDataWithImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result.status === 203) {
        // 레시피 등록 성공
        toast.success("레시피를 등록했습니다.");
        router.replace(`/recipe/${result?.data?.result?.id}`);
      } else {
        // 레시피 등록 실패
        toast.error("다시 시도해주세요.");
      }
    } catch (error) {
      console.log(error);
      toast.error("레시피 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full h-full pt-[112px]">
      <div className="md:max-w-6xl mx-auto px-8 py-12 h-full shadow-md bg-white items-center">
        <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
          레시피 등록
        </h2>
        {/* <div className=" w-[1250px] h-[1250px] bg-[url('/images/301029217_PJ72317.jpg')] bg-cover bg-center"> */}
        <form
          className="bg-white rounded px-0 pt-10 pb-8 my-4 w-full mx-auto bottom-0"
          onSubmit={handleSubmit(handleSubmitAction)}
        >
          <div className="flex justify-between pr-16">
            <div className="mb-14">
              <label
                htmlFor="writer"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {/* 작성자 {data?.user?.email} */}
                이미지
              </label>
              <div onClick={handleImageClick}>
                <img src="" alt="" width={"20px"} height={"20px"} />
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt=""
                    width={"200px"}
                    height={"200px"}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                    이미지
                  </div>
                )}
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {errors?.writer?.type === "required" && (
                <p className="text-xs text-red-500 pt-2">
                  필수 입력사항입니다.
                </p>
              )}
            </div>
            <div className="mb-14">
              <label
                htmlFor="writer"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {/* 작성자 {data?.user?.email} */}
                작성자 : {maskId}
              </label>
              <input
                id="writer"
                type="text"
                defaultValue={writer}
                className="hidden appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              {/* {errors?.writer?.type === "required" && (
                <p className="text-xs text-red-500 pt-2">
                  필수 입력사항입니다.
                </p>
              )} */}
            </div>
          </div>

          <div className="mb-14">
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

          <div className="mb-14">
            <label
              htmlFor="ingredients"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              재료
            </label>
            <div id="ingredients" className="flex flex-wrap bg-white mt-2">
              {ingredients?.map((ingredients: any, index: any) => (
                <div key={index} className="p-1 m-1 bg-slate-50 rounded-md">
                  {ingredients}
                </div>
              ))}
              <input
                id="ingredientsHiddenInput"
                // {...register("ingredients", {
                //   value: ingredients.join(","),
                //   required: true,
                // })}
                hidden
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <input
                type="text"
                className=" p-1 m-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
                placeholder="재료를 입력해주세요"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button
                className="p-3 m-1 bg-slate-100"
                onClick={() => handleAddIngredient()}
              >
                추가하기
              </button>
            </div>
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
              className="shadow appearance-none border rounded w-full min-h-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end">
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
