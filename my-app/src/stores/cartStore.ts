import { defineStore } from 'pinia'

// Type for a cart item
export type CartItem = {
  id: number
  title: string
  price: number
  image: string
  rating: number
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    total(state): number {
      return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }
  },

  actions: {
    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(id: number) {
      this.items = this.items.filter(item => item.id !== id)
    },

    incrementQuantity(id: number) {
  const item = this.items.find(item => item.id === id)
  if (item) {
    item.quantity++
  }
},

decrementQuantity(id: number) {
  const item = this.items.find(item => item.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}
,


    clearCart() {
      this.items = []
    }
  }
})
