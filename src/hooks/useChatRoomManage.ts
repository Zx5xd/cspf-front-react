import { axiosGet } from '@/util/axiosData.ts';
import { migHost } from '@/util/apiInof.ts';
import { useEffect, useState } from 'react';
import { ChatLog, ChatRoom } from '@/components/chat/chatInterface.ts';

export const useChatRoomManage = () => {

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [chatLastLogs, setChatLastLogs] = useState<ChatLog[] | null>([]);
  let ls: number;

  const chatRoomList = async () => {
    const res = await axiosGet(`${migHost()}chatRoom/user/access`);
    if (res?.data?.content) {
      setChatRooms(res.data.content);
    }
  }

  const getLastLog = () => {
    console.log('getLastLog chatRooms')
    chatRooms.forEach((room, index) => {
      console.log(room)
      axiosGet(`${migHost()}chatLog`,{
        roomId: room.chatRoomID,
      }).then(async (data) => {
        if(data?.data.total > 0){
          const entriesData = Object.entries(data?.data.results);
          ls = data?.data.results.length
          setChatLastLogs(prevData => [...prevData, entriesData[ls - 1][1]])
        }
        else{
          setChatLastLogs(data?.data.results)
        }
      })
    })
  }

  useEffect(() => {
    chatRoomList();
  }, []);

  useEffect(() => {
    if (chatRooms.length > 0) {
      getLastLog();
    }
  }, [chatRooms]);


  return {chatRooms, chatLastLogs}

}