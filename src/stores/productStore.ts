// src/stores/productStore.ts
import { defineStore } from 'pinia'
import { products as seed } from '@/data/productsData' // ← full static catalogue

/* ---------- Type helpers ---------- */
interface Rating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

/* ---------- Pinia store ---------- */
export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),

  actions: {
    /** Load catalogue (static seed for now; swap with API later) */
    loadProducts() {
      this.products = seed
    },

    /** Optional: live fetch from FakeStore when you’re ready */
    async fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products')
      this.products = await res.json()
    },

    /** Lookup helper for ProductDetails */
    getById(id: number) {
      return this.products.find((p) => p.id === id)
    },
  },
})
