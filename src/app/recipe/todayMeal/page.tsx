"use client";

import React from "react";
import OpenaiRecipe from "@/components/openai/OpenaiRecipe";

const TodayMealPage = () => {
  return (
    <div>
      <div className=" w-full h-full mt-10">
        <OpenaiRecipe />
      </div>
    </div>
  );
};

export default TodayMealPage;
