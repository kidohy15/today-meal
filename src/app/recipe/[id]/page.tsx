"use client";

import { useRouter } from "next/navigation";
import React from "react";

const RecipeDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = params.id;
  return <div>RecipeDetailPage ! {id}</div>;
};

export default RecipeDetailPage;
