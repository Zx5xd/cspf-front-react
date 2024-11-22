import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import * as React from "react";
import {ExpertEntity} from "@/types/entity.ts";
import {useExpertStore} from "@/store/useExpertStore.ts";

export const PublicInfo = () => {
    const {expert} = useExpertStore()

    return (
        <Card>
            <CardHeader>
                <CardTitle>공개정보</CardTitle>
                <CardDescription>다른 사용자에게 공개되는 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">회사명</Label>
                            <Input id="companyName" value={expert.company} readOnly={true}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">이름</Label>
                            <Input id="name" value={expert.name} readOnly={true}/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="companyAddress">회사주소</Label>
                        <Input id="companyAddress" value={expert.profile ? expert.profile.companyaddr : `회사주소를 추가해주세요.`}
                               readOnly={true}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="career">경력 서술</Label>
                        <Textarea id="career" rows={4}
                                  value={expert.profile ? expert.profile.workexperience : `추가 정보를 작성해주세요.`}
                                  readOnly={true}/>
                    </div>
                    <Button>공개정보 수정</Button>
                </form>
            </CardContent>
        </Card>
    )
}