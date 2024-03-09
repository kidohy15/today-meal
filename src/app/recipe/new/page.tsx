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
import Loader from "@/components/loader";

const RecipeNewPage = () => {
  const supabase = useSupabaseClient();

  const [writer, setWriter] = useState<any>("");
  const [maskId, setMaskId] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [userInput, setUserInput] = useState<any>("");
  const [contents, setContents] = useState("");
  const [errIngredients, setErrIngredients] = useState(false);
  const [imageFile, setImageFile] = useState<File[]>([]);
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
    if (userInput) {
      setIngredients((prevInputs: any) => [...prevInputs, userInput]);
      setUserInput("");
      console.log("ingredients", ingredients);
    }
  };

  // const handleImageChange = (event: any) => {
  //   const file = event.target.files[0];
  //   setImageFile(file);
  // };

  // Form 내용 등록
  const onSubmit = async (e: any) => {
    e.preventDefault();
    // 이미지 파일을 formData에 추가
    // if (!imageFile) return;

    try {
      if (imageFile) {
        // data.append("file", imageFile);
      }

      console.log("imageFile", imageFile);
      const formData = new FormData();

      const encodedImages = await Promise.all(
        imageFile.map((file: File) => encodeImageFileAsURL(file))
      );

      encodedImages.forEach((file: any, index) => {
        formData.append(`files[${index}]`, file);
      });

      // imageFile.forEach((file, index) => {
      //   formData.append(`files[${index}]`, file);
      // });
      // formData.append(`files[${index}]`, file);

      // formData.append("title", recipeName);
      // formData.append("contents", contents);
      // formData.append("writer", writer);

      // JSON 형식으로 파싱 후 추가
      formData.append("title", JSON.stringify(recipeName));
      formData.append("contents", JSON.stringify(contents));
      formData.append("writer", JSON.stringify(writer));

      console.log("ingredients", ingredients);

      // if (ingredients.length < 1) {
      //   setErrIngredients(true);
      //   toast.error("하나 이상의 재료를 입력해주세요.");
      //   return;
      // }

      const res = await axios.post("/api/recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        // 레시피 등록 성공
        if (imageFile) {
          // await storageUpload(imageFile, imageName);
        }
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

  const encodeImageFileAsURL = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
    // let file = e.target.files?.[0];
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile((prevFiles: any) => [...prevFiles, ...Array.from(files)]);
    }
    // setImageFile(Array.from(e.target.files));
    // const nowSelectImageList = e.target.files;
    // console.log(nowSelectImageList, "파일 데이터");
    console.log(imageFile, "파일 데이터");
    // setImageFile(...imageFile, );
    // setImageFile(file);

    const uuid = uuidv4();
    setImageName(uuid);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleAddIngredient(); // Enter 입력이 되면 재료 추가버튼 실행
    }
  };

  // 삭제
  const handleImageRemove = (indexToRemove: any) => {
    const updatedImages = imageFile.filter(
      (_, index) => index !== indexToRemove
    );
    setImageFile(updatedImages);
  };

  return (
    <>
      {session ? (
        <div className="w-full h-full  pt-[112px]">
          <div className="md:max-w-6xl min-h-[100vh] mx-auto px-8 py-12 h-full shadow-md bg-white items-center">
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
                    multiple
                    onChange={uploadImage}
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
              <div className="flex mb-16">
                {imageFile.map((image, index) => (
                  <div key={index}>
                    <div className="flex w-40 h-40 items-center">
                      <img
                        src={URL.createObjectURL(image)}
                        width={"150px"}
                        height={"150px"}
                        alt={`이미지 ${index}`}
                      />
                    </div>
                    <button onClick={() => handleImageRemove(index)}>
                      이미지 제거
                    </button>
                  </div>
                ))}
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

              {/* 재료 입력 필드 추가 */}
              <div className="mb-14">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  재료
                </label>
                <div className="p-5">
                  <span className="text-md font-semibold text-stone-500 ">
                    선택한 재료
                  </span>
                  <div className="flex flex-wrap min-h-[50px] w-full mt-2 items-center shadow-sm border-solid border-2 border-zinc-200">
                    {ingredients?.map((ingredients: any, index: any) => (
                      <div
                        key={index}
                        className="p-2 m-2 bg-gray-100 rounded-md border-solid border-2 border-amber-900"
                      >
                        {ingredients}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="m-7 bg-orange-100 flex">
                  <input
                    type="text"
                    className="w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
                    placeholder="재료를 입력해주세요"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={() => handleOnKeyPress}
                  />
                  <button
                    type="button"
                    className="w-[120px] p-2 m-1 "
                    onClick={(e) => {
                      if (userInput !== "" && userInput !== null) {
                        handleAddIngredient();
                      }
                    }}
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
                  onChange={(e) => setContents(e.target.value)}
                  className="shadow appearance-none border rounded w-full min-h-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  value="레시피 등록"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:cursor-pointer focus:shadow-outline"
                >
                  버튼
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="h-min-[100vh] mt-[112px]">
            <Loader />
          </div>
        </>
      )}
    </>
  );
};

export default RecipeNewPage;
