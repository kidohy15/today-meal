import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsFillSignIntersectionYFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f5f0] px-4">
      <form
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
        onSubmit={handleSubmit(async () => {
          try {
            const result = await signIn("credentials", {
              email,
              password,
            });
            if (!result?.error) {
              router.replace("/");
            } else {
              toast.error("로그인 실패. 다시 시도해주세요.");
            }
          } catch (error) {
            console.error(error);
            toast.error("로그인 중 문제가 발생했습니다.");
          }
        })}
      >
        <h1 className="text-center text-4xl font-bold text-orange-500">
          TodayMeal
        </h1>
        <p className="text-center text-gray-600 mt-2">
          맛있는 레시피를 만나보세요
        </p>

        <div className="mt-6">
          <label className="block text-gray-600 font-semibold mb-1">
            이메일
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">이메일을 입력해주세요.</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 font-semibold mb-1">
            비밀번호
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              비밀번호를 입력해주세요.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <BsFillSignIntersectionYFill className="w-5 h-5" />
          TodayMeal 로그인
        </button>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <AiOutlineGoogle className="w-5 h-5" />
          Google 로그인
        </button>

        <div className="text-center mt-6 text-gray-600 text-sm">
          계정이 없으신가요?{" "}
          <Link href="./signup" className="text-orange-500 font-semibold">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
