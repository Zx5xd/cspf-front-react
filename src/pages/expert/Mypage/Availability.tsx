import React from 'react'
import {
  BookingHeaderItem,
  BookingHeaderItem2,
  BookingItem,
  BookingItem2,
} from '@/components/user/UserInfoTable.tsx'
import { useBookingManage } from '@/hooks/useBookingManage.ts'

export const Availability: React.FC = () => {
  const { bookingList } = useBookingManage()
  return (
    <>
      <BookingHeaderItem statusType={'현황'}>
        {bookingList.map((booking) =>
          booking.resvStatus === 1 ? <BookingItem booking={booking} /> : null
        )}
      </BookingHeaderItem>
      <BookingHeaderItem2 statusType={'진행 완료'}>
        {bookingList.map((booking) =>
          booking.resvStatus === 2 ? <BookingItem2 booking={booking} /> : null
        )}
      </BookingHeaderItem2>
      <BookingHeaderItem2 statusType={'거부 내역'}>
        {bookingList.map((booking) =>
          booking.resvStatus === 9 ? <BookingItem2 booking={booking} /> : null
        )}
      </BookingHeaderItem2>
    </>
  )
}
