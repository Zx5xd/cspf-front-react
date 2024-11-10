import { useEffect, useState } from 'react';
import { axiosGet } from '@/util/axiosData.ts';
import { migHost } from '@/util/apiInof.ts';
import { ChatLog, ChatRoom, MessageProp } from '@/components/chat/chatInterface.ts';
import { z } from 'zod';

interface ComplainListProps {
  id: number;
  declarer: string;
  perpetrator: string;
  description: string;
  createdAt: string;
  processingStatus: number;
}

export interface ComplainInfoProps {
  id: number;
  declarer: string;
  perpetrator: string;
  description: string;
  createdAt: string;
  processingStatus: number;
  chatLogs: ChatLog;
  chatRoomId: ChatRoom;
}

// compInfo 스키마 정의
const CompInfoSchema = z.object({
  chatLogs: z.object({
    chatLogID: z.string(), // chatLogId는 숫자 타입
  }),
  chatRoomId: z.object({
    chatRoomID: z.string(), // chatRoomID는 문자열 타입
  }),
});

// 검증 함수
const validateCompInfo = (data: unknown) => {
  try {
    console.log('data', data);
    const compInfo = CompInfoSchema.parse(data); // 검증 성공 시 반환
    return compInfo;
  } catch (error) {
    console.error("Validation failed:", error.errors); // 검증 실패 시 오류 출력
    return null;
  }
};

export const useChatComplain = () => {
  const [compList, setCompList] = useState<ComplainListProps[]>([]);
  const [compInfo, setCompInfo] = useState<ComplainInfoProps>();
  const [compLogs, setCompLogs] = useState<ChatLog[]>([]);

  const getCompList = async () => {
    await axiosGet(`${migHost()}chatComplaint/compList`).then((data) => {
      // console.log('getCompList', data.data);
      setCompList(data?.data);
    });
  };

  const getCompInfo = async (id: number) => {
    await axiosGet(`${migHost()}chatComplaint/${id}`).then((data) => {
      // console.log('getCompInfo', data.data);
      setCompInfo(data && data.data);
    });
  };

  const getComplainChatLogs = async (compInfo: ComplainInfoProps) => {
    // console.log('getComplain', compInfo.chatLogs, compInfo.chatLogs.chatLogID)
    const validatedCompInfo = validateCompInfo(compInfo);

    if (!validatedCompInfo) {
      // console.error("Invalid compInfo structure");
      return;
    }

    const option = {
      chatLog: validatedCompInfo.chatLogs.chatLogID,
      roomId: validatedCompInfo.chatRoomId.chatRoomID,
    };

    await axiosGet(`${migHost()}chatLog/complain`, option).then((data) => {
      console.log('compLogs', data?.data);
      setCompLogs(data?.data);
    });
  };

  useEffect(() => {
    getCompList();
  }, []);

  useEffect(() => {
    if (compInfo) {
      // console.log('getComplainChatLogs 실행');
      getComplainChatLogs(compInfo);
    }
  }, [compInfo]);

  return { getCompList, getCompInfo, getComplainChatLogs, compList, compInfo, compLogs };
};
