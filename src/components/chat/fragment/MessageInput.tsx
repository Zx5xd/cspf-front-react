import React, { useState } from "react";
import {PhotoIcon, PaperAirplaneIcon, PaperClipIcon} from '@heroicons/react/24/outline'
import useEnterKey from "@/hooks/useEnterKey.ts";

interface MessageInputProps {
    onSendMessage: (text: string) => void;
    onAttachClick: () => void;
    onImageUpload: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
                                                       onSendMessage,
                                                       onAttachClick,
                                                       onImageUpload
                                                   }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSendClick = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue("");
        }
    };

    const { handleKeyDown } = useEnterKey(handleSendClick)

    return (
      <div className="border-t border-gray-200 p-2 flex">
        <PaperClipIcon className="m-2 pt-1 h-1/2 w-auto" onClick={onAttachClick}/>
            <PhotoIcon className="m-2 pt-1 h-1/2 w-auto" onClick={onImageUpload} />
            {/*<button*/}
            {/*    onClick={onAttachClick}*/}
            {/*    className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"*/}
            {/*>*/}
            {/*    Attach*/}
            {/*</button>*/}
            <input
                type="text"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 h-3/4 p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none"
            />

            <PaperAirplaneIcon className={'m-2 pt-1 h-1/2 w-auto'} onClick={() => handleSendClick()} />
            {/*<button*/}
            {/*    onClick={handleSendClick}*/}
            {/*    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"*/}
            {/*>*/}
            {/*    Send*/}
            {/*</button>*/}
        </div>
    );
};

export default MessageInput;
