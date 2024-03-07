/* use client */

import axios from "axios";
import OpenAI from "openai";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../loader";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 실제 API 키
  dangerouslyAllowBrowser: true, // 브라우저에서 사용 허용, 보안상 좋은 위치는 아니니 나중에 api 서버로 뺄 수 있으면 빼자
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
    2. ${ingredients} 를 이용한 요리 레시피를 알려주세요. 혹은 ${ingredients}이 이미 완성된 음식이라고 판단되면 그것을 만드는 법을 알려주세요.
    `;
  // 3. 만약 ${ingredients} 에서 음식이나 요리의 재료가 아닌 것이 있다면 "잘못된 입력값이거나 제공해드릴 레시피가 없습니다." 를 메시지로 보여주세요.

  // 입력한 재료를 배열에 추가
  const handleAddIngredient = () => {
    setIngredients((prevInputs: any) => [...prevInputs, userInput]);
    setUserInput("");
  };

  // openai 로 재료 전송
  const handleRecipe = async () => {
    if (ingredients.length < 2) {
      console.log("길이: ", ingredients.length);
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

  // isOpen 상태를 토글하여 사이드바를 열고 닫는다
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full min-h-[100vh] pt-[112px]">
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
        <div className="w-full md:max-w-6xl h-full  bg-white">
          <div className="px-8 py-12">
            <h2 className="block text-2xl py-3 px-1 mb-5 font-semibold leading-7 text-gray-900 border-solid border-b-2 border-b-orange-600">
              레시피 추천받기
            </h2>
          </div>
          <div className="w-full min-h-[920px] items-center justify-center px-10">
            <div className="mx-auto flex flex-col justify-center">
              <div className="p-3">
                <span className="">선택한 재료</span>
                <div className="flex flex-wrap bg-white w-[300px] mt-2">
                  {ingredients?.map((ingredients: any, index: any) => (
                    <div key={index} className="p-1 m-1 bg-slate-50 rounded-md">
                      {ingredients}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center w-full mx-auto h-[30%]">
                <h1 className="p-3">이곳에 재료를 입력해주세요</h1>
                <div className="m-7 bg-orange-100 flex">
                  <input
                    type="text"
                    className="w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
                    placeholder="재료를 입력해주세요"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                  <button
                    className="w-[120px] p-2 m-1 "
                    onClick={() => handleAddIngredient()}
                  >
                    추가하기
                  </button>
                </div>
                <div className="flex justify-center">
                  <button
                    className="p-3 m-1 bg-pink-200"
                    onClick={handleRecipe}
                  >
                    오늘의 레시피 제작 GO!
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-[980px] mt-[5%] mb-5">
              <div className="bg-black w-full h-full bg-no-repeat">
                {isOpen && (
                  <div className="m-1 py-20 px-16 h-full text-white font-serif text-lg leading-7">
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
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
