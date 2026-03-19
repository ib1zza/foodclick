import { create } from 'zustand'

function parsePrice(price) {
  return Number.parseInt(String(price).replace(/[^\d]/g, ''), 10) || 0
}

export const useBasketStore = create((set, get) => ({
  isOpen: false,
  items: [],
  openBasket: () => set({ isOpen: true }),
  closeBasket: () => set({ isOpen: false }),
  toggleBasket: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        items: [
          ...state.items,
          {
            ...product,
            quantity: 1,
            priceValue: product.priceValue ?? parsePrice(product.price),
          },
        ],
      }
    }),
  increaseItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),
  decreaseItem: (id) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearBasket: () => set({ items: [] }),
  itemCount: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: () =>
    get().items.reduce(
      (total, item) => total + item.priceValue * item.quantity,
      0,
    ),
}))
