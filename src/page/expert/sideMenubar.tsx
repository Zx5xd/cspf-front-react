import {Button} from "@/components/ui/button.tsx";
import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useExpertStore} from "@/store/useExpertStore.ts";
import {useChatReqManage} from "@/hooks/useChatReqManage.ts";
import {Badge} from "@/components/ui/badge.tsx";

export const SideMenubar = () => {
    const navigate = useNavigate();
    const {expert} = useExpertStore()
    const location = useLocation();
    const {reqCnt} = useChatReqManage()

    const getVariant = (path) => (location.pathname === path ? "secondary" : "ghost");
    const expertType:'L'|'I'|'V' = expert.expertCode.charAt(0) === 'L' ? 'L' : expert.expertCode.charAt(0) === 'I'? 'I' : 'V'
    console.log(expertType);

    useEffect(() => {
        console.log(expert)
    }, [expert]);

    return (
        <div className="flex flex-col h-full bg-white/5 outline-1 backdrop-brightness-50 mr-2 rounded-lg w-64">
            <span className="text-center py-2 font-bold border-b">관리</span>
            <Button
                variant={getVariant('/expert/mypage')}
                className="mx-2 my-2 select-none"
                onClick={() => navigate('/expert/mypage')}
            >
                마이페이지
            </Button>
            {expertType === 'L' ? (
                <>
                    <Button
                        variant={getVariant('/expert/law')}
                        className="mx-2 mb-2"
                        onClick={() => navigate('/expert/law')}
                    >
                        채팅 신청내역
                        <Badge variant={"default" }>
                        {reqCnt}
                    </Badge>
                    </Button>
                    <Button
                        variant={getVariant('/expert/chat')}
                        className="mx-2 mb-2"
                        onClick={() => navigate('/expert/chat')}
                    >
                        채팅방 리스트
                    </Button>
                </>
            ) : expertType === 'I' ? (
                <>
                    <Button
                        variant={getVariant('/expert/ins')}
                        className="mx-2 mb-2"
                        onClick={() => navigate('/expert/ins')}
                    >
                        채팅 신청내역
                        <Badge variant={"default" }>
                        {reqCnt}
                    </Badge>
                    </Button>
                    <Button
                        variant={getVariant('/expert/chat')}
                        className="mx-2 mb-2"
                        onClick={() => navigate('/expert/chat')}
                    >
                        채팅방 리스트
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant={getVariant('/expert/vet')}
                        className="mx-2 mb-2"
                        onClick={() => navigate('/expert/vet')}
                    >
                        채팅 신청내역
                    </Button>
                    <Button
                        variant={getVariant('/expert/chat')}
                        className="mx-2 mb-2"
                        onClick={() => navigate('/expert/chat')}
                    >
                        채팅방 리스트
                    </Button>
                </>
            )}
            <span className="text-center py-2 font-bold border-y select-none">게시판</span>
            <Button
                variant={getVariant('/expert/announce')}
                className="mx-2 my-2"
                onClick={() => navigate('/expert/announce')}
            >
                공지
            </Button>
            <Button
                variant={getVariant('/expert/quesList')}
                className="mx-2 mb-2"
                onClick={() => navigate('/expert/quesList')}
            >
                문의
            </Button>
            <span className="text-center py-2 font-bold border-y select-none">사건/사례</span>
            <Button
                variant={getVariant('/expert/news')}
                className="mx-2 my-2"
                onClick={() => navigate('/expert/news')}
            >
                뉴스
            </Button>
            <Button
                variant={getVariant('/expert/preceList')}
                className="mx-2 my-2"
                onClick={() => navigate('/expert/preceList')}
            >
                판례
            </Button>
        </div>
    )
}