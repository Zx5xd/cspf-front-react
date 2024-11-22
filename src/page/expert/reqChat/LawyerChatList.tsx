import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useNavigate} from "react-router-dom";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import {useChatReqManage} from "@/hooks/useChatReqManage.ts";
import {convertToKoreanTime} from "@/services/convertDate.ts";
import dayjs from "dayjs";



export const LawyerChatList = () => {
  const navigate = useNavigate()
  const {reqLawChatList} = useChatReqManage()
  dayjs.locale('ko')
  return (
          <ScrollArea className="h-screen">
            <div className="container ms-6 bg-white/5 rounded-lg p-6 w-auto">
              <Card>
                <CardHeader>
                  <CardTitle>상담/예약 목록</CardTitle>
                  <CardDescription>최근 상담 및 예약 내역을 확인하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>예약자</TableHead>
                        <TableHead>날짜</TableHead>
                        <TableHead>시간</TableHead>
                        <TableHead>신청날짜</TableHead>
                        <TableHead>진행도 </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reqLawChatList.map((rawList) => {

                          const [dateStr, timeStr] = convertToKoreanTime(rawList.createdAt)
                          console.log(dayjs(rawList.prefTime))
                          return(
                          <>{ rawList.reqStatus > 0 ? (
                          <TableRow key={rawList.lawChatReqId}>
                            <TableCell>{rawList.ownerCode.name}</TableCell>
                            <TableCell>{rawList.reqDate}</TableCell>
                            <TableCell>{dayjs(rawList.prefTime, 'HH:mm:ss').format('hh:mm A')}</TableCell>
                            <TableCell>{dayjs(rawList.createdAt).format('YYYY.MM.DD HH:mm')}</TableCell>
                            <TableCell>
                              <Badge variant={
                                rawList.reqStatus === 1 ? "default" : "secondary"
                              }>
                                {rawList.reqStatus === 1 ? "대기중" : "진행중"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">상세보기</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>상담/예약 상세 정보</DialogTitle>
                                    <DialogDescription>
                                      상담/예약에 대한 자세한 정보입니다.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-bold">예약자명:</span>
                                      <span className="col-span-3">{rawList.ownerCode.name}</span>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-bold">신청시간:</span>
                                      <span className="col-span-3">{rawList.reqDate} {rawList.prefTime}</span>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <span className="font-bold">신청사유:</span>
                                      <span className="col-span-3">{rawList.description}</span>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow> ):null }</>)}
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>


)
}