"use client";

import React, { Suspense, useState } from "react";
import SearchFilter from "@/components/SearchFilter";
import { useSearchParams } from "next/navigation";
import RecipeList from "@/components/RecipeList";

const RecipeListPage = () => {
  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "1";

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Suspense>
      <div className="w-full h-full pt-[112px]">
        <div className="px-8 py-12 min-h-[100vh] md:max-w-6xl mx-auto h-full bg-white shadow-md">
          <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
            레시피 목록
          </h2>
          <SearchFilter setSearchKeyword={setSearchKeyword} />
          <RecipeList
            searchKeyword={searchKeyword}
            userCheck={false}
            page={page}
          />
        </div>
      </div>
    </Suspense>
  );
};

export const dynamicParams = true;
export const dynamic = "force-dynamic";
export default RecipeListPage;
