"use client";

import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/client";
import { signOut, useSession } from "next-auth/react";

const MyPage = () => {
  // const [session, loading] = useSession();
  const { data, status } = useSession();
  const session = useSession();
  const [user, setUser] = useState(data?.user);

  console.log("session", session);

  useEffect(() => {
    setUser(data?.user);
  }, [session]);

  return (
    <div className="pt-[96px] h-screen bg-[#FFD27F]/20">
      {!session && <p>로그인해주세요</p>}
      {session && (
        <div className="shadow-lg md:max-w-5xl mx-auto px-8 py-12 mt-12 bg-white">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              마이페이지
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
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
                    src={
                      session?.data?.user?.image ||
                      "/images/markers/default.png"
                    }
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
              </div>
            </dl>
          </div>

          {/* 내가 등록한 레시피 */}
          <div className="mt-8 px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              내가 등록한 레시피
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              레시피 리스트
            </p>
          </div>

          {/* 내가 쓴 댓글 */}
          <div className="mt-8 px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              내가 쓴 댓글
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              댓글 리스트
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
