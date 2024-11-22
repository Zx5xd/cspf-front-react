import {useEffect, useState} from "react";
import {useChatLogStore, useChatRoomStore} from "@/store/chatStore.ts";
import {Chat, User} from "@/types";

export interface SaveChatType {
  variant: 'sent' | 'received',
  content: Chat
}

const useChat = ():{
  chatMessages:Chat[],
  addMessage:(message: Chat) => void,
  sendSocketMessage:(data: Chat) => void,
  userProfile:User
  id: string,
} =>{
  const {userProfile,setUserProfile, socket, setSocket, id} = useChatRoomStore();
  const {
    chatMessages,cacheMessages,addMessage, oldMsgRemove, clear
  } = useChatLogStore();

  useEffect(() => {
    /*if (!socket) {
      console.warn('Socket is not initialized.');
    }*/

    // 메시지 수신 이벤트 설정
    if (socket != null) {
      socket.on('connect',()=>{
        socket.emit('recent',{recentMsg:50})
      });

      socket.on('message', (msg:Chat) => {
        addMessage(msg)
      });

      socket.on('recent',(data:{profile:User,content:Chat[]})=>{
        setUserProfile(data.profile);
        Array.from(data.content).forEach(value => {
          addMessage(value)
        })
      })
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const sendSocketMessage = (data:Chat) => {
    socket.emit("message",data)
  }

  return {chatMessages, addMessage, sendSocketMessage, id, userProfile}
}

export default useChat