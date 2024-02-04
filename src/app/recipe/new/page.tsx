"use client";

import React, { useState } from "react";

const RecipeNewPage = () => {
  const [writer, setWriter] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("작성자:", writer);
    console.log("요리 이름:", recipeName);
    console.log("재료:", ingredients);
    console.log("과정:", instructions);
  };

  return (
    <div>
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
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default RecipeNewPage;
