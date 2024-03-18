"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { Router, useRouter } from "next/router";
import { useRouter } from "next/navigation";
import SearchFilter from "@/components/SearchFilter";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import RecipeList from "@/components/RecipeList";
import { RecipeApiResponse } from "@/interface";

interface RecipeListProps {
  params: { id: string; page: string };
}

const RecipeListPageSuspense = () => {
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const searchParams = useSearchParams();
  const page: string = searchParams.get("page") ?? "1";

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
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
  );
};

export function RecipeListPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <RecipeListPageSuspense />
    </Suspense>
  );
}

export const dynamicParams = true;
export const dynamic = "force-dynamic";
export default RecipeListPage;
