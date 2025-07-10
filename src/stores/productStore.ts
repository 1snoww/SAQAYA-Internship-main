import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '@/types/product'
import { getProducts, getProduct } from '@/api/productService'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)

  /** Fetch all products from the API */
  async function fetchProducts() {
    loading.value = true
    products.value = await getProducts()
    loading.value = false
  }

  /** Fetch a single product by ID */
  async function fetchProductById(id: number): Promise<Product | null> {
    return await getProduct(id)
  }

  /** Find product in local store (e.g. for detail page caching) */
  function getById(id: number): Product | undefined {
    return products.value.find((p) => p.id === id)
  }

  return {
    products,
    loading,
    fetchProducts,
    fetchProductById,
    getById,
  }
})
