import React, {useEffect, useRef} from "react";
import {MessageProp} from "./chatInterface";
import {useChatLogList} from "@/components/chat/useChatLogList.ts";
import { ClassificianDate } from '@/util/convertDate.ts';

interface MessageListProps {
    messages: MessageProp[];
    userCode: string;
    roomId: string;
    page: number;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userCode, page, roomId }) => {

    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const msgRef = useRef<HTMLDivElement | null>(null);
    const isType = userCode.charAt(0) === 'U' ? 'USER' : 'EXPERT'


    const {chatLog, isFetching} = useChatLogList(roomId, scrollContainerRef)

    console.log('chatLog ', chatLog)

    const isSameDate = (date1:string, date2:string) => {
      return ClassificianDate(date1) === ClassificianDate(date2);
    };


    useEffect(() => {
      msgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [messages, chatLog]);

    return (
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {isFetching && <p>Loading more items...</p>}
        {chatLog &&
          chatLog.map((log, index) => {
           const showDate = index === 0 || !isSameDate(chatLog[index].createdAt, chatLog[index-1].createdAt)
            return (
              <div>
                {showDate && (
                  <div className="text-center my-2 text-blue-100">
                    {ClassificianDate(log.createdAt)}
                  </div>
                )}
                {log.type === isType ? (
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
                )}
              </div>
            )})}

        {messages.map((msg, index) => {
          return msg.sender === userCode ? (
          <div className="ps-5" key={`msg-${index}`}>
        <div className="p-2 rounded-lg max-w-xs bg-blue-500 text-white self-start">
          {msg.message || <img src={msg.src} alt="..이미지" />}
        </div>
      </div>
    )
:
  (
    <div className="pe-5" key={`msg-${index}`}>
      <div className="p-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 self-end">
        {msg.message || <img src={msg.src} alt="..이미지" />}
      </div>
    </div>
  )
})
}
  <div ref={msgRef}></div>
</div>
    )
}
export default MessageList;
