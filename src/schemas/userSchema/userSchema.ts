import { z } from 'zod'

// UserEntity Zod Schema
export const UserEntitySchema = z.object({
  userCode: z.string().optional(),
  username: z.string(),
  password: z.string().nullable(),
  name: z.string(),
  nickname: z.string(),
  email: z.string().email(),
  address: z.string().nullable(),
  phone: z.string(),
  refreshToken: z.string().nullable().optional(),
  gender: z.string(),
  petOwnership: z.string().nullable().optional(),
})

// 타입 추론
export type UserEntity = z.infer<typeof UserEntitySchema>
