"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface EditPageProps {
  params: { id: string };
  recipeId: any;
  initialValues: any;
  onSubmit: any;
}

const EditPage = ({
  params,
  recipeId,
  initialValues,
  onSubmit,
}: EditPageProps) => {
  const router = useRouter();
  const id = params.id;

  const [writer, setWriter] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    // 초기 데이터 설정
    setWriter(initialValues.writer || "");
    setRecipeName(initialValues.recipeName || "");
    setIngredients(initialValues.ingredients || "");
    setInstructions(initialValues.instructions || "");
  }, [initialValues]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 수정된 데이터 전달
    onSubmit({
      recipeId,
      writer,
      recipeName,
      ingredients,
      instructions,
    });
  };

  return (
    <div>
      edit {id}
      <form onSubmit={handleSubmit}>
        <label>
          작성자:
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
        </label>
        <br />
        <label>
          요리 이름:
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </label>
        <br />
        <label>
          재료:
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </label>
        <br />
        <label>
          과정:
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">수정</button>
      </form>
    </div>
  );
};

export default EditPage;
