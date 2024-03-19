/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import Loader from "./loader";
import { RecipeType } from "@/interface";

interface RecipeListProps {
  searchKeyword: string;
  userCheck?: boolean | null;
  page: string
}

export default function RecipeList({
  searchKeyword,
  userCheck,
  page
}: RecipeListProps) {
  const router = useRouter();

  // const searchParams = useSearchParams();
  // const page: string = searchParams.get("page") ?? "1";

  const [writer, setWriter] = useState<string>("");
  const [pathname, setPathname] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>();

  useEffect(() => {
    // setPathname(window.location.pathname);
  }, [imagePath]);

  const recipesData = async () => {
    if (userCheck) {
      const res = await axios.get(
        `/api/recipe?page=${page}&userCheck=${userCheck}`,
        {
          params: {
            searchKeyword: searchKeyword,
          },
        }
      );
      const result = res?.data;

      return result;
    } else {
      const res = await axios.get(`/api/recipe?page=${page}`, {
        params: {
          searchKeyword: searchKeyword,
        },
      });
      const results = res?.data;

      return results;
    }
  };

  const {
    data: recipes,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [`recipes-${pathname}-${page}`, searchKeyword],
    queryFn: recipesData,
  }); // 데이터는 data 속성에 있다

  // 작성자 정보를 마스킹 처리
  const maskWriter = (writer: string) => {
    if (!writer) return ""; // writer가 없을 경우 빈 문자열 반환

    const atIndex = writer.indexOf("@");
    const username = writer.slice(0, atIndex);
    let maskedName =
      atIndex !== -1
        ? username.slice(0, 3) + "*".repeat(username.length - 3)
        : writer;

    // 아이디 특정이 안되도록 일정 길이 이하에는 * 붙이기
    if (maskedName.length < 8) {
      const additionalMasks = 8 - maskedName.length;
      maskedName += "*".repeat(additionalMasks);
    }

    return maskedName;
  };

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  if (isFetching || isLoading) {
    return <Loader className="my-[20%]" />;
  }

  if (recipes?.data?.length === 0)
    return (
      <div className="my-[20%] p-4 border border-e-gray-200 rounded-md text-sm text-center text-gray-400">
        등록된 레시피가 없습니다.
      </div>
    );
  return (
    <>
      <div className="flex justify-center">
        <ul
          role="list"
          className="pt-2 flex-wrap gap-1 items-center sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4"
        >
          {isLoading ? (
            <div>로딩중입니다.</div>
          ) : (
            recipes?.data?.map((recipe: RecipeType, index: number) => (
              <li
                className="flex flex-col justify-between gap-x-20 h-[370px] py-1 border border-solid border-gray-200 px-4 my-2 cursor-pointer z-10"
                key={index}
                onClick={() => router.push(`/recipe/${recipe.id}`)}
              >
                <div className="flex justify-center">
                  {recipe?.image && recipe.image.length !== 0 ? (
                    <div className="flex flex-col justify-center items-center md:w-[200px] h-[200px] overflow-hidden">
                      <img
                        src={`${recipe.image[0]}`}
                        className="w-[100%] h-[100%] object-cover bg-gray-200 rounded-md flex text-gray-400"
                        alt="레시피 이미지"
                      />
                    </div>
                  ) : (
                    <div className="w-[200px] h-[200px] bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                      이미지
                    </div>
                  )}
                </div>
                <div className="flex gap-x-4 h-full overflow-hidden">
                  <div className="py-2 w-full">
                    <div className="text-xl font-semibold leading-6 text-gray-900 py-2">
                      {recipe.title ? (
                        recipe.title
                      ) : (
                        <div className="text-gray-400 text-center">
                          제목이 없습니다.
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                        {maskWriter(recipe.writer as string)}
                      </div>
                      <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                        {new Date(
                          recipe?.createdAt as Date
                        )?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {recipes && (
        <div className="py-10">
          <Pagination
            page={recipes?.page}
            totalPage={recipes?.totalPage}
            pathname={pathname}
          />
        </div>
      )}
    </>
  );
}
