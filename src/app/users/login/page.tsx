"use client";

import React, { useEffect } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsFillSignIntersectionYFill } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[100vh]">
      <div className="bg-slate-200 py-20 mx-auto w-full max-w-xl">
        <h1 className="mt-30 text-orange-400 text-center text-3xl font-semibold">
          YummyRecipe
        </h1>
        <div className="text-center mt-4 text-3xl font-bold text-gray-600">
          로그인해주세요
        </div>
        <div className=" mt-1 mx-auto w-full max-w-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
