import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useNavigate} from "react-router-dom";
import {useExpertStore} from "@/store/useExpertStore.ts";
import {useEffect, useState} from "react";
import {expertGetSearch} from "@/services/UserManage.ts";
import {data} from "autoprefixer";
import {reqLawyerIntface, useChatReqManage} from "@/hooks/useChatReqManage.ts";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import dayjs from "dayjs";
import 'dayjs/locale/ko.js'



export const ReqLawyerChatList = () => {
  const navigate = useNavigate()
  const {expert} = useExpertStore()
  const {reqLawChatList, commitChat, denyChat} = useChatReqManage()

  dayjs.locale('ko')

  useEffect(() => {
  }, [reqLawChatList]);

  return (
          <ScrollArea className="h-screen">
            <div className="container ms-6 bg-white/5 rounded-lg p-6 w-auto">
              <Card>
                <CardHeader>
                  <CardTitle>상담/예약 대기목록</CardTitle>
                  <CardDescription>대기중인 상담 및 예약 내역을 확인하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>예약자</TableHead>
                        <TableHead>날짜</TableHead>
                        <TableHead>시간</TableHead>
                        <TableHead>신청날짜</TableHead>
                        <TableHead>수락/거부</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reqLawChatList && reqLawChatList.map((lawList)=>{
                          console.log(lawList)
                        return(
                           <> {lawList.reqStatus === 0 ? <>
                              <TableRow key={lawList.lawChatReqId}>
                                <TableCell>{lawList.ownerCode.name}</TableCell>
                                <TableCell>{lawList.reqDate}</TableCell>
                                <TableCell>{lawList.prefTime}</TableCell>
                                <TableCell>{dayjs(lawList.createdAt).format('YYYY.MM.DD HH:mm')}</TableCell>
                                <TableCell><Button
                                    variant='outline'
                                    className='mb-2'
                                    onClick={() => commitChat(lawList.lawChatReqId)}
                                >
                                  수락
                                </Button>
                                  <Button
                                      variant='destructive'
                                      className='mb-2'
                                      onClick={() => denyChat(lawList.lawChatReqId)}
                                  >
                                    거부
                                  </Button></TableCell>
                              </TableRow>
                            </> : null}  </>
                            )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

  )
}