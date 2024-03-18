// import OpenAI from "openai";
// import * as dotenv from "dotenv";
// // const OpenAI = require("OpenAI");
// // const dotenv = require("dotenv");

// dotenv.config();
// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
// });

// export async function main() {

//   const question = req.body.question || '';

//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: `You are a helpful assistant.` }],
//     // messages: [{ role: "system", content: `You are a helpful assistant. ${question}` }],
//     model: "gpt-3.5-turbo",
//   });

//   // const result = completion.choices[0]

//   console.log(completion.choices[0]);
//   // return res.status(200).json({ result: completion.choices[0]});
//   // return completion.choices[0]
// }

// // main();

// // async (req:any, res:any) => {
// //   if (!openai.apiKey) {
// //     res.status(500).json({
// //       error: {
// //         message: 'OpenAI API key not configured',
// //       },
// //     });
// //     return;
// //   }

// //   const question = req.body.question || '';

// //   const response = await openai.createCompletion({
// //     model: 'text-davinci-003',
// //     prompt: `I am a highly intelligent question answering bot. If you ask me ${question} that is rooted in truth, I will give you the answer to Korean. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"잘 모르겠습니다.\".\n `,
// //     temperature: 0,
// //     max_tokens: 100,
// //   });

// //   res.status(200).json({ result: response.data.choices[0].text });
// // }



// // import OpenAI from 'openai';
// // // const OpenAI = require("OpenAI");

// // const openai = new OpenAI({
// //   apiKey: process.env["OPENAI_API_KEY"], // defaults to process.env["OPENAI_API_KEY"]
// // });

// // async function main() {
// //   const params: OpenAI.Chat.ChatCompletionCreateParams = {
// //     messages: [{ role: 'user', content: 'Say this is a test' }],
// //     model: 'gpt-3.5-turbo',
// //   };
// //   const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
// // }

// // main();

// // const express = require("express");
// // const cors = require("cors");
// // const bodyParser = require("body-parser");

// // // const { Configuration, OpenAIApi } = require("openai");
// // const OpenAIApi = require('openai');
// // const Configuration = require('openai');

// // // const config = new Configuration({
// // //   apiKey: process.env.OPENAI_API_KEY,
// // // })

// // // const openai = new OpenAIApi(config);
// // const openai = new OpenAIApi.OpenAI({ key: process.env.OPENAI_API_KEY });

// // // setup Server
// // const app = express();
// // app.use(bodyParser.json());
// // app.use(cors());

// // // endpoint for ChatGPT
// // app.post("/chat", async function (req, res) {

// //   const { prompt } = req.body;

// //   const completion = await openai.createCompletion({

// //     // model: "text-devinci-003",
// //     model: 'gpt-3.5-turbo',
// //     max_tokens: 512,
// //     temperature: 0,
// //     prompt: prompt
// //   });

// //   res.send(completion.data.choices[0].text);
// // });

// // const port = 8080;
// // app.listen(port, () => {
// //   console.log(`Server listening on port ${port}`);
// // })
