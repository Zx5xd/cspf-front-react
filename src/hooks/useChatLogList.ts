import { axiosGet } from "@/util/axiosData.ts";
import { migHost } from "@/util/apiInof.ts";
import { useEffect, useState, useRef } from "react";
import { ChatLog } from "@/components/chat/chatInterface.ts";
import { useInfiniteScrollTop } from '@/hooks/useInfiniteScrollTop.ts';

export const useChatLogList = (
  roomId: string,
  scrollContainerRef: React.RefObject<HTMLElement>,
) => {
    const limit = 20;
    const [chatLog, setChatLog] = useState<ChatLog[]>([]);
    const [logLength, setLogLength] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(1);
    const initialLoadComplete = useRef(false); // 첫 로드 완료 상태

    const getChatLogList = (page: number) => {
        axiosGet(`${migHost()}chatLog`, {
            roomId,
            page,
            limit
        }).then((data) => {
                console.log('data.data.totals>0')
                const dt: ChatLog[] = data?.data.results;

                const sortedData = dt.sort((a, b) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });

                setChatLog((prevLog) => page > 1 ? [...sortedData, ...prevLog] : sortedData);

                setLogLength(chatLog.length);

                if (page === 1) {
                    initialLoadComplete.current = true// 첫 로드 완료 플래그 설정
                    setTotalPages(data?.data.totalPages)
                }

        });
    };

    const { isFetching } = useInfiniteScrollTop(getChatLogList, scrollContainerRef, initialLoadComplete.current, totalPages);

    useEffect(() => {
        getChatLogList(1) // 첫 페이지는 초기 로드에서만 불러오기
    }, [roomId]);

    return { chatLog, logLength, isFetching }
};
