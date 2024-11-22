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
import dayjs from "dayjs";
import {useState} from "react";
import {Booking} from "@/schemas/functionSchema/bookingSchema.ts";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {MoreHorizontal} from "lucide-react";

export const BookingList = () => {
  const navigate = useNavigate()
  const {bookingList, updateBookStatus} = useBookingManage()
  const [dopen, setDopen] = useState(false)

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

  const handleOpenChange = (open) => {
    setDopen(open); // 다이얼로그 열림/닫힘 상태 업데이트
    console.log(`Dialog is now ${open ? 'open' : 'closed'}`);
  };


  return (<>
          <ScrollArea className="h-screen">
            <div className="container mx-auto p-6">
              <Card>
                <CardHeader>
                  <CardTitle>예약 목록</CardTitle>
                  <CardDescription>최근 예약 내역을 확인하세요.</CardDescription>
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
                        <TableHead>진행도</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingList.map((booking) => (
                          <> { booking.resvStatus > 0 ?
                              <TableRow key={booking.hosReservationId}>
                                <TableCell>{booking.owner.name}</TableCell>
                                <TableCell>{booking.resvDate}</TableCell>
                                <TableCell>{booking.prefTime}</TableCell>
                                <TableCell>{booking.pet.kindNm}</TableCell>
                                <TableCell>{convertDate(booking.createdAt)}</TableCell>
                                <TableCell>
                              <Badge variant={
                                booking.resvStatus === 1 ? "default" :
                                    booking.resvStatus === 2 ? "secondary" :
                                        booking.resvStatus === 3 ? "success" :
                                            "destructive"
                              }>
                                {booking.resvStatus === 1 ? "대기중" :
                                booking.resvStatus === 2 ? "진행중" :
                                booking.resvStatus === 3 ? "완료" :
                                "거부"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>정보</DropdownMenuLabel>
                                  <DropdownMenuItem
                                      onClick={() => setDopen(true)}>
                                    상세보기
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                  onClick={() => updateBookStatus(booking.hosReservationId, 2)}>
                                    진행
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                      onClick={() => updateBookStatus(booking.hosReservationId, 3)}>
                                    완료</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                                    <Dialog open={dopen} onOpenChange={handleOpenChange}>
                                      <DialogContent>
                                        <p><strong>예약자:</strong> {booking.owner.name}</p>
                                        <p><strong>예약 날짜:</strong> {booking.resvDate}</p>
                                        <p><strong>선호 시간:</strong> {booking.prefTime}</p>
                                        <p><strong>반려동물 종류:</strong> {booking.pet.kindNm}</p>
                                        <p><strong> 나이:</strong> {calAge(booking.pet.Birthday)}</p>
                                        <p><strong>상세정보:</strong> {booking.description}</p>
                                        <p><strong>예약 생성일:</strong> {convertDate(booking.createdAt)}</p>
                                      </DialogContent>
                                    </Dialog>
                          </TableRow>: null } </>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </ScrollArea></>


)
}