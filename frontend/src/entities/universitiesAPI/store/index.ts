import { create } from 'zustand'
import type { University } from '@shared/types'
import { axiosInstance } from '@shared/utils/axiosInstance'

type State = {
  universities: University[]
  loading: boolean
  error: string | null
  fetchUniversities: () => Promise<void>
}

export const useUniversitiesStore = create<State>((set) => ({
  universities: [],
  loading: false,
  error: null,
  fetchUniversities: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await axiosInstance.get<University[]>('/api/universities')
      set({ universities: data, loading: false })
    } catch {
      set({ error: 'Не удалось загрузить данные', loading: false })
    }
  },
}))
