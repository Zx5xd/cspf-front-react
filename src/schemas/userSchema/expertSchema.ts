import { z } from 'zod'

// ExpertEntity Zod Schema
export const ExpertEntitySchema = z.object({
  expertCode: z.string().optional(),
  username: z.string(),
  password: z.string(),
  name: z.string(),
  company: z.string(),
  email: z.string().email(),
  phone: z.string(),
  credentialStatus: z.number().int(),
  expertType: z.string().optional(),
  profile: z.object({}).nullable().optional(),
  image: z.string().optional().nullable(),
  certImage: z.string(),
})

// 타입 추론
export type ExpertEntity = z.infer<typeof ExpertEntitySchema>
