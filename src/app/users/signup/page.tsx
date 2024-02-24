"use client";

import React, { useEffect } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsFillSignIntersectionYFill } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

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
      <SignupForm />
    </div>
  );
}
