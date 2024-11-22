import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import {BoardUpdate} from "@/services/BoardManage.ts";

// Zod 스키마 정의
const quesWriteSchema = z.object({
    title: z.string().min(1, "Title is required").max(50, "Title must be 50 characters or less"),
    content: z.string().min(1, "Content is required").max(1000, "Content must be 1000 characters or less"),
});


// 타입 정의
type QuesFormValues = z.infer<typeof quesWriteSchema>;

export const QuesUpdateForm = (id:number) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<QuesFormValues>({
        resolver: zodResolver(quesWriteSchema),
    });

    const onSubmit = (data: any) => {
        console.log(id, data)
        BoardUpdate('questions',id.id, data).then((data)=>console.log(data))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto ">
            <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                    id="title"
                    type="text"
                    maxLength={50}
                    placeholder="Enter a title (max 50 characters)"
                    {...register("title")}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                    id="content"
                    maxLength={1000}
                    placeholder="Enter your content (max 1000 characters)"
                    className="min-h-[200px]"
                    {...register("content")}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>
            <div className="space-y-1 justify-end flex">
                <Button variant="default" className={'mt-4'}>
                    저장
                </Button>
            </div>

        </form>
    );
};
