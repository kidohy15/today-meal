"use client";

import React, { useEffect, useState } from "react";
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

interface RecipeListProps {
  params: { id: string; page: string };
}

// const RecipeListPage = ({ params }: RecipeListProps) => {
const RecipeListPage = () => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 검색어
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    //
    <div className="w-full h-full pt-[112px]">
      <div className="px-8 py-12 min-h-[100vh] md:max-w-6xl mx-auto h-full bg-white shadow-md">
        <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
          레시피 목록
        </h2>
        <SearchFilter setSearchKeyword={setSearchKeyword} />
        <RecipeList searchKeyword={searchKeyword} userCheck={false} />
      </div>
    </div>
  );
};

export default RecipeListPage;
