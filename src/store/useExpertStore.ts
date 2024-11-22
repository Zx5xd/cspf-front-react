import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ExpertEntity } from '@/components/user/props/ExpertProps.ts'
import { ExpertEntitySchema } from '@/schemas/userSchema/expertSchema.ts'

// Zustand 상태 정의 인터페이스
interface useExpertStore {
  expert: ExpertEntity | undefined
  setExpert: (expert: ExpertEntity) => void
  clearExpert: () => void
}

// Zustand 저장소 정의 (zod 검증 적용)
export const useExpertStore = create(
  persist<useExpertStore>(
    (set) => ({
      expert: undefined,
      setExpert: (state: ExpertEntity) => {
        // ExpertEntity 검증
        const parsed = ExpertEntitySchema.safeParse(state)
        if (parsed.success) {
          // 검증에 성공한 경우에만 상태를 업데이트
          set({ expert: parsed.data })
        } else {
          console.error('Invalid ExpertEntity data:', parsed.error.errors)
        }
      },
      clearExpert: () => set({ expert: undefined }),
    }),
    {
      name: 'expert-session-storage', // sessionStorage에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용 설정
    }
  )
)

// 상태 액세스 함수들
export const useExpertInfo = () => useExpertStore((state) => state.expert)
export const useExpertSettings = () =>
  useExpertStore((state) => state.setExpert)
export const useClearExpert = () => useExpertStore((state) => state.clearExpert)
export const getExpertStore = useExpertStore.getState
