// useWebSocket.ts

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from "socket.io-client";
import { MessageProp } from "./chatInterface.ts";
import {migHost} from "../../util/apiInof.ts";



const useWebSocket = (
    roomId: string,
    onMessage?: (message: MessageProp) => void
) => {
    roomId ? roomId: roomId = 'd86dcdc3-6b63-4c90-894a-dc442eeca387'
    const wsRef = useRef<Socket | null>(null);
    const [unread, setUnread] = useState<number>(0);

    const cspfDev = migHost()
        // import.meta.env.VITE_DEV_CSPF_HOST;

    useEffect(() => {
        wsRef.current = io(cspfDev, {
            query: { roomId },
            withCredentials: true,
        });

        console.log('chat wsRef.current', wsRef.current);

        wsRef.current.on("message", (message: any) => {
            const msg: MessageProp = {
                message: message.message,
                sender: message.sender,
                // direction: "incoming",
            };
            onMessage(msg);
        });

        wsRef.current.on("image", (image: any)=> {

            const imageInfo= JSON.parse(image)
            // console.log(image.userCode, image.images)
            const msg: MessageProp = {
                sender: imageInfo.userCode,
                // direction: "incoming",
                src: imageInfo.images[0]
            }
            onMessage(msg)
        })

        return () => {
            wsRef.current?.disconnect();
        };
    }, [roomId, onMessage]);

    const sendMessage = (message: string) => {
        wsRef.current?.emit("message", message);
    };


    return { sendMessage };
};

export default useWebSocket;
