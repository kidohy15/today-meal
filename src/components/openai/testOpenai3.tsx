/* use client */

import axios from "axios";
import OpenAI from "openai";
import React, { useState } from "react";

export default function Openai111() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = async () => {
    setIsLoading(true);
    setChatHistory((prevChat:any) => [
      ...prevChat,
      { role: "user", content: userInput },
    ]);

    // 서버사이드 API 엔드포인트 호출
    try {
      const response = await axios.post("/api/openai", {
        userInput,
        chatHistory,
      });

      const responseData = response.data;
      // 서버에서 받은 데이터를 사용하여 UI 업데이트 등의 작업 수행
      console.log(responseData.chatHistory);
    } catch (error) {
      console.error("Error while calling OpenAI API:", error);
    }

    setUserInput("");
    setIsLoading(false);
  };

  return (
    <div className="mx-2">
      <div className="mx-2">
        <div className="mx-2">
          <div>촘1</div>
        </div>
        <div className="mx-2">
          {chatHistory.map((message: any, index: any) => (
            <div
              key={index}
              className={`${
                message?.role === "user" ? "text-left" : "text-right"
              } mb-2`}
            >
              <div>{message?.role === "user" ? "H" : "A"}</div>
              <div>{message?.content}</div>
            </div>
          ))}
        </div>
        <div className="mx-2">
          <input
            type="text"
            placeholder="입력"
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