/* use client */

import axios from "axios";
import OpenAI from "openai";
import React, { useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 여기에 실제 API 키를 넣어주세요
  dangerouslyAllowBrowser: true, // 브라우저에서 사용 허용, 보안상 좋은 위치는 아니니 나중에 api 통신하는 부분단 서버단으로 뺄 수 있으면 뺄면 좋음
});

export default function Openai() {
  const [userInput, setUserInput] = useState<any>("");
  const [ingredients, setIngredients] = useState<any>([]);
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isOpen, setIsOpen] = useState<any>(false);

  console.log("ingredients", ingredients);
  const recipeText = `
    음식명:

    재료:

    과정:
    
    주의사항:

    1. 답변할 때 상단의 형식으로 알려주세요.
    2. ${ingredients} 의 레시피 혹은 ${ingredients} 를 이용한 레시피를 알려주세요.
    3. 만약 ${ingredients} 에서 음식의 재료가 아닌 것이 하나라도 있다면 "잘못된 입력값입니다. 다시 시도해주세요!" 를 메시지로 보여주세요.
  `;

  // 입력한 재료를 배열에 추가
  const handleAddIngredient = () => {
    setIngredients((prevInputs: any) => [...prevInputs, userInput]);
    setUserInput("");
  };

  // openai 로 재료 전송
  const handleRecipe = async () => {
    setIsLoading(true);
    setChatHistory((prevChat: any) => [
      ...prevChat,
      { role: "user", content: userInput },
    ]);

    const chatCompletion = await openai.chat.completions.create({
      // messages: [{ role: "assistant", content: userInput }],
      messages: [{ role: "assistant", content: recipeText }],
      model: "gpt-3.5-turbo",
    });

    setChatHistory((prevChat: any) => [
      { role: "assistant", content: chatCompletion.choices[0].message.content },
    ]);

    console.log(chatCompletion.choices[0].message.content);

    setUserInput("");
    setIsLoading(false);
    setIsOpen(true);
    setIngredients([]);
  };
  // bg-slate-300
  return (
    <div className="flex justify-center w-[70%] mx-auto h-[90%] bg-slate-300 overflow-hidden">
      {isLoading ? (
        <div className="whitespace-break-spaces">
          loading 레시피를 작성중입니다.
          <br />
          잠시만 기다려주세요.
        </div>
      ) : (
        <div className="bg-red-400 flex gap-5 p-4 w-max-[900px] items-center">
          <div className="bg-orange-300">
            <h1 className="text-slate-300 p-3">이곳에 재료를 입력해주세요</h1>
            <div className="p-3">
              <span className="">선택한 재료</span>
              <div className="flex ">
                {ingredients?.map((ingredients: any, index: any) => (
                  <div key={index} className="p-1 m-1 bg-teal-500 rounded-md">
                    {ingredients}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-7 bg-orange-100">
              <input
                type="text"
                className="p-1 m-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
                placeholder="재료를 입력해주세요"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button className="p-3 m-1" onClick={() => handleAddIngredient()}>
                추가하기
              </button>
              <div>
                <button className="p-3 m-1" onClick={handleRecipe}>
                  오늘의 레시피 제작 GO!
                </button>
              </div>
            </div>
          </div>

          {isOpen && (
            <div className="m-2 p-2 border-solid border-r-indigo-900 border-2 bg-[url('/images/note.jpg')]">
              {chatHistory.map((message: any, index: any) => (
                <div
                  key={index}
                  className={`${
                    message.role === "user" ? "text-left" : "text-left"
                  } mb-2`}
                >
                  {/* <div>{message.role === "user" ? "H" : "A"}</div> */}
                  {/* <div>{message.role === "user" ? "H" : "요리 제목: "}</div> */}
                  <div className="whitespace-break-spaces">
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
