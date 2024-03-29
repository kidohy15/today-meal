// /* use client */

// import axios from "axios";
// import OpenAI from "openai";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// // import Carousel from "../Carousel";

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // 여기에 실제 API 키를 넣어주세요
//   dangerouslyAllowBrowser: true, // 브라우저에서 사용 허용, 보안상 좋은 위치는 아니니 나중에 api 통신하는 부분단 서버단으로 뺄 수 있으면 뺄면 좋음
// });

// export default function Openai() {
//   const [userInput, setUserInput] = useState<any>("");
//   const [ingredients, setIngredients] = useState<any>([]);
//   const [chatHistory, setChatHistory] = useState<any>([]);
//   const [isLoading, setIsLoading] = useState<any>(false);
//   const [isOpen, setIsOpen] = useState<any>(false);

//   console.log("ingredients", ingredients);
//   const recipeText = `
//     음식명:

//     재료:

//     과정:
    
//     주의사항:

//     1. 답변할 때 상단의 형식으로 알려주세요.
//     2. ${ingredients} 를 이용한 요리 레시피를 알려주세요. 혹은 ${ingredients}이 이미 완성된 음식이라고 판단되면 그것을 만드는 법을 알려주세요.
//     `;
//   // 3. 만약 ${ingredients} 에서 음식이나 요리의 재료가 아닌 것이 있다면 "잘못된 입력값이거나 제공해드릴 레시피가 없습니다." 를 메시지로 보여주세요.

//   // 입력한 재료를 배열에 추가
//   const handleAddIngredient = () => {
//     setIngredients((prevInputs: any) => [...prevInputs, userInput]);
//     setUserInput("");
//   };

//   // openai 로 재료 전송
//   const handleRecipe = async () => {
//     if (ingredients.length < 2) {
//       console.log("길이: ", ingredients.length);
//       return toast.error("최소 2개 이상의 재료를 입력해주세요.");
//     }
//     setIsLoading(true);
//     setChatHistory((prevChat: any) => [
//       ...prevChat,
//       { role: "user", content: userInput },
//     ]);

//     const chatCompletion = await openai.chat.completions.create({
//       // messages: [{ role: "assistant", content: userInput }],
//       messages: [{ role: "assistant", content: recipeText }],
//       model: "gpt-3.5-turbo",
//     });

//     setChatHistory((prevChat: any) => [
//       { role: "assistant", content: chatCompletion.choices[0].message.content },
//     ]);

//     console.log(chatCompletion.choices[0].message.content);

//     setUserInput("");
//     setIsLoading(false);
//     setIsOpen(true);
//     setIngredients([]);
//   };

//   // isOpen 상태를 토글하여 사이드바를 열고 닫는다
//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   // 360_F_461046251_3A1kgU8SSsJsuBz58nLmZUWezXjhuJJA
//   // /images/19558288.jpg
//   // note-4767083_1280
//   // 4fec8a1312fe2a4049f81335fabee3b8
//   // 360_F_461046251_3A1kgU8SSsJsuBz58nLmZUWezXjhuJJA
//   // depositphotos_156700964-stock-photo-light-wooden-table-top-view
//   return (
//     <div className="relative flex justify-center w-full mx-auto h-full bg-[url('/images/depositphotos_156700964-stock-photo-light-wooden-table-top-view.jpg')] bg-cover bg-center overflow-hidden py-20">
//       {isLoading ? (
//         <div className="whitespace-break-spaces h-full">
//           loading 레시피를 작성중입니다.
//           <br />
//           잠시만 기다려주세요.
//         </div>
//       ) : (
//         // note-4767083_1280.webp
//         // urbanbrush-20190509114253808633
//         <div className="w-[1480px] relative">
//           <div className="w-[500px] absolute top-[20%] left-[32%] transform -translate-x-3/4 -translate-y-1/2 text-center">
//             <p className="text-7xl font-semibold italic leading-snug text-black whitespace-pre-wrap">
//               오늘의 식사가 고민이라면?
//             </p>
//           </div>
//           <div className=" h-[10%] my-auto absolute top-[280px]"></div>
//           <div className="w-[1480px] h-[920px] items-center justify-center px-10 flex">
//             {/* 슬라이더 자리 */}

//             <div className="w-[50%] mt-[30%] mx-auto flex flex-col justify-center">
//               <div className="flex flex-col justify-center bg-orange-300 w-full mx-auto h-[30%] items-center  ">
//                 <h1 className=" p-3">이곳에 재료를 입력해주세요</h1>
//                 <div className="p-3">
//                   <span className="">선택한 재료</span>
//                   <div className="flex flex-wrap bg-white w-[300px] mt-2">
//                     {ingredients?.map((ingredients: any, index: any) => (
//                       <div
//                         key={index}
//                         className="p-1 m-1 bg-slate-50 rounded-md"
//                       >
//                         {ingredients}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mb-7 bg-orange-100">
//                   <input
//                     type="text"
//                     className="p-1 m-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500"
//                     placeholder="재료를 입력해주세요"
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                   />
//                   <button
//                     className="p-3 m-1 bg-amber-900"
//                     onClick={() => handleAddIngredient()}
//                   >
//                     추가하기
//                   </button>
//                   <div>
//                     <button className="p-3 m-1" onClick={handleRecipe}>
//                       오늘의 레시피 제작 GO!
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               {/* <div className="flex justify-center right-0 w-[80%] h-[30%] mx-auto bg-slate-800 items-center text-slate-300">
//                 <div className="text-2xl p-4 border-white hover:bg-slate-50 hover:text-black rounded-md">
//                   <button>더 많은 레시피 확인하기!</button>
//                 </div>
//               </div> */}
//             </div>

//             {/* 레시피 결과가 들어 있는 div를 toggleSidebar 함수를 호출하여 열고 닫기
//             화살표 모양으로 열고 닫을 수 있게 수정 예정
//           */}
//             {/* <div
//             className="text-2xl p-4 border-white hover:bg-slate-50 hover:text-black rounded-md"
//             onClick={toggleSidebar}
//             >
//             <button>레시피 결과 보기</button>
//           </div> */}

//             {/* bg-orange-100 bg1 4fec8a1312fe2a4049f81335fabee3b8*/}
//             <div className=" w-[1000px] h-[980px] ml-[160px] mx-[40px] mt-[10%]">
//               <div className="bg-[url('/images/4fec8a1312fe2a4049f81335fabee3b82.jpg')] w-full h-full bg-cover bg-center bg-no-repeat">
//                 {isOpen && (
//                   // <div className="bg-orange-100 w-[30%] h-[80%] absolute top-[10%] right-0 z-10">
//                   // bg-[url('/images/note.jpg')]
//                   <div className="m-1 py-20 px-16 h-full text-white font-serif text-lg leading-7">
//                     {chatHistory.map((message: any, index: any) => (
//                       <div
//                         key={index}
//                         className={`${
//                           message.role === "user" ? "text-left" : "text-left"
//                         } mb-2`}
//                       >
//                         {/* <div>{message.role === "user" ? "H" : "A"}</div> */}
//                         {/* <div>{message.role === "user" ? "H" : "요리 제목: "}</div> */}
//                         <div className="whitespace-break-spaces">
//                           {message.content}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
