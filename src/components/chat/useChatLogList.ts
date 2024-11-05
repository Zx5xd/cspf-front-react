import {axiosGet} from "@/util/axiosData.ts";
import {migHost} from "@/util/apiInof.ts";
import {useEffect, useState} from "react";
import {ChatLog} from "@/components/chat/chatInterface.ts";

export const useChatLogList = (roomId:string, page?:number) => {

    const limit = 20;
    const [chatLog, setChatLog] = useState<ChatLog[] | null>([]);
    const [logLength, setLogLength] = useState<number>(1);

    const getChatLogList = () => {
        axiosGet(`${migHost()}chatLog`,{
            roomId,
            page,
            limit
        }).then((data)=>{
            const ls = data.data.results.length
            setLogLength(ls);
            setChatLog(data.data.results)
        })
    }

    useEffect(() => {
        getChatLogList()
    }, []);

    return {chatLog, logLength}
}