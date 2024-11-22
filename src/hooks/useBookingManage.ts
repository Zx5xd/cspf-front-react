import { useEffect, useState } from 'react'
import { axiosGet, axiosPatch } from '@/util/axiosData.ts'
import { migHost } from '@/util/apiInof.ts'
import { Booking } from '@/schemas/functionSchema/bookingSchema.ts'
import {expertGetSearch, expertPatchAnything} from "@/services/UserManage.ts";

export const useBookingManage = () => {
  const [bookingList, setBookingList] = useState<Booking[]>([])

  const getBookingList = () => {

    expertGetSearch('vetReservation').then((data) => {
      console.log(data)
      setBookingList(data)
    })

    // axiosGet(`${migHost()}vetReservation`).then((data) => {
    //   setBookingList(data?.data)
    // })
  }

  useEffect(() => {
    getBookingList()
  }, [])

  const updateBookStatus = (id: number, updateStatus: number) => {
    expertPatchAnything(`vetReservation/${id}`, {resvStatus:updateStatus}).then((data) => {
      console.log(data)
        getBookingList()
    })

    // axiosPatch(`${migHost()}vetReservation/${id}`, {
    //   resvStatus: updateStatus,
    // }).then((data) => {
    //   console.log(data)
    //   getBookingList()
    // })
  }

  return { bookingList, updateBookStatus, getBookingList }
}
