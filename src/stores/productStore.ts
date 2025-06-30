import { defineStore } from 'pinia'

interface Rating {
  rate: number
  count: number
}

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    loadProducts() {},
    getById(id: number) {
      return this.products.find((p) => p.id === id)
    },
  },
})
