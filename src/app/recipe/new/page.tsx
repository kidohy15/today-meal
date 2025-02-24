/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import React, {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import Loader from "@/components/loader";
import { MdCancel } from "react-icons/md";

const RecipeNewPage = () => {
  const supabase = useSupabaseClient();

  const [writer, setWriter] = useState<string>("");
  const [maskId, setMaskId] = useState<string>("");
  const [recipeName, setRecipeName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imageName, setImageName] = useState<string>("");

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    writerId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, ingredients]);

  const writerId = () => {
    const email = session?.user?.email;
    if (email) {
      setWriter(email);

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
      setIngredients((prevInputs: string[]) => [...prevInputs, userInput]);
      setUserInput("");
    }
  };

  // Form 내용 등록
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const encodedImages = await Promise.all(
        imageFile.map((file: File) => encodeImageFileAsURL(file))
      );

      encodedImages.forEach((file, index) => {
        formData.append(`files[${index}]`, file as string);
      });

      ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]`, ingredient as string);
      });

      // JSON 형식으로 파싱 후 추가
      formData.append("title", recipeName);
      formData.append("contents", contents);
      formData.append("writer", writer);

      const res = await axios.post("/api/recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        // 레시피 등록 성공
        toast.success("레시피를 등록했습니다.");
        // router.replace(`/recipe/${res?.data?.data?.id}`);
        router.replace(`/recipe`);
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

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }

    const uuid = uuidv4();
    setImageName(uuid);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddIngredient(); // Enter 입력이 되면 재료 추가버튼 실행
    }
  };

  // 삭제
  const handleImageRemove = (indexToRemove: number) => {
    const updatedImages = imageFile.filter(
      (_, index) => index !== indexToRemove
    );
    setImageFile(updatedImages);
  };

  if (!session) {
    return <Loader className="my-[20%]" />;
  }

  return (
    <>
      {session ? (
        <div className="w-full h-full pt-[112px]">
          <div className="md:max-w-6xl min-h-[100vh] mx-auto px-8 py-12 h-full shadow-md bg-white items-center">
            <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
              레시피 등록
            </h2>
            <form
              className="bg-white rounded px-0 pt-10 pb-8 my-4 w-full mx-auto bottom-0"
              onSubmit={onSubmit}
            >
              <div className="flex justify-between pr-3">
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
              {imageFile.length > 0 && (
                <div>
                  <span className="mt-5 text-xs text-gray-400">
                    (첫번째 이미지가 대표 이미지로 보여집니다. )
                  </span>
                  <div className="flex mb-16">
                    {imageFile.map((image, index) => (
                      <div key={index}>
                        <div className="flex mb-2 w-40 h-40 items-center overflow-hidden">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`이미지 ${index}`}
                            className="w-[100%] h-[100%] object-cover"
                          />
                        </div>
                        <div className="flex justify-center cursor-pointer">
                          <div onClick={() => handleImageRemove(index)}>
                            <span className="mr-2 text-gray-500 font-semibold">
                              제거
                            </span>
                            <button>
                              <MdCancel className="text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                <div className="py-5">
                  <span className="text-md font-semibold text-stone-500 ">
                    선택한 재료
                  </span>
                  <div className="flex flex-wrap min-h-[50px] w-full mt-2 items-center shadow-sm border-solid border-2 border-zinc-200">
                    {ingredients?.map((ingredients: string, index: number) => (
                      <div
                        key={index}
                        className="p-2 m-2 bg-gray-100 rounded-md border-solid border-2 border-amber-900"
                      >
                        {ingredients}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="my-5 flex">
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
                    className="w-[120px] p-2 mx-1 bg-stone-200 hover:bg-stone-300 rounded-md"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:cursor-pointer focus:shadow-outline"
                >
                  작성하기
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
