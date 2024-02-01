"use client";

// ChatComponent.js
import React, { useState } from 'react';
import { generateChat } from '@/app/api/chatgpt';
import NeonButton from '../utils/NeonButton';
import ShadedButton from '../utils/ShadedButton';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<any>([]);

  const handleSendMessage = async () => {
    const newChat:any = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');

    try {
      const response = await generateChat(newChat);
      setChat([...newChat, { role: 'assistant', content: response }]);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
          <div>
        <NeonButton label="Click Me" />
        <ShadedButton label="Click Me" />
      {/* 여기에 다른 컴포넌트나 내용을 추가하세요 */}
    </div>
      <div>
        {chat.map((message:any, index:any) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;