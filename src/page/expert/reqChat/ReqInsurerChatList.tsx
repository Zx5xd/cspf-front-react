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



export const ReqInsurerChatList = () => {
  const navigate = useNavigate()
  const {reqInsChatList, reqCnt, commitChat, denyChat} = useChatReqManage()


  return (
      <>
        <ScrollArea className="h-screen">
          <div className="container ms-6 bg-white/5 rounded-lg p-6 w-auto">
            <Card>
              <CardHeader>
                <CardTitle>상담 대기목록</CardTitle>
                <CardDescription>대기중인 상담 내역을 확인하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>예약자명</TableHead>
                      <TableHead>펫 정보 <br/>(견종/나이)</TableHead>
                      <TableHead>신청날짜</TableHead>
                      <TableHead>수락/거부</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reqInsChatList.map((insList) => (
                        <>{insList.reqStatus === 0 ?
                            <TableRow key={insList.insChatReqNumber}>
                            <TableCell>{insList.owner.name}</TableCell>
                            <TableCell>{insList.pet.kindNm}<br/>{insList.pet.Birthday}</TableCell>
                            <TableCell>{insList.createdAt}</TableCell>
                            <TableCell>
                              <Button
                                  variant='outline'
                                  className='mb-2 mt-2 me-2'
                                  onClick={() => commitChat(insList.insChatReqNumber)}
                              >
                                수락
                              </Button>
                              <Button
                                  variant='destructive'
                                  className='mb-2 mt-2 ms-2'
                                  onClick={() => denyChat(insList.insChatReqNumber)}
                              >
                                거부
                              </Button>
                            </TableCell>
                            {/*<TableCell>*/}
                            {/*  <Badge variant={*/}
                            {/*    insList.reqStatus === 1 ? "default" :*/}
                            {/*        insList.reqStatus === 2 ? "secondary" :*/}
                            {/*            insList.reqStatus === 3 ? "success" :*/}
                            {/*                "destructive"*/}
                            {/*  }>*/}
                            {/*  </Badge>*/}
                            {/*</TableCell>*/}
                          </TableRow> : null
                        }</>

                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>


      </>
  )
}