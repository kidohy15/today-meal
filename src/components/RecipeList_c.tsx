// /* eslint-disable @next/next/no-img-element */
// import { useEffect, useState } from "react";
// import SearchFilter from "./SearchFilter";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import Pagination from "./Pagination";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
// import Loader from "./loader";
// import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
// import { RecipeApiResponse, RecipeType } from "@/interface";

// interface RecipeListProps {
//   searchKeyword: string;
//   userCheck?: boolean | null;
// }

// export default function RecipeList({
//   searchKeyword,
//   userCheck,
// }: RecipeListProps) {
//   const supabase = useSupabaseClient();
//   const router = useRouter();

//   const searchParams = useSearchParams();
//   const page: string = searchParams.get("page") ?? "1";

//   const [writer, setWriter] = useState<string>("");
//   const [maskedUsername, setMaskedUsername] = useState<string>("");
//   const [pathname, setPathname] = useState<string>("");
//   const [imagePath, setImagePath] = useState<string>();
//   const imgUrl =
//     process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/images/";

//   const [recipes, setRecipes] = useState<RecipeApiResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const fetchRecipes = async (page: string) => {
//     try {
//       const res = await axios.get("/api/recipe", {
//         params: {
//           page,
//           searchKeyword,
//           userCheck,
//         },
//       });
//       setRecipes(res.data);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecipes("1");
//   }, [searchKeyword, userCheck]);

//   // useEffect(() => {
//   //   // setPathname(window.location.pathname);

//   // }, [imagePath, maskedUsername]);

//   const recipesData = async () => {
//     if (userCheck) {
//       const res = await axios.get(
//         `/api/recipe?page=${page}&userCheck=${userCheck}`,
//         {
//           params: {
//             searchKeyword: searchKeyword,
//           },
//         }
//       );
//       const result = res?.data;
//       console.log("res", result);

//       return result;
//     } else {
//       console.log("==============");
//       const res = await axios.get(`/api/recipe?page=${page}`, {
//         params: {
//           searchKeyword: searchKeyword,
//         },
//       });
//       const results = res?.data;

//       return results;
//     }
//   };

//   // const {
//   //   data: recipes1,
//   //   isLoading,
//   //   isFetched,
//   //   isFetching,
//   //   isError,
//   // } = useQuery({
//   //   queryKey: [`recipes-${pathname}-${page}`, searchKeyword],
//   //   queryFn: recipesData,
//   // }); // 데이터는 data 속성에 있다

//   // 작성자 정보를 마스킹 처리
//   const maskWriter = (writer: string) => {
//     if (!writer) return ""; // writer가 없을 경우 빈 문자열 반환

//     const atIndex = writer.indexOf("@");
//     const username = writer.slice(0, atIndex);
//     let maskedName =
//       atIndex !== -1
//         ? username.slice(0, 3) + "*".repeat(username.length - 3)
//         : writer;

//     // 아이디 특정이 안되도록 일정 길이 이하에는 * 붙이기
//     if (maskedName.length < 8) {
//       const additionalMasks = 8 - maskedName.length;
//       maskedName += "*".repeat(additionalMasks);
//     }

//     return maskedName;
//   };

//   const getImages = async (image: string) => {
//     const { data } = await supabase.storage.from("images").getPublicUrl(image);
//     return data.publicUrl;
//   };

//   // if (isError) {
//   //   return (
//   //     <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
//   //       다시 시도해주세요
//   //     </div>
//   //   );
//   // }

//   // if (isFetching || isLoading) {
//   //   return <Loader className="my-[20%]" />;
//   // }

//   const handlePageChange = (page: string) => {
//     fetchRecipes(page);
//   };

//   const handleRecipeClick = (recipeId: string) => {
//     router.push(`/recipe/${recipeId}`);
//   };

//   if (isLoading) {
//     return <Loader className="my-[20%]" />;
//   }

//   if (!recipes || recipes?.data?.length === 0) {
//     return (
//       <div className="my-[20%] p-4 border border-e-gray-200 rounded-md text-sm text-center text-gray-400">
//         등록된 레시피가 없습니다.
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex justify-center">
//         <ul
//           role="list"
//           className="pt-2 flex-wrap gap-1 items-center grid grid-cols-4"
//         >
//           {isLoading ? (
//             <div>로딩중입니다.</div>
//           ) : (
//             recipes?.data?.map((recipe: RecipeType, index: number) => (
//               <li
//                 className="flex flex-col justify-between gap-x-20 h-[370px] py-1 border border-solid border-gray-200 px-4 my-2 cursor-pointer z-10"
//                 key={index}
//                 onClick={() => router.push(`/recipe/${recipe.id}`)}
//               >
//                 <div className="flex justify-center">
//                   {recipe?.image && recipe.image.length !== 0 ? (
//                     <div className="flex flex-col justify-center items-center w-[200px] h-[200px] overflow-hidden">
//                       <img
//                         src={`${recipe.image[0]}`}
//                         className="w-[100%] h-[100%] object-cover bg-gray-200 rounded-md flex text-gray-400"
//                         alt="레시피 이미지"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-[200px] h-[200px] bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
//                       이미지
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex gap-x-4 h-full overflow-hidden">
//                   <div className="py-2 w-full">
//                     <div className="text-xl font-semibold leading-6 text-gray-900 py-2">
//                       {recipe.title ? (
//                         recipe.title
//                       ) : (
//                         <div className="text-gray-400 text-center">
//                           제목이 없습니다.
//                         </div>
//                       )}
//                     </div>

//                     {/* 재료 부분인데 보여줄지 고민중 */}
//                     {/* <div className="mt-1 py-2 text-xs font-medium leading-5 text-center text-gray-500">
//                       {recipe.ingredients.length !== 0 ? (
//                         <div className="flex overflow-hidden">
//                           {recipe.ingredients.map((ingredient: string, i: any) => (
//                             <div
//                               key={i}
//                               className="w-10 p-1 m-1 text-xs bg-gray-100 rounded-md border-solid border-2 border-amber-900"
//                             >
//                               <span className="truncate">{ingredient}</span>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <span className="block p-1 m-1 text-center">
//                           지정된 재료가 없습니다.
//                         </span>
//                       )}
//                     </div> */}

//                     {/* <div className="mt-1 text-xl truncate font-medium leading-5 text-gray-500 py-2">
//                     {recipe.contents}
//                   </div> */}
//                     <div className="flex flex-col">
//                       <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
//                         {maskWriter(recipe.writer as string)}
//                       </div>
//                       <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
//                         {new Date(
//                           recipe?.createdAt as Date
//                         )?.toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       {recipes && (
//         <div className="py-10">
//           <Pagination
//             page={recipes?.page}
//             totalPage={recipes?.totalPage}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       )}
//     </>
//   );
// }
