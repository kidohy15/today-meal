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
  const [contentArray, setContentArray] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [lastCallTime, setLastCallTime] = useState<any>();
  // const [lastCallTime, setLastCallTime] = useState<any>(() => {
  //   // 로컬 스토리지에서 마지막 호출 시간을 가져온다.
  //   const storedTime = localStorage.getItem("lastCallTime");
  //   return storedTime ? new Date(storedTime) : null;
  // });
  const [cachedRecipes, setCachedRecipes] = useState<any>([]);
  // const [cachedRecipes, setCachedRecipes] = useState<any>(() => {
  //   const storedRecipes = localStorage.getItem("cachedRecipes");
  //   return storedRecipes ? JSON.parse(storedRecipes) : null;
  // });

  // 오늘 날짜 가져오기
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
    // setCachedRecipes(null)
    // setCachedRecipes(null)
    console.log("cachedRecipes", cachedRecipes);
    console.log("new Date().getTime()", new Date().getTime());
    console.log(
      "new Date(lastCallTime).getTime()",
      new Date(lastCallTime).getTime()
    );
    const time = new Date().getTime() - new Date(lastCallTime).getTime();
    console.log("time", time);
    // new Date().getTime() - new Date(lastCallTime).getTime() > 10 * 1000
    if (time > 10 * 1000) {
      setContentArray(cachedRecipes);
    } else {
      handleRecipe();
      console.log(
        "new Date(lastCallTime).getTime()",
        new Date(lastCallTime).getTime()
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const recipeText = `
  //   1. ${dateString} 날짜에 어울리는 요리 5가지를 추천해주세요.
  //   2. 간단한 설명도 같이 있으면 좋겠습니다.
  //   3. 아래의 예시 형태를 참고해서 출력해주세요.

  //   예시
  //   1. 음식1 제목 : 음식1 설명
  //   2. 음식2 제목 : 음식2 설명
  //   3. 음식3 제목 : 음식3 설명
  //   4. 음식4 제목 : 음식4 설명
  //   5. 음식5 제목 : 음식5 설명
  // `;

  const recipeText = `
    1. ${dateString} 날짜에 어울리는 요리 5가지를 추천해주세요.
    2. 간단한 설명도 같이 있으면 좋겠습니다.
    3. 아래 예시의 형태를 참고해서 출력해주세요.

    예시
    1. 러브 앤 사랑버거 : 2024년 2월 12일은 발렌타인 데이에 해당하는 날로, 사랑을 표현하기에 좋은 요리 추천입니다. 이 버거는 소고기 패티 위에 치즈와 베이컨이 올라가고, 애용하는 소스로 마무리됩니다.
    2. 초코 딸기 타르트: 발렌타인 데이를 기념하면서 초코렛과 딸기를 함께 즐길 수 있는 디저트입니다. 크럼블 베이스 위에 초콜릿과 딸기로 장식된 타르트 쉘을 만들어 채우고, 휘핑 크림으로 마무리합니다.
    3. 브리 치즈 살라미 핀콘: 이탈리아 요리인 핀콘을 한 층 업그레이드하여 만든 베이비 피자입니다. 바삭한 베이비 피자 반죽 위에 브리 치즈와 살라미를 얹어 구운 후 알배트 핫소스로 매콤하게 마무리합니다.
    4. 로즈마리 버터 구운 연어: 화이트데이를 기념해 고급스럽고 특별한 요리인 로즈마리 버터 구운 연어를 추천합니다. 신선한 연어를 로즈마리와 버터로 구워 고소한 맛을 더해주고, 곁들이는 작은 샐러드와 함께 멋진 저녁 식사를 즐길 수 있습니다.
    5. 파스타 프라임아: 이탈리아 요리 중에서도 인기있는 파스타 중 하나인 프라임아입니다. 발렌타인 데이의 특별한 날에 어울리는 요리로, 스파게티를 바짝 익혀 매콤하고 짭짤한 토마토 소스에 버터와 야채를 함께 넣어 감칠맛을 더해줍니다.
  `;

  // openai 로 재료 전송
  const handleRecipe = async () => {
    if (
      lastCallTime &&
      new Date().getTime() - new Date(lastCallTime).getTime() < 10 * 1000
      // (new Date() as any) - lastCallTime < 3 * 60 * 60 * 1000
    ) {
      // 마지막 호출 시간이 있고, 마지막 호출 후 3시간이 지나지 않은 경우
      const countdown = new Date().getTime() - new Date(lastCallTime).getTime();
      console.log("남은 시간", countdown);
      return;
    }

    console.log("localStorage", localStorage.getItem("lastCallTime"));
    console.log("localStorage", localStorage.getItem("cachedRecipes"));

    setIsLoading(true);
    setLastCallTime(new Date());
    localStorage.setItem("lastCallTime", new Date().toISOString());

    setChatHistory((prevChat: any) => [
      ...prevChat,
      { role: "user", content: dateString },
    ]);

    const chatCompletion = await openai.chat.completions.create({
      // messages: [{ role: "assistant", content: userInput }],
      messages: [{ role: "assistant", content: recipeText }],
      model: "gpt-3.5-turbo",
    });

    const text = chatCompletion.choices[0].message.content;
    const recipes = text?.split("\n").filter((item) => item.trim() !== "");
    setCachedRecipes(recipes);
    localStorage.setItem("cachedRecipes", JSON.stringify(recipes));

    setContentArray(recipes);

    setIsLoading(false);

    // setChatHistory((prevChat: any) => [
    //   { role: "assistant", content: chatCompletion.choices[0].message.content },
    // ]);

    // console.log(chatCompletion.choices[0].message.content);

    // const text = chatCompletion.choices[0].message.content;
    // console.log("text", text);
    // handleContent(text);

    // setIsLoading(false);
  };

  // const handleContent = (content: string | null) => {
  //   console.log("content", content)
  //   // const textArray = content?.split("\n");
  //   const textArray = content?.split("\n").filter(item => item.trim() !== "");
  //   console.log("textArray", textArray)
  //   setContentArray(textArray);
  // };

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
          <div className=" flex m-2 p-2 border-solid border-y-cyan-900 border-2">
            {contentArray.map((content: string, index: any) => (
              <div
                key={index}
                className="m-2 p-2 border-solid border-y-cyan-900 border-2"
              >
                {content}
              </div>
            ))}
          </div>
          {/* <div className=" flex m-2 p-2 border-solid border-y-cyan-900 border-2">
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
          </div> */}
        </div>
      )}
    </div>
  );
}
