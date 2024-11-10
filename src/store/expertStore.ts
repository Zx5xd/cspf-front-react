import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ExpertEntity } from '@/components/user/props/ExpertProps.ts'

interface expertStore {
  expert: ExpertEntity | null
  setExpert: (expert: ExpertEntity) => void
  clearExpert: () => void
}

export const useExpertStore = create(
  persist<expertStore>(
    (set) => ({
      expert: null,
      setExpert: (state: ExpertEntity) => set({ expert: state }),
      clearExpert: () => set({ expert: null }),
    }),
    {
      name: 'expert-session-storage', // sessionStorage에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용 설정
    }
  )
)

export const useExpertInfo = () => useExpertStore((state) => state.expert)

export const useExpertSettings = () =>
  useExpertStore((state) => state.setExpert)

export const useClearExpert = () => useExpertStore((state) => state.clearExpert)
