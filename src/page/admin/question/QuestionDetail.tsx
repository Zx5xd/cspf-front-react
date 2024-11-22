"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageSquare, ThumbsUp } from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import { convertToKoreanTime } from "@/services/convertDate";
import {BoardWrite, findBoardAnyThings} from "@/services/BoardManage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

interface Comment {
    id: number;
    authorCode: string;
    content: string;
    createdAt: string;
}

const commentSchema = z.object({
    content: z.string().min(1, "댓글을 입력하세요").max(500, "댓글은 최대 500자까지 입력 가능합니다"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export const QuestionDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const quesData = location.state;
    const [comments, setComments] = useState<Comment[]>([]);
    const [dateStr, timeStr] = convertToKoreanTime(quesData.createdAt);
    const [isNewComment, setIsNewComment] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
    });

    useEffect(() => {
        findBoardAnyThings("comment", `${quesData.id}/comments`).then((data) => {
            console.log(data);
            setComments(data);
        });
        setIsNewComment(false);
    }, [isNewComment]);

    const handleCommentSubmit = (data: CommentFormValues) => {
        console.log("New Comment:", data);
        BoardWrite('comment', data, quesData.id).then((data)=>setIsNewComment(true))
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <Button variant="ghost" className="mb-4" onClick={()=>navigate(-1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> 목록으로
            </Button>
            <article className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{quesData.title}</h1>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>작성자: {quesData.authorCode}</span>
                    <span>작성시간: {dateStr} {timeStr}</span>
                </div>
                <Separator className="my-4" />
                <div className="prose max-w-none">
                    <p>{quesData.content}</p>
                </div>
            </article>

            <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">댓글 {comments.length}개</h2>
                <ul className="space-y-4">
                    {comments.map((comment) => (
                        <li key={comment.id} className="bg-muted p-4 rounded-lg">
                            <div className="flex items-start space-x-4">
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">{comment.authorCode}</h3>
                                        <span className="text-sm text-muted-foreground">{convertToKoreanTime(comment.createdAt)}</span>
                                    </div>
                                    <p className="mt-1">{comment.content}</p>
                                    <div className="mt-2 flex items-center space-x-2">
                                        <Button variant="ghost" size="sm">
                                            답글
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <form onSubmit={handleSubmit(handleCommentSubmit)} className="mt-8">
                <h3 className="text-xl font-semibold mb-2">댓글 작성</h3>
                <Textarea
                    {...register("content")}
                    placeholder="댓글을 입력하세요..."
                    className="mb-2"
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                <Button type="submit">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    댓글 작성
                </Button>
            </form>
        </div>
    );
};
