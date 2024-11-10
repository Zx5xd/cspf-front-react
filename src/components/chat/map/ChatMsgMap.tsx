import React from 'react';
import { MessageProp } from '@/components/chat/chatInterface.ts';

interface msgMapProp{
    messages: MessageProp[];
    userCode: string;
}

export const ChatMsgMap: React.FC<msgMapProp> = ({ messages, userCode }) => {
  return messages.map((msg, index) => {
    console.log(`sender: ${msg.sender}, userCode: ${userCode}`);
    return msg.sender === userCode ? (
      <div className="ps-5" key={`msg-${index}`}>
        <div className="p-2 rounded-lg max-w-xs bg-blue-500 text-white self-start">
          {msg.message || <img src={msg.src} alt="..이미지" />}
        </div>
      </div>
    ) : (
      <div className="pe-5" key={`msg-${index}`}>
        <div className="p-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 self-end">
          {msg.message || <img src={msg.src} alt="..이미지" />}
        </div>
      </div>
    );
  });
};