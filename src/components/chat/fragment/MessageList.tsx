import React, {useEffect, useRef} from "react";
import {MessageProp} from "@/components/chat/chatInterface.ts";
import {useChatLogList} from "@/hooks/useChatLogList.ts";
import { ClassificianDate } from '@/util/convertDate.ts';
import { ChatLogMap } from '@/components/chat/map/ChatLogMap.tsx';
import { ChatMsgMap } from '@/components/chat/map/ChatMsgMap.tsx';

interface MessageListProps {
    messages: MessageProp[];
    userCode: string;
    roomId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userCode, roomId }) => {

    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const msgRef = useRef<HTMLDivElement[] | null>([])
    const msgStartRef = useRef<HTMLDivElement | null>(null)
    const isType = userCode.charAt(0) === 'U' ? 'USER' : 'EXPERT'


    const {chatLog, isFetching, logLength} = useChatLogList(roomId, scrollContainerRef)

    // console.log('chatLog ', chatLog)

    const isSameDate = (date1:string, date2:string) => {
      return ClassificianDate(date1) === ClassificianDate(date2);
    };

    useEffect(() => {
        console.log('userCode, roomId', userCode, roomId)
    }, []);

    useEffect(() => {
        msgStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [messages]);

    useEffect(() => {
        msgRef.current = Array(chatLog.length).fill(null)
        msgRef.current[logLength-19]?.scrollIntoView({ behavior: 'auto', block: 'start' })
        // 호출(20개씩 받음)마다 포커스를 다르게 하고 싶음.
        // 창 열기 - 0 후, 20씩 증가(즉, 호출하기 직전의 리스트로 포커스하고 싶음.)
    }, [chatLog]);

    return (
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {isFetching && <p>Loading more items...</p>}
        {/*{chatLog &&*/}
        {/*  chatLog.map((log, index) => {*/}
        {/*   const showDate = index === 0 || !isSameDate(chatLog[index].createdAt, chatLog[index-1].createdAt)*/}
        {/*      // console.log('chatLogMap, index', index)*/}
        {/*    return (*/}
        {/*      <div>*/}
        {/*        {showDate && (*/}
        {/*          <div className="text-center my-2 text-blue-100">*/}
        {/*            {ClassificianDate(log.createdAt)}*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        {log.type === isType ? (*/}
        {/*          <div className="ps-5" key={`chatLog-${index}`}>*/}
        {/*            <div ref={(el)=>(msgRef.current[index] = el)} className="p-2 rounded-lg max-w-xs bg-blue-500 text-white self-start">*/}
        {/*              {log.chatMessage || (*/}
        {/*                <img src={log.chatImageUrl} alt="..이미지" />*/}
        {/*              )}*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        ) : (*/}
        {/*          <div className="pe-5" key={`chatLog-${index}`}>*/}
        {/*            <div className="p-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 self-end">*/}
        {/*              {log.chatMessage || (*/}
        {/*                <img src={log.chatImageUrl} alt="..이미지" />*/}
        {/*              )}*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*    )})}*/}
          <ChatLogMap chatLog={chatLog} isType={isType} msgRef={msgRef} isSameDate={isSameDate} />

{/*        {messages.map((msg, index) => {*/}
{/*            console.log(`sender: ${msg.sender}, userCode: ${userCode}`)*/}
{/*          return msg.sender === userCode ? (*/}
{/*          <div className="ps-5" key={`msg-${index}`}>*/}
{/*        <div className="p-2 rounded-lg max-w-xs bg-blue-500 text-white self-start">*/}
{/*          {msg.message || <img src={msg.src} alt="..이미지" />}*/}
{/*        </div>*/}
{/*      </div>*/}
{/*    )*/}
{/*:*/}
{/*  (*/}
{/*    <div className="pe-5" key={`msg-${index}`}>*/}
{/*      <div className="p-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 self-end">*/}
{/*        {msg.message || <img src={msg.src} alt="..이미지" />}*/}
{/*      </div>*/}
{/*    </div>*/}
{/*  )*/}
{/*})*/}
{/*}*/}
          <ChatMsgMap messages={messages} userCode={userCode} />
  <div ref={msgStartRef}></div>
</div>
    )
}
export default MessageList;
