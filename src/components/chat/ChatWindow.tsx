import React, {useState} from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { MessageProp } from "./chatInterface";
import { PhoneIcon, PhoneXMarkIcon, XMarkIcon } from '@heroicons/react/24/outline'
import voiceHook from "@/components/chat/voiceHook.ts";

interface ChatWindowProps {
    messages: MessageProp[];
    onSendMessage: (text: string) => void;
    onAttachClick: () => void;
    onImageUpload: () => void;
    userCode: string;
    roomId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
                                                   messages,
                                                   onSendMessage,
                                                   onAttachClick,
                                                   onImageUpload,
                                                    userCode,
                                                    roomId
                                               }) => {
    const [voiceState, setVoiceState] = useState(false);
    const {startVoice, endVoice} = voiceHook(roomId)

    const handleStartVoice = () => {
        console.log(roomId)
        startVoice()
        setVoiceState(!voiceState);
    }

    const handleEndVoice = () => {
        endVoice()
        setVoiceState(!voiceState);
    }

    return(
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg flex flex-col h-96">
        <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Chat Room</h2>

                {voiceState ?  <PhoneXMarkIcon className="size-5 w-auto text-blue-500 ms-5 ps-4" onClick={handleEndVoice}/>: <PhoneIcon className="size-5 w-auto text-blue-500 ms-5 ps-4" onClick={handleStartVoice}/>}
                <XMarkIcon className="size-5 w-auto text-center text-blue-500"/>

        </div>
        <MessageList messages={messages} userCode={userCode} />
        <MessageInput onSendMessage={onSendMessage} onAttachClick={onAttachClick} onImageUpload={onImageUpload} />
    </div>
)};

export default ChatWindow;
