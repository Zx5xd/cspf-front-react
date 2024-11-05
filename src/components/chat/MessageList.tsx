import React, {useEffect, useRef, useState} from "react";
import {ChatLog, MessageProp} from "./chatInterface";
import {axiosGet} from "@/util/axiosData.ts";
import {migHost} from "@/util/apiInof.ts";
import {ChatTimeToKoreanTime} from "@/util/convertDate.ts";
import {useChatLogList} from "@/components/chat/useChatLogList.ts";

interface MessageListProps {
    messages: MessageProp[];
    userCode: string;
    roomId: string;
    page: number;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userCode, page, roomId }) => {


    const msgRef = useRef<HTMLDivElement | null>(null);
    const isType = userCode.charAt(0) === 'U' ? 'USER' : 'EXPERT'

    const {chatLog} = useChatLogList(roomId, page)

    useEffect(() => {
      msgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [messages, chatLog]);

    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatLog &&
          chatLog.map((log, index) => {
            return (log.type === isType) ? (
              <div className="ps-5" key={`chatLog-${index}`}>
                <div className="p-2 rounded-lg max-w-xs bg-blue-500 text-white self-start">
                  {log.chatMessage || (
                    <img src={log.chatImageUrl} alt="..이미지" />
                  )}
                </div>
              </div>
            ) : (
              <div className="pe-5" key={`chatLog-${index}`}>
                <div className="p-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 self-end">
                  {log.chatMessage || (
                    <img src={log.chatImageUrl} alt="..이미지" />
                  )}
                </div>
              </div>
            );
          })}

        {messages.map((msg, index) => {
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
        })}
        <div ref={msgRef}></div>
      </div>
    );
}
            export default MessageList;
