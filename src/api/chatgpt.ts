// api.js
import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // 여기에 실제 API 키를 넣어주세요

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  },
});

export const generateChat = async (messages:any) => {
  try {

    console.log('API Request:', {
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const response = await openai.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    console.log('API Response:', response.data);

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating chat:', error);
    throw error;
  }
};