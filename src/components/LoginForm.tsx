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
    <form
      className=" rounded px-0 py-2 my-4 w-full h-[680px] mx-auto bottom-0"
      onSubmit={handleSubmit(async (data) => {
        try {
          // const result = await axios.get("/api/auth/users", data);

          const result = await signIn("credentials", {
            email: email,
            password: password,
            // redirect: false
          });
          if (result?.error) {
            return;
          }
          router.replace("/");

          // if (result.status === 200) {
          //   // 로그인 성공
          //   toast.success("로그인 성공했습니다.");
          //   router.replace(`/recipe/${result?.data?.result?.id}`);
          // } else {
          //   // 로그인 실패
          //   toast.error("다시 시도해주세요.");
          // }
        } catch (error) {
          console.log(error);
          toast.error("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      })}
    >
      <div className="bg-slate-200 py-16 mx-auto w-full max-w-xl">
        <h1 className="mt-30 text-orange-400 text-center text-3xl font-semibold">
          TodayMeal
        </h1>
        <div className="text-center mt-4 text-3xl font-bold text-gray-600">
          로그인해주세요
        </div>
        <div className=" mt-1 mx-auto w-full max-w-lg">
          <div className=" p-10">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />

              {errors?.writer?.type === "required" && (
                <p className="text-xs text-red-500 pt-2">
                  필수 입력사항입니다.
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {errors?.title?.type === "required" && (
                <p className="text-xs text-red-500 pt-2">
                  필수 입력사항입니다.
                </p>
              )}
            </div>
            <div className="flex items-center justify-center mt-10">
              <p className="mr-2 text-center text-sm text-gray-600">
                계정이 없다면 회원가입해주세요
              </p>
              <Link
                href={"./signup"}
                className="text-blue-500 underline font-bold"
              >
                회원가입
              </Link>
            </div>

            <div className="mt-5 mx-auto w-full max-w-lg">
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="text-white flex gap-2 bg-[#e4a668] hover:bg-[#bc854a]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
                >
                  <BsFillSignIntersectionYFill className="w-6 h-6" />
                  TodayMeal 로그인
                </button>
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="text-white flex gap-2 bg-[#4285F4] hover:bg-[#4d79c0] font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
                >
                  <AiOutlineGoogle className="w-6 h-6" />
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
