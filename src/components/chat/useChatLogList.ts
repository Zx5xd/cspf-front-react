import {axiosGet} from "@/util/axiosData.ts";
import {migHost} from "@/util/apiInof.ts";
import {useEffect, useState} from "react";
import {ChatLog} from "@/components/chat/chatInterface.ts";
import { useInfiniteScrollTop } from '@/hooks/useInfiniteScrollTop.ts';

export const useChatLogList = (roomId:string, scrollContainerRef:React.RefObject<HTMLElement>) => {

    const limit = 20;
    const [chatLog, setChatLog] = useState<ChatLog[] | null>([]);
    const [logLength, setLogLength] = useState<number>(1);
    const [count, setCount] = useState<number>(1);

    const getChatLogList = () => {

        axiosGet(`${migHost()}chatLog`,{
            roomId,
            page,
            limit
        }).then((data)=>{
            let dt:ChatLog[] = data && data.data.results
            const ls = data && data.data.results.length
            setLogLength(ls);
            dt = dt.sort((a, b) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
            if(page === count){
                setChatLog(prevLog => [...dt, ...prevLog])
                console.log('count', count, page)
                console.log(dt)

            }else{
                setChatLog(dt)
                console.log('not, ', count, page)
            }

            setCount(prevCount => prevCount + 1)
        })
    }

    const {isFetching, page} = useInfiniteScrollTop(getChatLogList, scrollContainerRef, 500)

    useEffect(() => {
        getChatLogList()
    }, [roomId]);

    return {chatLog, logLength, isFetching}
}