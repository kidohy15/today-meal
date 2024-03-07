// // server-side code (e.g., in a Next.js API route)
// import OpenAI from "openai";
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());

// // export default async function handler(req: any, res: any) {
//   // app.post("/api/openai" , async (req: any, res: any) => {
//   export default async function (req: any, res: any) {
//   const openai = new OpenAI({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//   });

//   const userInput = req.body.userInput; // Example: Assuming the user input is sent in the request body
//   const chatHistory = req.body.chatHistory;

//   // const chatCompletion = await openai.chat.completions.create({
//   const chatCompletion = await openai.chat.completions.create({
//     messages: chatHistory,
//     model: "gpt-3.5-turbo",
//   });

//   // ... rest of the logic ...

//   res.status(200).json({ chatHistory }); // Example: Sending the chat history as a response
// }
