import React, { useEffect } from 'react'
import {getAuthStore, useAuthStore} from '@/store/useAuthStore.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import {getExpertStore, useExpertStore} from "@/store/useExpertStore.ts";
import {useSseHook} from "@/hooks/Sse/useSseHook.ts";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, type, unauthorized, cnt } = useAuthStore()
  const redirectPath = type ? `/login/${type}` : location.pathname

  const { stopListening, startListening } = useSseHook()
  const {clearExpert} = useExpertStore()

  //auth check
  useEffect(() => {
    if (!isAuthenticated && cnt == 1) {
      stopListening()
      window.location.href = `/login/expert`
      clearExpert()
      unauthorized(type)
    }

    if (isAuthenticated) {
      // console.log('isAuthenticated')
      startListening()
    }
  }, [isAuthenticated])

  return <>{children}</>
}
