import React, { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore.ts'
import { useClearExpert } from '@/store/useExpertStore.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { migHost } from '@/util/apiInof.ts'
import { removeCookie } from '@/util/cookie.ts'

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, type, unauthorized } = useAuthStore()
  const clearExpert = useClearExpert()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = type ? `/login/${type}` : location.pathname

  //auth check
  useEffect(() => {
    if (!isAuthenticated) {
      // console.log(isAuthenticated, type)
      // type이 없는 경우 현재 URL에서 원하는 부분을 사용하거나, 기본 경로로 설정 가능
      navigate(redirectPath)
    }

    if (isAuthenticated) {
      checkSession() // 첫 세션 확인
      const interval = setInterval(checkSession, 2 * 60 * 1000) // 2분마다 세션 확인

      return () => clearInterval(interval) // 컴포넌트가 언마운트될 때 인터벌 정리
    }
  }, [isAuthenticated, navigate])

  const checkSession = async () => {
    axios
      .get(`${migHost()}auth`, {
        withCredentials: true,
      })
      .catch((error) => {
        // console.log(isAuthenticated, error)
        removeCookie('authorization')
        removeCookie('refreshToken')
        window.location.href = `/login/${type}`
        unauthorized(type)
        clearExpert()
      })
  }

  return <>{children}</>
}
