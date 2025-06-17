import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]') as {
      id: number
      title: string
      price: number
      quantity: number
    }[]
  }),
  actions: {
    addToCart(product: { id: number; title: string; price: number }) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },
    removeFromCart(id: number) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveCart()
    },
    clearCart() {
      this.items = []
      this.saveCart()
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  },
  getters: {
    total(): number {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  }
})
