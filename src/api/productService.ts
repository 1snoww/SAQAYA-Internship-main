import type { Product } from '@/types/product'

// ✅ Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch products', error)
    return []
  }
}

// ✅ Fetch single product by ID
export async function getProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}`, error)
    return null
  }
}
