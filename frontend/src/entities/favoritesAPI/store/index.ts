import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FavoriteItem } from '@shared/types'

type State = {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (specialty: string, universityName: string) => void
  isFavorite: (specialty: string, universityName: string) => boolean
}

export const useFavoritesStore = create<State>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (item) => set({ favorites: [...get().favorites, item] }),
      removeFavorite: (specialty, universityName) =>
        set({
          favorites: get().favorites.filter(
            (f) => !(f.specialty === specialty && f.universityName === universityName)
          ),
        }),
      isFavorite: (specialty, universityName) =>
        get().favorites.some(
          (f) => f.specialty === specialty && f.universityName === universityName
        ),
    }),
    { name: 'favorites' }
  )
)
