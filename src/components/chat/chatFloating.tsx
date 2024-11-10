import Chat from '@/components/chat/Chat.tsx';
import React from 'react';
import { ChatRoom } from '@/components/chat/chatInterface.ts';

export interface ChatFloatingProp{
  showChatModal: boolean;
  closeChat: () => void;
  selectedChat: ChatRoom;
  userCode: string;
}

export const chatFloating:React.FC<ChatFloatingProp> =  ({
       userCode, closeChat, selectedChat, showChatModal
                                                         })=> {



  return(
    {showChatModal && (
      <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg z-50">
        <div className="overflow-y-auto rounded-lg h-3/5">
          {selectedChat && (
            <Chat roomChat={selectedChat} chatClose={closeChat} userCode={userCode || ""} />
          )}
        </div>
      </div>
    )}
  )
}