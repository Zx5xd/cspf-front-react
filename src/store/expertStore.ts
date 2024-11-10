import {create} from 'zustand'
import { ExpertEntity } from '@/components/user/props/ExpertProps.ts';

export const useExpertStore = create((set) => ({
  expert: null,
  setExpert: (expertInfo: ExpertEntity) =>
    set({
      expert: expertInfo,
    }),
  clearExpert: () =>
    set({
      expert: null,
    }),
}));