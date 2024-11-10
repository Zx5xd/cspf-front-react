import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { z } from 'zod'
import { useExpertStore } from '@/store/expertStore.ts'

// Zod를 사용해 토큰 검증 스키마 정의
const TypeSchema = z.enum(['expert', 'admin'])

// Zustand 스토어 정의
interface AuthState {
  isAuthenticated: boolean
  type: 'expert' | 'admin' | null
  login: (type: string) => void
  unauthorized: (type: any) => void
  logout: () => void
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      type: null,
      login: (userType) => {
        // Zod를 사용해 토큰 검증
        const type = TypeSchema.parse(userType)

        set({ isAuthenticated: true, type })
      },
      unauthorized: (type) => set({ isAuthenticated: false, type: type.type }),
      logout: () => set({ isAuthenticated: false, type: null }),
    }),
    {
      name: 'auth-session', // sessionStorage에 저장될 키
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용
    }
  )
)

export const useLoginAction = () => useAuthStore((state) => state.login)
