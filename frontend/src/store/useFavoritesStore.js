import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id)

          if (exists) {
            return {
              items: state.items.filter((item) => item.id !== product.id),
            }
          }

          return {
            items: [
              {
                ...product,
                addedAt: Date.now(),
              },
              ...state.items,
            ],
          }
        }),
      removeFavorite: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      isFavorite: (id) => get().items.some((item) => item.id === id),
      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'foodclick-favorites-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
)

