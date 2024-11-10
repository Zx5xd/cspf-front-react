import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

const useExpertStore = create(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (state) => set({ admin: state })
    }),
    {
      name: 'expert-session-storage', // sessionStorage에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용 설정
    }
  )
);

export const useExpertInfo = () =>
  useExpertStore((state) => state.expert)

export const useExpertSettings = () =>
  useExpertStore((state) => state.setExpert)