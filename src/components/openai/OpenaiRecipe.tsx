/* eslint-disable @next/next/no-img-element */
/* use client */

import OpenAI from "openai";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../loader";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 실제 API 키
  dangerouslyAllowBrowser: true, // 브라우저에서 사용 허용
});

export default function Openai() {
  const [userInput, setUserInput] = useState<any>("");
  const [ingredients, setIngredients] = useState<any>([]);
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isOpen, setIsOpen] = useState<any>(false);

  const recipeText = `
    음식명:

    재료:

    과정:
    
    주의사항:

    1. 답변할 때 상단의 형식으로 알려주세요.
    2. ${ingredients} 를 이용한 요리 레시피를 알려주세요. 혹은 ${ingredients}이 이미 완성된 음식이라고 판단되면 그것을 만드는 법을 알려주세요.
    `;
  // 3. 만약 ${ingredients} 에서 음식이나 요리의 재료가 아닌 것이 있다면 "잘못된 입력값이거나 제공해드릴 레시피가 없습니다." 를 메시지로 보여주세요.

  // 입력한 재료를 배열에 추가
  const handleAddIngredient = () => {
    if (userInput === "" || userInput === undefined) {
      return toast.error("다시 입력해주세요.");
    }
    setIngredients((prevInputs: any) => [...prevInputs, userInput]);
    setUserInput("");
  };

  // openai 로 재료 전송
  const handleRecipe = async () => {
    if (ingredients.length < 2) {
      return toast.error("최소 2개 이상의 재료를 입력해주세요.");
    }
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

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleAddIngredient(); // Enter 입력이 되면 재료 추가 실행
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full min-h-[100vh] pt-[112px] ">
      {/* {true ? ( */}
      {isLoading ? (
        <div className="h-[100vh] w-[100vw] bg-white text-center">
          <div className="absolute top-[30%] h-full w-full">
            <img
              src="/images/pngtree-simple-set-bento-nihon-lunch-box-clipart-png-image_6573042-removebg-preview.png"
              width={"200px"}
              height={"200px"}
              alt="도시락 이미지"
              className=" mx-auto"
            />
            <h2 className="mb-10 text-2xl font-bold">
              레시피 작성중입니다. 잠시만 기다려주세요!
            </h2>
            <Loader />
          </div>
        </div>
      ) : (
        <div className="w-full md:max-w-6xl h-full min-h-[100vh] bg-white shadow-md">
          <div className="px-8 py-12">
            <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
              레시피 추천받기
            </h2>
          </div>
          <div className="w-full min-h-[920px] items-center justify-center px-10">
            <div className="mx-auto flex flex-col justify-center">
              <div className="text-center w-full mx-auto h-[30%]">
                <span className="p-3 text-2xl font-semibold text-stone-600">
                  이곳에 재료를 입력해주세요
                </span>{" "}
                <br />
                <span className="inline-block py-2 text-stone-500">
                  (음식과 관련된 키워드를 입력해야 적절한 레시피를 제공받을 수
                  있습니다.)
                </span>
                <div className="m-7 flex">
                  <input
                    type="text"
                    className="w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
                    placeholder="재료를 입력해주세요"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleOnKeyPress}
                  />
                  <button
                    className="w-[120px] p-2 mx-1 bg-stone-200 hover:bg-stone-300 rounded-md"
                    onClick={() => handleAddIngredient()}
                  >
                    추가하기
                  </button>
                </div>
              </div>
              <div className="p-5">
                <span className="text-md font-semibold text-stone-500 ">
                  선택한 재료
                </span>
                <div className="flex flex-wrap min-h-[50px] w-full mt-2 items-center shadow-sm border-solid border-2 border-zinc-200">
                  {ingredients?.map((ingredients: any, index: any) => (
                    <div
                      key={index}
                      className="p-2 m-2 bg-gray-100 rounded-md border-solid border-2 border-amber-900"
                    >
                      {ingredients}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="w-76 h-12 text-lg font-medium p-3 m-1 shadow-md rounded-md bg-rose-200 hover:bg-rose-300 transition duration-300 ease-in-out"
                  onClick={handleRecipe}
                >
                  오늘의 레시피 제작{" "}
                  <span className="font-bold text-red-500">GO!</span>
                </button>
              </div>
              <span className="inline-block text-center"></span>
            </div>

            <div className="w-full min-h-[300px] mt-[5%] mb-20 p-5">
              <span className="inline-block m-2 text-stone-500 font-semibold">
                레시피
              </span>
              <div className="w-full h-full shadow-sm border-solid border-2 border-zinc-200">
                {isOpen ? (
                  <div className="m-3 sm:py-20 sm:px-16 h-full text-stone-900 font-sans test-sm md:text-lg leading-7">
                    {chatHistory.map((message: any, index: any) => (
                      <div
                        key={index}
                        className={`${
                          message.role === "user" ? "text-left" : "text-left"
                        } mb-2`}
                      >
                        <div className="whitespace-break-spaces">
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[200px] text-center flex items-center justify-center text-zinc-500">
                    현재 작성된 레시피가 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
