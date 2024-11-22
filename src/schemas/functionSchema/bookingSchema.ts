// schemas/bookingSchema.ts
import { z } from 'zod'

export const bookingSchema = z.object({
  hosReservationId: z.number(),
  owner: z.object({
    name: z.string(),
  }),
  resvDate: z.string(),
  prefTime: z.string(),
  pet: z.object({
    kindNm: z.string(),
    Birthday: z.string(),
  }),
  createdAt: z.string(),
  resvStatus: z.number().default(0),
  description: z.string().nullable(),
})

// 예약 배열 스키마 정의
export const bookingsSchema = z.array(bookingSchema)

// 타입 정의
export type Booking = z.infer<typeof bookingSchema>
