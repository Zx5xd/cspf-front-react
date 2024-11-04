import React from "react";
import { MessageProp } from "./chatInterface";
import {axiosGet} from "@/util/axiosData.ts";

interface MessageListProps {
    messages: MessageProp[];
    userCode: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userCode }) => {

    console.log("messageList, ", messages, userCode);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">

            {messages.map((msg, index) => (

                (msg.sender === userCode) ?
                    (<div className={'ps-5'}>
                        <div
                            key={index}
                            className={`p-2 rounded-lg max-w-xs  bg-blue-500 text-white self-start`}
                        >
                            {msg.message || <img src={msg.src} alt={"..이미지"}/>}
                        </div>
                    </div>) :
                    (<div className={'pe-5'}>
                            <div
                                key={index}
                                className={`p-2 rounded-lg max-w-xs bg-gray-200 text-gray-900 self-end`}
                            >
                                {msg.message || <img src={msg.src} alt={"..이미지"}/>}
                            </div>
                        </div>
                    )


            ))}
        </div>
    );
}
export default MessageList;
