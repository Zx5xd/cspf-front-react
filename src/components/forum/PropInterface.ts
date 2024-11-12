import React from 'react'

export interface ForumItemProps {
  title: string
  link: string
  description: string
  pubDate: string
  types: string
}

export interface BoardItemProps {
  id: number
  authorCode?: string
  title: string
  content: string | undefined
  createdAt: string
  handleGetInfo: (id: number) => void
  handleUpdateBaord?: (id: number | null) => void
  handleDeleteBaord?: (id: number) => void
  open: boolean
  userType: string
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSave?: (id: number) => void
  commentModifyAndDelete: (id: number, type: string) => void
  comments: CommentProps[]
}

export interface CommentProps {
  id: number
  boardId: number
  authorCode: string
  content: string
  createdAt: string
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  commentModifyAndDelete: (id: number, type: string) => void
}

export interface AniInfoProps {
  dogRegNo: string
  dogNm: string
  sexNm: string
  kindNm: string
  neuterYn: string
}

export interface urlProp {
  url: string
}
