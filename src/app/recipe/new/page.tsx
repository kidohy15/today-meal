"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { getImageProps } from "next/image";

const RecipeNewPage = () => {
  const supabase = useSupabaseClient();

  const [writer, setWriter] = useState<any>("");
  const [maskId, setMaskId] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState<any>([]);
  const [userInput, setUserInput] = useState<any>("");
  const [contents, setContents] = useState("");
  const [errIngredients, setErrIngredients] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [imageName, setImageName] = useState<any>("");

  const { data: session, status } = useSession();

  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    writerId();
  }, [imageName]);

  const writerId = () => {
    const email = session?.user?.email;
    setWriter(email);
    if (email) {
      const atIndex = email.indexOf("@");
      const username = email.slice(0, atIndex);
      const maskedUsername =
        username.slice(0, 3) + "*".repeat(username.length - 3);
      setMaskId(maskedUsername);
    }
  };

  // 입력한 재료를 배열에 추가
  const handleAddIngredient = () => {
    setIngredients((prevInputs: any) => [...prevInputs, userInput]);
    setUserInput("");
  };

  // const handleImageChange = (event: any) => {
  //   const file = event.target.files[0];
  //   setImageFile(file);
  // };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // 이미지 파일을 formData에 추가
    if (!imageFile) return;

    try {
      const data = new FormData();
      data.set("file", imageName);
      data.set("title", recipeName);
      data.set("writer", writer);
      data.set("ingredients", ingredients);
      data.set("contents", contents);

      // if (ingredients.length < 1) {
      //   setErrIngredients(true);
      //   toast.error("하나 이상의 재료를 입력해주세요.");
      //   return;
      // }

      const res = await axios.post("/api/recipe", data);

      // if(!res.ok) throw new Error(await res.text())

      if (res.status === 200) {
        // 레시피 등록 성공
        await storageUpload(imageFile, imageName);
        toast.success("레시피를 등록했습니다.");
        router.replace(`/recipe/${res?.data?.data?.id}`);
      } else {
        // 레시피 등록 실패
        toast.error("다시 시도해주세요.");
      }
    } catch (error) {
      console.log(error);
      toast.error("레시피 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const storageUpload = async (file: File, imageName: string) => {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${imageName}`, file);

    if (data) {
      // getImages();
    } else {
      console.log(error);
    }
  };

  // const getImages = async () => {
  //   const { data, error } = await supabase.storage
  //     .from("images")
  //     // .createSignedUrl();

  //   if (data !== null) {
  //     setImage(data);
  //   }
  // };

  const uploadImage = async (e: any) => {
    let file = e.target.files?.[0];
    setImageFile(file);

    const uuid = uuidv4();
    typeof uuid;
    setImageName(uuid);
  };

  return (
    <>
      {session ? (
        <div className="w-full h-full pt-[112px]">
          <div className="md:max-w-6xl mx-auto px-8 py-12 h-full shadow-md bg-white items-center">
            <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
              레시피 등록
            </h2>
            <form
              className="bg-white rounded px-0 pt-10 pb-8 my-4 w-full mx-auto bottom-0"
              onSubmit={onSubmit}
            >
              <div className="flex justify-between pr-16">
                <div className="mb-14">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    이미지
                  </label>
                  <input
                    id="image"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => uploadImage(e)}
                    className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-14">
                  <label
                    htmlFor="writer"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    작성자: {session?.user?.email}
                  </label>
                  <input
                    id="writer"
                    type="text"
                    defaultValue={session?.user?.email}
                    className="hidden appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
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
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              {/* 재료 등의 입력 필드 추가 */}

              <div className="mb-4">
                <label
                  htmlFor="contents"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  과정
                </label>
                <textarea
                  id="contents"
                  onChange={(e) => setContents(e.target.value)}
                  className="shadow appearance-none border rounded w-full min-h-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex items-center justify-end">
                <input
                  type="submit"
                  value="upload"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-slate-400 h-[120px] mt-[112px]">
            유저 정보를 받아오는 중입니다.
            <br />
            잠시만 기다려주세요
          </div>
        </>
      )}
    </>
  );
};

export default RecipeNewPage;
