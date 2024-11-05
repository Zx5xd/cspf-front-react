import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import { ChatRoom } from "./chatInterface";
import useWebSocket from "./useWebSocket";
import useFileUpload from "@/components/chat/useFileUpload.ts";

interface ChatProps {
    roomChat: ChatRoom;
    userCode: string;
    chatClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ chatClose, userCode, roomChat   }) => {
    const [messages, setMessages] = useState([]);

    const { sendMessage } = useWebSocket(roomChat.chatRoomID, (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    });

    const handleSend = (text: string) => {
        sendMessage(text);
        setMessages((prevMessages) => [
            ...prevMessages,
            { message: text, sender: userCode, direction: "outgoing" },
        ]);
    };

    const {triggerFileSelect, fileInputRef, ChatFileSend} = useFileUpload(roomChat.chatRoomID);

    return (
        <div className="flex items-center justify-center bg-gray-100">
            <ChatWindow
                chatClose={chatClose}
                messages={messages}
                onSendMessage={handleSend}
                onAttachClick={triggerFileSelect}
                onImageUpload={triggerFileSelect}
                userCode = {userCode}
                roomId = {roomChat.chatRoomID}
            />
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                multiple
                onChange={ChatFileSend}
            />
        </div>
    );
};

export default Chat;
