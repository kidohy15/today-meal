"use client";

import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/client";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import CommentList from "@/components/comments/CommentList";
import Pagination from "@/components/Pagination";
import RecipeList from "@/components/RecipeList";
import Loader from "@/components/loader";

const MyPage = () => {
  const { data, status } = useSession();
  const session = useSession();
  const [user, setUser] = useState(data?.user);

  useEffect(() => {
    setUser(data?.user);
  }, [session]);

  const searchParams = useSearchParams();
  const page: any = searchParams.get("page") ?? "1";

  // 레시피 댓글 리스트 가져오기
  const fetchComments = async () => {
    console.log("=====================");
    const res = await axios.get(`/api/comments?page=${page}&user=true`);
    console.log("res", res);

    const result = res?.data;
    console.log("================= result", result);

    return result;
  };

  const {
    data: comments,
    isLoading,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [`conments-${page}`],
    queryFn: fetchComments,
  });

  const totalPage: any = parseInt(comments?.totalPage, 10);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  if (isFetching) {
    return <Loader className="my-[20%]" />;
  }

  return (
    <div className="pt-[112px] h-full min-h-[100vh]">
      {!session && <p>로그인해주세요</p>}
      {session && (
        <div className="shadow-lg md:max-w-6xl mx-auto h-full min-h-[100vh] px-8 py-12 bg-white border-gray-400 border-2">
          <div className="px-4 sm:px-0">
            <h2 className="block text-2xl py-3 px-1 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
              마이 페이지
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-500">
              사용자 기본정보
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  이름
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {session?.data?.user?.name ?? "사용자"}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  이메일
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {session?.data?.user?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  이미지
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <img
                    alt="프로필 이미지"
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12"
                    src={session?.data?.user?.image || "/images/default.jpg"}
                  />
                </dd>
              </div>
              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  설정
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <button
                    type="button"
                    className="underline hover:text-gray-500"
                    onClick={() => signOut()}
                  >
                    로그아웃
                  </button>
                </dd>
              </div> */}
            </dl>
          </div>

          {/* 내가 등록한 레시피 */}
          <div className="mt-40 px-4 sm:px-0 ">
            <h3 className="block py-2 px-3 mb-10 text-base font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-gray-100">
              내가 등록한 레시피
            </h3>
              <RecipeList searchKeyword="" userCheck={true} />
          </div>

          {/* 내가 쓴 댓글 */}
          {/* <div className="mt-8 px-4 sm:px-0"> */}
          {/* <h3 className="text-base font-semibold leading-7 text-gray-900">
              내가 쓴 댓글
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              댓글 리스트
            </p>
            <CommentList
              comments={comments}
              refetch={refetch}
              checkRecipe={true}
            /> */}
          {/* pagination */}
          {/* {comments?.totalPage && (
              <Pagination
                totalPage={totalPage}
                page={page}
                pathname={`/users/mypage`}
              />
            )} */}
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default MyPage;
