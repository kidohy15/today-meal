/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import RecipeList from "@/components/RecipeList";
import Loader from "@/components/loader";
import { Suspense } from "react";

const MyPage = () => {
  const { data, status } = useSession();
  const session = useSession();
  const [user, setUser] = useState(data?.user);

  useEffect(() => {
    setUser(data?.user);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "1";

  // 레시피 댓글 리스트 가져오기
  const fetchComments = async () => {
    const res = await axios.get(`/api/comments?page=${page}&user=true`);
    const result = res?.data;

    return result;
  };

  const {
    data: comments,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [`conments-${page}`],
    queryFn: fetchComments,
  });

  const totalPage: number = parseInt(comments?.totalPage, 10);

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
    <Suspense>
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
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-1 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    내 프로필
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <img
                      alt="프로필 이미지"
                      width={80}
                      height={80}
                      className="rounded w-20 h-20"
                      src={session?.data?.user?.image || "/images/default.jpg"}
                    />
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    이름
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {session?.data?.user?.name ?? "사용자"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    이메일
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {session?.data?.user?.email}
                  </dd>
                </div>
              </dl>
            </div>

            {/* 내가 등록한 레시피 */}
            <div className="mt-40 px-4 sm:px-0 ">
              <h3 className="block py-2 px-3 mb-10 text-base font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-gray-100">
                내가 등록한 레시피
              </h3>
              <RecipeList searchKeyword="" userCheck={true} page={page} />
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export const dynamicParams = true;
export const dynamic = "force-dynamic";
export default MyPage;
