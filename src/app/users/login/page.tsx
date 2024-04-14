"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import Popup from "@/components/Popup";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[100vh]">
      <Popup />
      <LoginForm />
    </div>
  );
}
