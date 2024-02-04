/* use client */

import axios from "axios";
import OpenAI from "openai";
import React, { useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 여기에 실제 API 키를 넣어주세요
  dangerouslyAllowBrowser: true, // 브라우저에서 사용 허용
});

export default function Openai() {
  const [userInput, setUserInput] = useState<any>();
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  const recipeText = `
    음식명:

    재료:

    과정:
    
    주의사항:

    1. 답변할 때 상단의 형식으로 알려주세요.
    2. ${userInput} 의 레시피 혹은 ${userInput} 를 이용한 레시피를 알려주세요
  `;

  const handleUserInput = async () => {
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
  };

  return (
    <div>
      <div>
        <div>
          <div>??</div>
          <p>111</p>
        </div>
        <div>
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
        <div>
          <input
            type="text"
            placeholder="입력 폼"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          {isLoading ? (
            <div className="whitespace-break-spaces">
              loading 레시피를 작성중입니다.
              <br />
              잠시만 기다려주세요.
            </div>
          ) : (
            <button onClick={handleUserInput}>ask</button>
          )}
        </div>
      </div>
    </div>
  );
}
