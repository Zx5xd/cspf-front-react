// Modal
import {
  ExpertEntity,
  ExpertPublicEntity,
} from '@/components/user/props/ExpertProps.ts'
import React from 'react'
import { Booking } from '@/schemas/functionSchema/bookingSchema.ts'

export interface ExpertEditModalProps {
  show: boolean
  handleClose: () => void
  handleSave: () => void
  formData: Partial<ExpertEntity> | null
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void
  editingUser: ExpertEntity | undefined
}

export interface ExpertPublicFormProp {
  expertData: ExpertEntity | undefined
  expertPublicData: Partial<ExpertPublicEntity>
  handleSetDetailProfile: () => void
}

export interface PrivateProfileProps {
  handleEdit: () => void
  handleSetPassword: () => void
  expertData: Partial<ExpertEntity>
}

export interface ExpertChatManage {
  ChckToRequestChat: () => void
}

export interface ExpertInfoProps {
  expert: ExpertEntity
  name: string
  email: string
  handleEdit: (user: ExpertEntity) => void
  handleDelete: (userCode: string) => void
  user: ExpertEntity
}

export interface BookingHeaderProps {
  children: React.ReactNode
  statusType: string
}

export interface BookingProps {
  booking: Booking
}
