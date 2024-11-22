import {ScrollArea} from "@radix-ui/react-scroll-area";
import {Badge} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {newsData} from "@/layout/NewsListLayout.tsx";
import {useRef} from "react";
import {TagRemove} from "@/hooks/tagRemove.ts";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

interface NewsListProps {
    newsItems: newsData[],
    onLoadMore: () => void,
    isFetching: boolean,
    setConnDetail: (value: boolean) => void,
}

export const convertPubDate = (time: string) => {
    const convertDate = dayjs(time).format('YYYY년 MM월 DD일')
    return convertDate === 'Invalid Date' ? time : convertDate;
};


export const NewsList = ({newsItems, onLoadMore, isFetching, setConnDetail, connDetail}: NewsListProps) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
            onLoadMore(); // 데이터 로드 콜백 호출
        }
    }
    // console.log(newsItems);
    return (
        <ScrollArea className="h-screen w-full bg-white/5  rounded-lg px-4 overflow-y-auto"
                    style={{scrollbarColor: "gray transparent"}}
                    ref={scrollRef} onScroll={handleScroll}>

            <div className="py-4 w-full">
                {newsItems.map((item, index) => (
                    <div key={index}>
                        <div className="group py-4 cursor-pointer" onClick={() => {
                            navigate('../newsDetail', {state: item})
                            setConnDetail(true)
                        }}>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Badge>배지</Badge>
                                        <span className="text-sm text-muted-foreground">{TagRemove(item.title)}</span>
                                    </div>
                                    <span
                                        className="text-sm text-muted-foreground">{convertPubDate(item.pubDate)}</span>
                                </div>
                                <h2 className="font-medium text-lg group-hover:text-primary transition-colors">
                                    {TagRemove(item.title)}
                                </h2>
                                <p>{TagRemove(item.description)}</p>
                            </div>
                        </div>
                        {index < newsItems.length - 1 && <Separator className="my-1"/>}
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};