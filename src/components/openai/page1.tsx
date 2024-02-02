"use client";

// index.js
import { useState } from 'react';
import { main } from '../../app/api/generate';
import Chatgpt from './Openai';

export default function Chat() {
  const [question, setQuestion] = useState<any>('');
  const [answer, setAnswer] = useState<any>();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await main(
      //   {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ question: question }),
      // }
      )
      const response1 = await fetch('../api/generate.ts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question }),
      });

      // const data = await response.json();
      const data = await response;

      // if (response.status !== 200) {
      // if (!response) {
      //   throw (
      //     // data.error ||
      //     // new Error(`request failed with status ${response.status}`)
      //     console.log("에러")
      //   );
      // }

      // setAnswer(data.result);
      setAnswer(data);
      setQuestion('');
    } catch (error:any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type='submit'>질문하기</button>
      </form>
      <div>{answer}</div>

      <Chatgpt />
    </>
  );
}