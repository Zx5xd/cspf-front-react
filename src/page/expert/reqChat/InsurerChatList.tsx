import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useNavigate} from "react-router-dom";
import {useChatReqManage} from "@/hooks/useChatReqManage.ts";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";



export const InsurerChatList = () => {
  const navigate = useNavigate()
  const {reqInsChatList, reqCnt, commitChat, denyChat} = useChatReqManage()
  return (
      <>
        <ScrollArea className="h-screen mt-2">
          <div className="container ms-6 bg-white/5 rounded-lg p-6 w-auto">
            <Card>
              <CardHeader>
                <CardTitle>상담 목록</CardTitle>
                <CardDescription>최근 상담 내역을 확인하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>예약자명</TableHead>
                      <TableHead>펫 정보 <br/>(견종/나이)</TableHead>
                      <TableHead>날짜</TableHead>
                      <TableHead>진행도</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reqInsChatList.map((insList) => {
                      return(
                          <>
                            { insList.reqStatus>0 ? <TableRow key={insList.insChatReqNumber}>
                              <TableCell>{insList.owner.name}</TableCell>
                              <TableCell>{insList.pet.kindNm}<br/>{insList.pet.Birthday}</TableCell>
                              <TableCell>{insList.createdAt}</TableCell>
                              <TableCell>  <Badge variant={
                                insList.reqStatus === 1 ? "secondary" : insList.reqStatus === 2 ? "outline" : "destructive"
                              }>
                                {insList.reqStatus === 1 ? "진행중" : insList.reqStatus === 2? "완료" : "거부"}
                              </Badge></TableCell>
                            </TableRow> : null}
                          </>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </>
)
}