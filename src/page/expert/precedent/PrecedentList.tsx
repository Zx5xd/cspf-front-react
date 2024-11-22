import {ScrollArea} from "@radix-ui/react-scroll-area";
import {Badge} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {newsData} from "@/layout/NewsListLayout.tsx";
import {useRef} from "react";
import {TagRemove} from "@/hooks/tagRemove.ts";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {precData} from "@/layout/PrecedentListLayout.tsx";

interface NewsListProps {
    precItems: precData[];
    onLoadMore: () => void; // 데이터 로드 콜백
    isFetching: boolean; // 로딩 상태
}

export const PrecedentList = ({ precItems, onLoadMore, isFetching }: NewsListProps) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const handleScroll = () =>{
        if (!scrollRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
            onLoadMore(); // 데이터 로드 콜백 호출
        }
    }
    // console.log(newsItems);
    return (
        <ScrollArea className="h-screen w-full bg-white/5  rounded-lg px-4 overflow-y-auto" style={{scrollbarColor: "gray transparent"}}
        ref={scrollRef} onScroll={handleScroll}>

            <div className="py-4 w-full">
                {precItems.map((item, index) => (
                    <div key={index}>
                        <div className="group py-4 cursor-pointer" onClick={() => window.open('https://www.law.go.kr'+item.판례상세링크,'_blank')}>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Badge>배지</Badge>
                                        <span className="text-sm text-muted-foreground">{item.판례일련번호} {item.사건종류명}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{item.선고일자}</span>
                                </div>
                                <h2 className="font-medium text-lg group-hover:text-primary transition-colors">
                                    {item.사건명}
                                </h2>
                                <p>{item.법원명} {item.판결유형}</p>
                            </div>
                        </div>
                        {index < precItems.length - 1 && <Separator className="my-1" />}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};