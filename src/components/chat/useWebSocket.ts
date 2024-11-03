// useWebSocket.ts

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { MessageProp } from "./chatInterface.ts";
import {migHost} from "../../util/apiInof.ts";



const useWebSocket = (
    roomId: string,
    onMessage: (message: MessageProp) => void
) => {
    roomId ? roomId: roomId = 'd86dcdc3-6b63-4c90-894a-dc442eeca387'
    const wsRef = useRef<Socket | null>(null);

    const cspfDev = migHost()
        // import.meta.env.VITE_DEV_CSPF_HOST;

    useEffect(() => {
        wsRef.current = io(cspfDev, {
            query: { roomId },
            withCredentials: true,
        });

        wsRef.current.on("message", (message: any) => {

            console.log(`wsRef message :`);
            console.log(message)
            console.log(message.message, message.sender);
            const msg: MessageProp = {
                message: message.message,
                sender: message.sender,
                direction: "incoming",
            };
            onMessage(msg);
        });

        wsRef.current.on("image", (image: any)=> {
            console.log(`wsRef image :`)
            console.log(image)

            const imageInfo= JSON.parse(image)
            console.log(imageInfo.userCode)
            // console.log(image.userCode, image.images)
            const msg: MessageProp = {
                sender: imageInfo.sender,
                direction: "incoming",
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
