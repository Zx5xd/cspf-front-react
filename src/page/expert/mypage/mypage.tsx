import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useExpertStore} from "@/store/useExpertStore.ts";
import {useNavigate} from "react-router-dom";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";

export const MyPage= () =>{
  const {expert} = useExpertStore()
  const navigate = useNavigate()
  console.log(expert)

  return (
      <div className={"sm:container sm:mx-auto h-screen py-8"}>
        <main className="flex flex-row h-full  overflow-hidden">
          <SideMenubar/>
          <ScrollArea className="h-screen w-2/3 ">
            <div className="container mx-6 bg-white/5 rounded-lg p-6 space-y-8 w-3/4">
              <h1 className="text-3xl font-bold">마이페이지</h1>

              <Card>
                <CardHeader>
                  <CardTitle>개인정보</CardTitle>
                  <CardDescription>개인정보를 안전하게 관리하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
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
                    <Button>개인정보 수정</Button>
                  </form>
                </CardContent>
              </Card>

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
                      <Input id="companyAddress" value={expert.profile ? expert.profile.companyaddr : `회사명을 추가해주세요.`}
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
            </div>
          </ScrollArea>
        </main>
      </div>

  )
}