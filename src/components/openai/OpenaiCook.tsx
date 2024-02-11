/* use client */

import axios from "axios";
import OpenAI from "openai";
import React, { useEffect, useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 여기에 실제 API 키를 넣어주세요
  dangerouslyAllowBrowser: true, // 브라우저에서 사용 허용, 보안상 좋은 위치는 아니니 나중에 api 통신하는 부분단 서버단으로 뺄 수 있으면 뺄면 좋음
});

export default function Openai() {
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  let today = new Date();

  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let dateString = year + "년 " + month + "월 " + day + "일 ";

  console.log(dateString);
  // 결과 : 2021-05-30
  console.log("ingredients");
  console.log("today", today);

  useEffect(() => {
    handleRecipe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recipeText = `
    1. ${dateString} 날짜에 어울리는 요리 5가지를 추천해주세요.
    2. 간단한 설명도 같이 있으면 좋겠습니다.
    2. 텍스트를 잘라서 배열로 사용하려고 합니다. 요리 리스트를 생성할 때, 항목 하나마다 recipe 라는 글자를 하나 생성해서 만들어주세요.
  `;

  // openai 로 재료 전송
  const handleRecipe = async () => {
    setIsLoading(true);
    setChatHistory((prevChat: any) => [
      ...prevChat,
      { role: "user", content: dateString },
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
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center w-[70%] mx-auto bg-slate-300 ">
      {isLoading ? (
        <div className="whitespace-break-spaces">
          loading 레시피를 작성중입니다.
          <br />
          잠시만 기다려주세요.
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-slate-300">이곳에 재료를 입력해주세요</h1>
            <div>
              <span>오늘 날짜 : {dateString}</span>
              <br />
              <span>오늘 이런 음식은 어떠세요?</span>
            </div>
          </div>
          <div></div>
          <div className=" flex m-2 p-2 border-solid border-y-cyan-900 border-2">
            {chatHistory.map((message: any, index: any) => (
              <div
                key={index}
                className={`${
                  message.role === "user" ? "text-left" : "text-left"
                } mb-2`}
              >
                <div>{message.role === "user" ? "H" : "A"}</div>
                <div className="whitespace-break-spaces">{message.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
