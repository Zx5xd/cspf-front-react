import React from 'react'
import {
  BookingHeaderItem,
  BookingItem,
} from '@/components/user/UserInfoTable.tsx'
import { useBookingManage } from '@/hooks/useBookingManage.ts'

export const Booking: React.FC = () => {
  const { bookingList } = useBookingManage()

  return (
    <BookingHeaderItem statusType={'신청 내역'}>
      {bookingList.map((booking) =>
        booking.resvStatus === 0 ? <BookingItem booking={booking} /> : null
      )}
    </BookingHeaderItem>
  )
}
