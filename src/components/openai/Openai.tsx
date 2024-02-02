/* use client */

import axios from "axios";
import OpenAI from "openai";
import React, { useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 여기에 실제 API 키를 넣어주세요
  dangerouslyAllowBrowser: true, // 브라우저에서 사용 허용
});

export default function Chatgpt() {
  const [userInput, setUserInput] = useState<any>("");
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);

  const handleUserInput = async () => {
    setIsLoading(true);
    setChatHistory((prevChat: any) => [
      ...prevChat,
      { role: "user", content: userInput },
    ]);

    const chatCompletion = await openai.chat.completions.create({
      messages: [...chatHistory, { role: "assistant", content: userInput }],
      model: "gpt-3.5-turbo",
    });

    setChatHistory((prevChat: any) => [
      ...prevChat,
      { role: "assistant", content: chatCompletion.choices[0].message.content },
    ]);

    setUserInput("");
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <div>
          <div>촘</div>
          <p>111</p>
        </div>
        <div>
          {chatHistory.map((message: any, index: any) => (
            <div
              key={index}
              className={`${
                message.role === "user" ? "text-left" : "text-right"
              } mb-2`}
            >
              <div>{message.role === "user" ? "H" : "A"}</div>
              <div>{message.content}</div>
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
            <div>loading</div>
          ) : (
            <button onClick={handleUserInput}>ask</button>
          )}
        </div>
      </div>
    </div>
  );
}