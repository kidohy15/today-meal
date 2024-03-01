import { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface RecipeListProps {
  searchKeyword: string;
  userCheck: boolean | null;
}

export default function RecipeList({ searchKeyword, userCheck }: RecipeListProps) {
  const router = useRouter();

  // const { data } = useSession();
  // const [user, setUser] = useState(data?.user);

  const searchParams = useSearchParams();
  const page: any = searchParams.get("page") ?? "1";

  const [writer, setWriter] = useState<any>("");
  const [maskedUsername, setMaskedUsername] = useState("");
  const [pathname, setPathname] = useState("");

  console.log("================= userCheck", userCheck);
  useEffect(() => {
    setPathname(window.location.pathname);
    console.log("================= pathname", pathname);
  }, []);

  const recipesData = async () => {
    if (userCheck) {
      const res = await axios.get(`/api/recipe?page=${page}&userCheck=${userCheck}`, {
        params: {
          searchKeyword: searchKeyword,
        },
      });
      const result = res?.data;
      console.log("================= result", result);

      return result;
    } else {
      const res = await axios.get(`/api/recipe?page=${page}`, {
        params: {
          searchKeyword: searchKeyword,
        },
      });
      const result = res?.data;
      console.log("================= result", result);

      return result;
    }
  };

  const { data: recipes, isLoading } = useQuery({
    queryKey: [`recipes-${pathname}-${page}`, searchKeyword],
    queryFn: recipesData,
  }); // 데이터는 data 속성에 있다

  const totalPage: any = parseInt(recipes?.totalPage, 10);

  // 함수 추가: 작성자 정보를 마스킹 처리
  const maskWriter = (writer: any) => {
    if (!writer) return ""; // writer가 없을 경우 빈 문자열 반환

    const atIndex = writer.indexOf("@");
    const username = writer.slice(0, atIndex);
    return atIndex !== -1
      ? username.slice(0, 3) + "*".repeat(username.length - 3)
      : writer;
  };

  console.log("===========", recipes);

  if (recipes?.data.length === 0)
    return (
      <div className="p-4 border border-e-gray-200 rounded-md text-sm text-center text-gray-400">
        등록된 레시피가 없습니다.
      </div>
    );

  return (
    <>
      <ul role="list" className="pt-2 flex flex-col">
        {isLoading ? (
          <div>로딩중입니다.</div>
        ) : (
          recipes?.data?.map((recipe: any, index: any) => (
            <li
              className="flex justify-between gap-x-6 h-[160px] py-6 border border-solid border-gray-200 px-4 my-2 cursor-pointer z-10"
              key={index}
              onClick={() => router.push(`/recipe/${recipe.id}`)}
            >
              <div className="flex gap-x-4">
                <div className="w-24 h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  이미지
                </div>
                <div>
                  <div className="text-3xl font-semibold leading-6 text-gray-900 py-2">
                    {recipe.title}
                  </div>
                  <div className="mt-1 text-xl truncate font-semibold leading-5 text-gray-500 py-2">
                    {recipe.ingredients}
                  </div>
                  <div className="mt-1 text-xl truncate font-semibold leading-5 text-gray-500 py-2">
                    {recipe.contents}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {maskWriter(recipe?.writer)}
                </div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {new Date(recipe?.createdAt)?.toLocaleDateString()}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="py-10">
        <Pagination page={page} totalPage={totalPage} pathname={pathname} />
      </div>
    </>
  );
}
