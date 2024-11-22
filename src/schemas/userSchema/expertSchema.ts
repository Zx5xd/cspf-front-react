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
  profile: z
    .object({
      id: z.string(),
      image: z.string().nullable(),
      product: z.string().nullable(),
      workexperience: z.string().nullable(),
      companyaddr: z.string().nullable(),
    })
    .nullable()
    .optional(),
  image: z.string().optional().nullable(),
  certImage: z.string().nullable(),
})

// 타입 추론
export type ExpertEntity = z.infer<typeof ExpertEntitySchema>
