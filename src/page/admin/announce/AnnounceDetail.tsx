"use client"

import React, {useRef, useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MessageSquare, ThumbsUp } from 'lucide-react'
import {AnnounceEntity} from "@/types/entity.ts";
import {DataTable} from "@/page/admin/user/data-table.tsx";
import {announceManageColumns} from "@/page/admin/announce/Columns.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {convertToKoreanTime} from "@/services/convertDate.ts";
import {Card} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";

import {BoardDelete} from "@/services/BoardManage.ts";
import {AnnUpdateForm} from "@/page/admin/announce/AnnUpdateForm.tsx";

export const AnnounceDetail = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const announceData = location.state
    console.log(announceData)
    const [dateStr, timeStr] = convertToKoreanTime(announceData.createdAt)

    return (
        <div className={"sm:container sm:mx-auto h-screen py-8 bg-white/5"}>
            <main className="flex flex-row h-full overflow-hidden">
                <div className="flex flex-col h-full backdrop-brightness-50 mr-2 rounded-lg w-64">
                    <span className="text-center py-2 font-bold border-b">관리</span>
                    <Button variant="ghost" className="mx-2 my-2 select-none"
                            onClick={() => navigate('/admin/user')}>유저</Button>
                    <Button variant="ghost" className="mx-2 mb-2" onClick={() => navigate('/admin/expert')}>
                        전문가
                    </Button>
                    <Button variant="ghost" className="mx-2 mb-2"
                            onClick={() => navigate('/admin/blackList')}>신고</Button>
                    <span className="text-center py-2 font-bold border-y select-none">게시판</span>
                    <Button variant="secondary" className="mx-2 my-2"
                            onClick={() => navigate('/admin/announce')}>공지</Button>
                    <Button variant="ghost" className="mx-2 mb-2"
                            onClick={() => navigate('/admin/question')}>문의</Button>
                    <span className="text-center py-2 font-bold border-y select-none">인증</span>
                    <Button variant="ghost" className="mx-2 my-2"
                            onClick={() => navigate('/admin/chckCert')}>자격증</Button>
                </div>

                <div className="container mx-auto p-4 max-w-4xl">
                    <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4"/> 목록으로
                    </Button>
                    <Card className={'p-5'}>
                        <article className="mb-8">
                            <h1 className="text-3xl font-bold mb-2">{announceData.title}</h1>
                            <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                                <span>작성자: 관리자</span>
                                <span>작성일: {dateStr}</span>
                            </div>
                            <Separator className="my-4"/>
                            <div className="prose max-w-none">
                                <p>{announceData.content}</p>
                            </div>
                        </article>
                        <div className="w-full flex place-content-end mt-36">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={"outline"}>수정</Button>
                                </DialogTrigger>
                                <DialogContent >

                                    <DialogHeader>
                                        <DialogTitle>공지사항 수정</DialogTitle>
                                    </DialogHeader>
                                    <AnnUpdateForm id={announceData.id}/>
                                </DialogContent>
                            </Dialog>
                            <Button className={'ms-5'} variant={'outline'} onClick={() => {BoardDelete('announcement',announceData.id), navigate(-1)}}>삭제</Button>
                        </div>
                    </Card>
                </div>

            </main>
        </div>


    )
}