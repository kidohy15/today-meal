"use client";

import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/client";
import { useSession } from "next-auth/react";

const MyPage = () => {
  // const [session, loading] = useSession();
  const { data, status } = useSession();
  const session = useSession();
  const [user, setUser] = useState(data?.user);

  console.log("session", session);

  useEffect(() => {
    setUser(data?.user)
  },[session])

  return (
    <div>
      {!session && <p>로그인해주세요</p>}
      {session && (
        <div className="md:max-w-4xl mx-auto py-8 px-4 border-2 border-solid border-rose-200">
          <div className="">
            <p>내 정보, {user?.name}</p>
            <div>이름: {user?.name}</div>
            <div>Email: {user?.email}</div>
          </div>
          <div className="mt-4">
            <div>내 활동 내역</div>
            <div>등록한 레시피</div>
            <div>좋아요한 레시피</div>
            <div>댓글 모음</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
