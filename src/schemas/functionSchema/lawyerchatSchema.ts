import { z } from 'zod'

export const LawyerChatSchema = z.array(
  z.object({
    lawChatReqId: z.number().int().positive(),
    reqDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for reqDate',
    }),
    reqStatus: z.number().min(0).max(3),
    description: z.string().optional(),
    createdAt: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid timestamp format for createdAt',
      })
      .optional(),
    cancledAt: z
      .string()
      .nullable()
      .refine((val) => val === null || !isNaN(Date.parse(val)), {
        message: 'Invalid date format for cancledAt',
      }),
    lawyerId: z.string().max(10),
    OwnerCode: z.object({
      name: z.string(),
    }),
    prefTime: z
      .string()
      .refine((val) => /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val), {
        message: 'Invalid time format for prefTime',
      }),
  })
)

export type LawyerChat = z.infer<typeof LawyerChatSchema>
