"use client";

// index.js
import { useState } from 'react';

export default function Chat() {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion('');
  };
  return (
    <>
      <button type='submit'>질문하기</button>
      <form>
        <input
          type='text'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </form>
    </>
  );
}