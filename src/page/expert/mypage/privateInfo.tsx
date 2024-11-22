import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {ExpertEntity} from "@/types/entity.ts";
import {useExpertStore} from "@/store/useExpertStore.ts";
import {ExpertPrivateProfileEdit} from "@/page/expert/mypage/privateProfileEdit.tsx";
import {useEffect, useState} from "react";

export const PrivateInfo = () => {
    const {expert} = useExpertStore()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

    }, [isOpen]);

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>개인정보</CardTitle>
                <CardDescription>개인정보를 안전하게 관리하세요.</CardDescription>
            </CardHeader>
            <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="userId">아이디</Label>
                            <Input id="userId" value={expert.username} readOnly/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input id="password" type="password" value={expert.password} readOnly={true}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input id="email" type="email" value={expert.email} readOnly={true}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">전화번호</Label>
                            <Input id="phone" type="tel" value={expert.phone} readOnly={true}/>
                        </div>
                    </div>
                    <Button onClick={() => setIsOpen(true)}>개인정보 수정</Button>
            </CardContent>
        </Card>
            <ExpertPrivateProfileEdit isOpen={isOpen} onClose={() => setIsOpen(false)} userCode={expert.expertCode}/>
        </>
    )
}