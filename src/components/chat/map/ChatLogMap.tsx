import { ClassificianDate } from '@/util/convertDate.ts';
import React from 'react';
import { ChatLog } from '@/components/chat/chatInterface.ts';


interface ChatLogMapProps {
  chatLog: ChatLog[];
  isType: string;
  msgRef: React.RefObject<HTMLDivElement[]>;
  isSameDate: (arg1: string, arg2: string) => boolean;
}

export const ChatLogMap: React.FC<ChatLogMapProps> = ({ chatLog, isType, msgRef, isSameDate }) => {
  return (
       chatLog.map((log, index) => {
      const showDate = index === 0 || !isSameDate(chatLog[index].createdAt, chatLog[index-1].createdAt)
      // console.log('chatLogMap, index', chatLog)
      return (
  <div>
    {showDate && (
      <div className="text-center my-2 text-blue-100">
        {ClassificianDate(log.createdAt)}
      </div>
    )}
    {log.type === isType ? (
      <div className="ps-5" key={`chatLog-${index}`}>
        <div ref={(el)=>(msgRef.current[index] = el)} className="p-2 rounded-lg max-w-xs bg-blue-500 text-white self-start">
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
    )}
  </div>
)})



  )
}