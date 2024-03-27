/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

interface EditPageProps {
  params: { id: string };
}

const EditPage = ({ params }: EditPageProps) => {
  const router = useRouter();
  const id = params.id;

  const [writer, setWriter] = useState<string>("");
  const [recipeName, setRecipeName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [imageName, setImageName] = useState<string>("");

  // 페이지 데이터 가져오기
  const recipeData = async () => {
    const { data: data } = await axios.get(`/api/recipe?id=${id}`);

    return data;
  };

  const { data: recipe, isSuccess } = useQuery({
    queryKey: [`recipe-${id}`],
    queryFn: recipeData,
    enabled: !!id,
  });

  useEffect(() => {
    setIngredients(recipe?.ingredients);
    setWriter(recipe?.writer);
    setRecipeName(recipe?.title);
    setContents(recipe?.contents);
    let imageToBlobs = imageToBlob(recipe?.image);
    setImageFile(imageToBlobs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, recipe]);

  const extractBase64DataFromURI = (dataURI: string) => {
    // "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." 형태에서 Base64 부분을 추출
    const base64String = dataURI.split(",")[1];
    return base64String;
  };

  const imageToBlob = (base64Images: string[]) => {
    let imageToBlobs: File[] = [];
    base64Images?.map((base64Data: string) => {
      // 데이터 URI에서 Base64 부분 추출
      const base64String = extractBase64DataFromURI(base64Data);
      // Base64 문자열을 디코딩하여 이진 데이터로 변환
      let binaryData = atob(base64String);

      // 이진 데이터의 길이를 가져옴
      let len = binaryData.length;

      // ArrayBuffer를 생성
      let buffer = new ArrayBuffer(len);

      // ArrayBuffer를 이용하여 바이너리 데이터를 다루는 Uint8Array를 생성
      let view = new Uint8Array(buffer);

      // 이진 데이터를 Uint8Array에 복사
      for (let i = 0; i < len; i++) {
        view[i] = binaryData.charCodeAt(i);
      }

      // Blob 객체 생성
      let blob = new Blob([view]);

      // Blob 객체를 사용하여 File 객체 생성 (optional)
      let file = new File([blob], "filename.jpg", { type: "image/jpeg" });

      // 이미지 파일을 배열에 추가
      imageToBlobs.push(file);
    });
    return imageToBlobs;
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
      formData.append("id", id);

      const res = await axios.put("/api/recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        // 레시피 등록 성공
        toast.success("레시피를 수정했습니다.");
        router.replace(`/recipe/${res?.data?.data?.id}`);
      } else {
        // 레시피 수정 실패
        toast.error("다시 시도해주세요.");
      }
    } catch (error) {
      console.log(error);
      toast.error("레시피 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }

    const uuid = uuidv4();
    setImageName(uuid);
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

  // 입력한 재료를 배열에 추가
  const handleAddIngredient = () => {
    if (userInput) {
      setIngredients((prevInputs: string[]) => [...prevInputs, userInput]);
      setUserInput("");
    }
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

  return (
    <div className="min-h-[100vh] h-full pt-[112px]">
      <div className="h-full min-h-[100vh] md:max-w-6xl mx-auto bg-white px-8 py-12 shadow-md">
        <h2 className="block w-full text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
          {recipe?.title}
        </h2>
        <form
          className="bg-white h-full rounded px-8 pt-6 pb-8 mb-4 w-full bottom-0"
          onSubmit={onSubmit}
        >
          <div className="mb-8">
            <label
              htmlFor="writer"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              작성자 :{" "}
              <span className="text-sm font-medium">{recipe?.writer}</span>
            </label>
            <input
              id="writer"
              type="text"
              value={writer}
              className="hidden shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

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
          </div>

          <div className="flex mb-16">
            {imageFile.map((image: File, index: number) => (
              <div key={index}>
                <div className="flex mb-2 w-40 h-40 items-center overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`레시피 이미지 ${index}`}
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

          <div className="mb-8">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              레시피 제목
            </label>
            <input
              id="title"
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

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
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              className="shadow appearance-none border rounded w-full min-h-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center mt-10 justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              수정
            </button>
          </div>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
};

export default EditPage;
