// MessageListComponent.tsx

import React, {useEffect, useRef, useState} from "react";
// import {Message as ChatMessage, MessageImageContent} from "@chatscope/chat-ui-kit-react";
import { MessageProp } from "./chatInterface.ts";

interface MessageListProps {
    messages: MessageProp[];
}

const MessageListComponent: React.FC<MessageListProps> = ({ messages }) => {
    console.log('messageList, ', messages);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<MessageProp | null>(null);


    const handleMouseDown = (msg: MessageProp, event: React.MouseEvent | React.TouchEvent) => {
        const { clientX, clientY } = "touches" in event ? event.touches[0] : event;
        console.log(clientX, clientY);

        const newTimer = setTimeout(() => {
            handleLongPress(msg, clientX, clientY);
        }, 500);
        setTimer(newTimer);
    };

    const handleMouseUp = () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
    };

    const handleLongPress = (msg: MessageProp, x: number, y: number) => {
        alert(`Long pressed message from ${msg.sender}: "${msg.message}" at position (${x}, ${y})`);
        setSelectedMessage(msg);
        setMenuPosition({ x, y });
    };

    const handleCloseMenu = () => {
        setMenuPosition(null);
        setSelectedMessage(null);
    };

    return (
        <>
            <div onClick={handleCloseMenu} style={{position: "relative"}}>
                {messages.map((msg, index) => (
                    msg.message ? (
                        <ChatMessage
                        key={index}
                        model={{
                            message: msg.message,
                            sentTime: "just now",
                            sender: msg.sender,
                            direction: msg.direction,
                            position: "single",
                        }}
                        onMouseDown={(e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => handleMouseDown(msg, e)}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => handleMouseDown(msg, e)}
                        onTouchEnd={handleMouseUp}
                    />):(
                        msg.src && (
                            <ChatMessage
                                key={index}
                                model={{
                                    message: msg.src,
                                    sentTime: "just now",
                                    sender: msg.sender,
                                    direction: msg.direction,
                                    position: "single",
                                }}
                                onMouseDown={(e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => handleMouseDown(msg, e)}
                                onMouseUp={handleMouseUp}
                                onTouchStart={(e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => handleMouseDown(msg, e)}
                                onTouchEnd={handleMouseUp}
                            />
                    )




                )))}


                {menuPosition && (
                    <div
                        style={{
                            position: "absolute",
                            top: menuPosition.y,
                            left: menuPosition.x,
                            background: "white",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                            zIndex: 1000,
                        }}
                    >
                        <p onClick={() => alert(`Action for ${selectedMessage?.sender}`)}>Action 1</p>
                        <p onClick={() => alert(`Another action for ${selectedMessage?.sender}`)}>Action 2</p>
                    </div>
                )}
            </div>
            </>
            );
            };

            export default MessageListComponent;
