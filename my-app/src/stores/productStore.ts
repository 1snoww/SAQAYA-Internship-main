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
    loadProducts() {
      // Sample static data, you can fetch from API here instead
      this.products = [
        {
          id: 1,
          title: 'Fjallraven - Foldsack No. 1 Backpack',
          price: 109.95,
          description: 'Your perfect pack for everyday use...',
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          rating: { rate: 3.9, count: 120 }
        },
        {
          id: 2,
          title: 'Mens Casual Premium Slim Fit T-Shirts',
          price: 22.3,
          description: 'Slim-fitting style, contrast raglan long sleeve...',
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          rating: { rate: 4.1, count: 259 }
        },
        // 🟦 Add the rest of your products here or fetch dynamically
      ]
    },
    getById(id: number) {
      return this.products.find(p => p.id === id)
    }
  }
})
