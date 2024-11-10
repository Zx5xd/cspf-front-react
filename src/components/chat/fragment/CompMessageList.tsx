import React, {useEffect, useRef} from "react";
import { ChatLog, MessageProp } from '@/components/chat/chatInterface.ts';
import {useChatLogList} from "@/hooks/useChatLogList.ts";
import { ClassificianDate } from '@/util/convertDate.ts';
import { ChatLogMap } from '@/components/chat/map/ChatLogMap.tsx';
import { ChatMsgMap } from '@/components/chat/map/ChatMsgMap.tsx';
import { ComplainInfoProps } from '@/hooks/useChatComplain.ts';
import { ChatCompMap } from '@/components/chat/map/ChatCompMap.tsx';

interface MessageListProps {
    compLogs: ChatLog[];
    compInfo: ComplainInfoProps;
}

const CompMessageList: React.FC<MessageListProps> = ({
  compLogs, compInfo
                                                     }) => {

    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const msgStartRef = useRef<HTMLDivElement | null>(null)
    const isType = "declarer"

    // console.log('chatLog ', chatLog)

    const isSameDate = (date1:string, date2:string) => {
      return ClassificianDate(date1) === ClassificianDate(date2);
    };

    useEffect(() => {
        console.log('userCode, roomId')
    }, []);

    useEffect(() => {
        msgStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [compLogs]);

    return (
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2 h-96">
          <ChatCompMap chatLog={compLogs} isType={isType} isSameDate={isSameDate} />

  <div ref={msgStartRef}></div>
</div>
    )
}
export default CompMessageList;
