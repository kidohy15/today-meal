import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Signupform() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 서버 회원가입 api
      setIsLoading(true);
      const result = await axios.post("/api/auth/users", {
        email: email,
        password: password,
      });

      if (result.status === 200) {
        // 회원가입 성공
        setIsLoading(false);
        toast.success("회원가입에 성공했습니다.");
        router.replace("/login");
      } else {
        // 회원가입 실패
        setIsLoading(false);
        toast.error("다시 시도해주세요.");
      }
    } catch (error) {
      console.error("error", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("에러가 발생했습니다.");
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
      // 정규식을 email 유효성 체크
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password") {
      setPassword(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 비밀번호 확인값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }
    if (name === "password_confirm") {
      setPasswordConfirm(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요");
      } else if (value !== password) {
        setError("비밀번호와 비밀번호 확인값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className=" rounded px-0 py-2 my-4 w-full h-[680px] mx-auto bottom-0"
    >
      <div className="bg-slate-200 p-16 mx-auto w-full h-full max-w-xl">
        <h1 className="mt-30 text-orange-400 text-center text-3xl font-semibold">
          TodayMeal
        </h1>
        <div className="text-center mt-4 text-3xl font-bold text-gray-600">
          회원가입
        </div>
        <div className="mt-10 mx-auto w-full max-w-lg">
          <div className="block text-gray-700 text-sm font-bold mb-5">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChange}
            />
          </div>
          <div className="block text-gray-700 text-sm font-bold mb-5">
            <label htmlFor="password">비밀번호</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              required
              onChange={onChange}
            />
          </div>
          <div className="block text-gray-700 text-sm font-bold mb-5">
            <label htmlFor="password_confirm">비밀번호 확인</label>
            <input
              type="password"
              name="password_confirm"
              id="password_confirm"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChange}
            />
          </div>
          {error && error?.length > 0 && (
            <div className="p-2 mb-10 text-red-600 text-center">
              <div>{error}</div>
            </div>
          )}
          <div className="text-center text-sm text-gray-600 mt-10">
            <span className="mr-2">계정이 이미 있으신가요?</span>
            <Link
              href="/users/login"
              className="text-blue-500 underline font-bold"
            >
              로그인하기
            </Link>
          </div>

          <div className="mt-5 mx-auto w-full max-w-lg">
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="text-white flex gap-2 bg-[#e4a668] hover:bg-[#bc854a]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
              >
                TodayMeal 회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
