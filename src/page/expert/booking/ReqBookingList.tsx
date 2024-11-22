import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useNavigate} from "react-router-dom";
import {SideMenubar} from "@/page/expert/sideMenubar.tsx";
import {useBookingManage} from "@/hooks/useBookingManage.ts";
import {useState} from "react";
import {Booking} from "@/schemas/functionSchema/bookingSchema.ts";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone)

export const ReqBookingList = () => {
  const navigate = useNavigate()
  const {bookingList, updateBookStatus} = useBookingManage()
  const [selectedBooking, setSelectedBooking] = useState<Booking>(null); // 선택된 예약 상태

  const handleRowClick = (booking) => {
    setSelectedBooking(booking); // 선택된 예약 정보 저장
  };

  const handleClose = () => {
    setSelectedBooking(null); // 다이얼로그 닫기
  };

  const calAge =(birthday: string):number => {
    const currentDate = dayjs();

    // 입력된 생년월일 문자열을 날짜 객체로 변환
    const birthDate = dayjs(birthday, { format: 'YYYYMMDD' });

    const age = currentDate.year() - birthDate.year();

    if (
        currentDate.month() < birthDate.month() ||
        (currentDate.month() === birthDate.month() && currentDate.date() < birthDate.date())
    ) {
      // 생일이 지나지 않았으면 나이에서 1을 빼줌
      return age - 1;
    }

    return Number(age);
  }

  const convertDate = (date: string):string => {
    return dayjs(date).format('YYYY-MM-DD A hh:mm:ss');
  }

  return (<>
          <ScrollArea className="h-screen">
            <div className="container mx-auto p-6">
              <Card>
                <CardHeader>
                  <CardTitle>예약 대기목록</CardTitle>
                  <CardDescription>대기중인 예약 내역을 확인하세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>예약자</TableHead>
                        <TableHead>날짜</TableHead>
                        <TableHead>시간</TableHead>
                        <TableHead>펫정보</TableHead>
                        <TableHead>신청날짜</TableHead>
                        <TableHead>수락/거부</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingList.map((booking) => (
                          <> {booking.resvStatus === 0 ?
                              <TableRow key={booking.hosReservationId}
                                        onClick={() => handleRowClick(booking)}
                                        style={{cursor: 'pointer'}}>
                                <TableCell>{booking.owner.name}</TableCell>
                                <TableCell>{booking.resvDate}</TableCell>
                                <TableCell>{booking.prefTime}</TableCell>
                                <TableCell>{booking.pet.kindNm}</TableCell>
                                <TableCell>{convertDate(booking.createdAt)}</TableCell>
                                <TableCell>
                                  <Button
                                      variant='outline'
                                      className='mb-2 mt-2 me-2'
                                      onClick={() => updateBookStatus(booking.hosReservationId, 1)}
                                  >
                                    수락
                                  </Button>
                                  <Button
                                      variant='destructive'
                                      className='mb-2 mt-2 ms-2'
                                      onClick={() => updateBookStatus(booking.hosReservationId, 9)}
                                  >
                                    거부
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  {selectedBooking && (
                                      <Dialog open={!!selectedBooking} onOpenChange={handleClose}>
                                        <DialogTitle>예약 상세 정보</DialogTitle>
                                        <DialogContent>
                                          <p><strong>예약자:</strong> {selectedBooking.owner.name}</p>
                                          <p><strong>예약 날짜:</strong> {selectedBooking.resvDate}</p>
                                          <p><strong>선호 시간:</strong> {selectedBooking.prefTime}</p>
                                          <p><strong>반려동물 종류:</strong> {selectedBooking.pet.kindNm}</p>
                                          <p><strong> 나이:</strong> {calAge(selectedBooking.pet.Birthday)}살</p>
                                          <p><strong>예약 생성일:</strong> {convertDate(selectedBooking.createdAt)}</p>
                                        </DialogContent>
                                      </Dialog>
                                  )}
                                </TableCell>
                              </TableRow> : null
                          }</>

                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </ScrollArea></>
  )
}