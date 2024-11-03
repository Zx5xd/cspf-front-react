// Chat.tsx
import React, {useEffect, useRef, useState} from "react";
import {
    MainContainer,
    ChatContainer,
    MessageInput,
    ConversationHeader,
    VoiceCallButton, MessageList, Button
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../../style/Chat.css";

import useWebSocket from "./useWebSocket.ts";
import {ChatLogFilter, ChatRoom, MessageProp} from "./chatInterface.ts";
import MsgListComponent from "./MsgListComponent.tsx";
import {axiosGet, axiosImagePost} from "../../util/axiosData.ts";
import voiceHook from "./voiceHook.ts";
import {migHost} from "../../util/apiInof.ts";

interface ChatProps {
    roomChat: ChatRoom;
    onClosed?: () => void
    userCode: string
}

export const Chat: React.FC<ChatProps> = ({roomChat, onClosed, userCode}) => {
    const [messages, setMessages] = useState<MessageProp[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [chatLogs, setChatLogs] = useState<any[]>([]);
    const [logFilter, setLogFilter] = useState<ChatLogFilter | null>(null);
    const [voiceState, setVoiceState] = useState(false);

    const roomId = roomChat.chatRoomID;

    // const roomId = "d86dcdc3-6b63-4c90-894a-dc442eeca387";
    // const cspfDev = import.meta.env.VITE_DEV_CSPF_HOST;
        const cspfDev = migHost()
    // useEffect(() => {
    //     axiosGet(`${cspfDev}chatLog`).then((data)=>{
    //         console.log('chatLog', data)
    //     })
    // }, []);


    // WebSocket 훅 사용
    const {sendMessage} = useWebSocket(roomId, (msg) => {
        console.log(msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
        // console.log(messages)
    });

    const handleSend = (message: string) => {
        const newMessage: MessageProp = {
            message,
            sender: userCode,
            direction: "outgoing",
        };

        // 메시지 전송 및 메시지 추가
        sendMessage(message);
        setMessages([...messages, newMessage]);
    };

    const {endVoice, startVoice} = voiceHook(roomId)

    const voiceChatOpen = () => {
        startVoice(true)
        setVoiceState(true);
    }

    const voiceChatClose = () => {
        endVoice()
        setVoiceState(false);
    }

    const handleAttachClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // 파일이 선택된 경우 처리하는 함수
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {

            // 여기서 파일을 서버로 전송하거나 다른 처리를 진행할 수 있습니다.
            // 예: 서버로 파일 업로드
            const formData = new FormData();

            for (let i = 0; i < files.length; i++) {
                console.log('파일이 선택되었습니다:', files[i]);
                formData.append("files", files[i]);
            }

            axiosImagePost(`${cspfDev}images/${roomId}`, formData)
                // axios.post('your_server_endpoint', formData)
                .then(response => {
                    if (response?.status === 201) {
                        console.log('파일 업로드 성공:', response);
                    } else {
                        console.log('파일 업로드 실패', response?.status);
                    }
                })
                .catch(error => {
                    console.error('파일 업로드 실패:', error);
                });
        }
    };

    return (
        <div style={{position: "relative", height: "500px", width: "400px", margin: "0 auto"}}>
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content
                            userName="TestNick"
                            info="상담요청"
                        />
                        <ConversationHeader.Actions>
                            {voiceState ? (
                                <button onClick={voiceChatClose}>음성 통화 종료</button>
                            ) : (
                                <VoiceCallButton onClick={voiceChatOpen}/>
                            )}
                            <Button onClick={onClosed}> X </Button>
                        </ConversationHeader.Actions>
                    </ConversationHeader>
                    <MessageList>
                        <MsgListComponent messages={messages}/>
                    </MessageList>
                    <MessageInput placeholder="Type your message..." onSend={handleSend}
                                  onAttachClick={handleAttachClick}/>
                </ChatContainer>
            </MainContainer>

            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
                multiple
            />
        </div>
    );
};
