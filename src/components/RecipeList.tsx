/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import SearchFilter from "./SearchFilter";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Loader from "./loader";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

interface RecipeListProps {
  searchKeyword: string;
  userCheck: boolean | null;
}

export default function RecipeList({
  searchKeyword,
  userCheck,
}: RecipeListProps) {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const searchParams = useSearchParams();
  const page: any = searchParams.get("page") ?? "1";

  const [writer, setWriter] = useState<any>("");
  const [maskedUsername, setMaskedUsername] = useState("");
  const [pathname, setPathname] = useState("");
  const [imagePath, setImagePath] = useState<any>();
  const imgUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/images/";

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [imagePath]);

  const recipesData = async () => {
    if (userCheck) {
      const res = await axios.get(
        `/api/recipe?page=${page}&userCheck=${userCheck}`,
        {
          params: {
            searchKeyword: searchKeyword,
          },
        }
      );
      const result = res?.data;
      console.log("======== result =========", result);

      return result;
    } else {
      const res = await axios.get(`/api/recipe?page=${page}`, {
        params: {
          searchKeyword: searchKeyword,
          // userCheck: false,
        },
      });
      const results = res?.data;
      console.log("================= result?????1", results);
      console.log("================= result?????2", results.data[0].image);

      // const result = [...results].map((res) => {
      //   console.log("================= res.data.image?????1", res.data.image);
      //   const imageName = getImages(res.data.image);
      //   console.log("================= imageName?????1", imageName);
      //   return imageName;
      // });
      // console.log("================= result?????1", result);

      // 이미지 경로를 가져오고 결과에 추가
      const resultsWithImagePath = await Promise.all(
        results.data.map(async (result: any) => {
          const imageName = (await getImages(result.image)) ?? null;
          return { ...result, imagePath: imageName };
        })
      );

      console.log(
        "================= resultsWithImagePath?????1",
        resultsWithImagePath
      );

      return resultsWithImagePath;

      // const result = await makeData(results)

      // const result = [...results].map((res) => {
      //   console.log("================= res.data.image?????1", res.data.image);
      //   const imageName = getImages(res.data.image);
      //   console.log("================= imageName?????1", imageName);
      //   return imageName
      // })
      // console.log("================= result?????1", result);
      // getImages(result.data[0].image);
      // getImages(image);

      // return result;
    }
  };

  const {
    data: recipes,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [`recipes-${pathname}-${page}`, searchKeyword],
    queryFn: recipesData,
  }); // 데이터는 data 속성에 있다

  const totalPage: any = parseInt(recipes?.totalPage, 10);

  // 작성자 정보를 마스킹 처리
  const maskWriter = (writer: any) => {
    if (!writer) return ""; // writer가 없을 경우 빈 문자열 반환

    const atIndex = writer.indexOf("@");
    const username = writer.slice(0, atIndex);
    return atIndex !== -1
      ? username.slice(0, 3) + "*".repeat(username.length - 3)
      : writer;
  };

  const getImages = async (image: string) => {
    const { data } = await supabase.storage
      .from("images")
      // .getPublicUrl(imgUrl + image)
      .getPublicUrl(image);
    // .download(image);

    console.log("===== data ======", image);
    console.log("===== data ======", data.publicUrl);

    // setImagePath(data.publicUrl);
    return data.publicUrl;
    // if (data) {
    //   // const imageUrl = URL.createObjectURL(blobData);
    //   // setImagePath(imageUrl);
    //   // const blobData = new Blob([data]);
    //   // setImagePath(blobData);
    //   const text = URL.createObjectURL(imagePath);
    //   console.log("text", text);
    // } else {
    //   console.error("Blob data is null.");
    // }
    // const downloadUrl = URL.createObjectURL(data);

    // if (error) {
    //   console.error("Error downloading image:", error.message);
    // } else {
    //   return data;
    // }
  };

  // const makeData = async (results:any) => {
  //   console.log("================= res.data.image?????1", results.data.image);
  //   const result = [...results].map((res) => {
  //     console.log("================= res.data.image?????1", res.data.image);
  //     const imageName = getImages(res.data.image);
  //     console.log("================= imageName?????1", imageName);
  //     return imageName
  //   })
  //   console.log("================= result?????1", result);
  // }

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  if (isFetching) {
    return <Loader className="my-[20%]" />;
  }

  if (recipes?.length === 0)
    return (
      <div className="my-[20%] p-4 border border-e-gray-200 rounded-md text-sm text-center text-gray-400">
        등록된 레시피가 없습니다.
      </div>
    );
  return (
    <>
      <ul role="list" className="pt-2 flex flex-col">
        {isLoading ? (
          <div>로딩중입니다.</div>
        ) : (
          recipes?.map((recipe: any, index: any) => (
            <li
              className="flex justify-between gap-x-6 h-[160px] py-6 border border-solid border-gray-200 px-4 my-2 cursor-pointer z-10"
              key={index}
              onClick={() => router.push(`/recipe/${recipe.id}`)}
            >
              <div className="flex gap-x-4">
                {recipe?.image ? (
                  <div>
                    <img
                      src={`${recipe.imagePath}`}
                      className="w-24 h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400"
                      alt="레시피 이미지"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                    이미지
                  </div>
                )}
                <div>
                  <div className="text-3xl font-semibold leading-6 text-gray-900 py-2">
                    {recipe.title}
                  </div>
                  <div className="mt-1 text-xl truncate font-medium leading-5 text-gray-500 py-2">
                    {recipe.ingredients}
                  </div>
                  <div className="mt-1 text-xl truncate font-medium leading-5 text-gray-500 py-2">
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
