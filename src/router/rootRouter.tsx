import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthWrapper } from '@/auth/AuthWrapper.tsx'

export const RootRouter = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>{children}</Routes>
      </AuthWrapper>
    </BrowserRouter>
  )
}
