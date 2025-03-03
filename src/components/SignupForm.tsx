import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const result = await axios.post("/api/auth/users", { email, password });
      if (result.status === 200) {
        toast.success("회원가입에 성공했습니다.");
        router.replace("/users/login");
      } else {
        toast.error("회원가입 실패. 다시 시도해주세요.");
      }
    } catch (error) {
      toast.error("에러가 발생했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f9f5f0] px-4">
      <form
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-4xl font-bold text-orange-500">
          TodayMeal
        </h1>
        <p className="text-center text-gray-600 mt-2">회원가입 후 이용해보세요</p>

        <div className="mt-6">
          <label className="block text-gray-600 font-semibold mb-1">이메일</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">이메일을 입력해주세요.</p>}
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 font-semibold mb-1">비밀번호</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">비밀번호를 입력해주세요.</p>}
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 font-semibold mb-1">비밀번호 확인</label>
          <input
            type="password"
            {...register("passwordConfirm", { required: true })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            autoComplete="new-password"
          />
          {errors.passwordConfirm && <p className="text-red-500 text-sm mt-1">비밀번호 확인을 입력해주세요.</p>}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <AiOutlineUserAdd className="w-5 h-5" />
          TodayMeal 회원가입
        </button>

        <div className="text-center mt-6 text-gray-600 text-sm">
          이미 계정이 있으신가요?{' '}
          <Link href="/users/login" className="text-orange-500 font-semibold">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
