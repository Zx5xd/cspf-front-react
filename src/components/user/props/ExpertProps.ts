import React from 'react'

export interface ExpertEntity {
  expertCode?: string
  username: string
  password: string
  name: string
  company: string
  email: string
  phone: string
  credentialStatus: number
  // refreshToken: string;
  expertType?: React.SetStateAction<string>
  profile?: ExpertPublicEntity
  image: string
  certImage: string
}

export interface ExpertPublicEntity {
  id: string
  expertCode?: ExpertEntity
  workexperience: string
  companyaddr: string
  product: string
  image?: string
}

export interface Booking {
  hosReservationId: number
  prefTime: string
  resvDate: string
  description: string
  resvStatus: number
  createdAt: Date
  owner: { name: string }
  pet: { kindNm: string; Birthday: string }
}
