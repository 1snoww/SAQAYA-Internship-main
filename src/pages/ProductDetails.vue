<template>
  <!-- PRODUCT DETAILS -->
  <div v-if="product" class="details-container">
    <img :src="product.image" :alt="product.title" class="details-img" />

    <div class="details-info">
      <p class="title">{{ product.title }}</p>
      <p class="price">Price: ${{ product.price.toFixed(2) }}</p>

      <p class="rating">
        Rating:
        <span class="stars">
          <span v-for="n in 5" :key="n">
            <span v-if="n <= Math.round(product.rating.rate)">⭐</span>
            <span v-else>☆</span>
          </span>
        </span>
        ({{ product.rating.count }} reviews)
      </p>

      <p class="desc">{{ product.description }}</p>
      <p class="category">{{ product.category }}</p>

      <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>
      <button class="back-btn" @click="router.push('/products')">← Back to Products</button>
    </div>
  </div>

  <!-- SUGGESTED SCROLLER -->
  <div v-if="suggested.length" class="suggested-section">
    <h3>Suggested Products</h3>
    <div class="suggested-scroll">
      <router-link
        v-for="item in suggested"
        :key="item.id"
        :to="`/product/${item.id}`"
        class="suggested-card"
      >
        <img :src="item.image" :alt="item.title" />
        <p class="suggested-title">{{ item.title }}</p>
        <p class="suggested-price">${{ item.price.toFixed(2) }}</p>
      </router-link>
    </div>
  </div>

  <p v-else-if="loaded && !product">Product not found.</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useNotification } from '@/composables/useNotification'
import type { Product } from '@/types/product'

/* Stores and composables */
const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cart = useCartStore()
const notify = useNotification()

/* State */
const productId = computed(() => Number(route.params.id))
const product = ref<Product | null>(null)
const loaded = ref(false)

/* Fetch product by ID from API */
onMounted(async () => {
  product.value = await productStore.fetchProductById(productId.value)
  loaded.value = true
})

/* Watch for param change */
watch(productId, async (newId) => {
  product.value = await productStore.fetchProductById(newId)
})

/* Suggested products from same category (local list) */
const suggested = computed(() => {
  if (!product.value || !productStore.products.length) return []
  return productStore.products
    .filter((p) => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 8)
})

/* Add to cart */
function addToCart() {
  if (!product.value) return
  cart.addToCart({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image,
    rating: product.value.rating.rate,
  })
  notify.success(`${product.value.title} added to cart!`)
}
</script>

<style scoped>
/* all styles remain unchanged */
.details-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.details-img {
  width: 350px;
  height: 350px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: white;
}

.details-info {
  flex: 1;
  min-width: 280px;
  max-width: 600px;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #2c3e50;
}

.title {
  font-size: 1.9rem;
  font-weight: bold;
  margin: 10px 0;
  color: #2c3e50;
}

.rating {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}

.stars {
  color: #f39c12;
  margin-left: 6px;
}

.desc {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.4;
}

.category {
  margin-top: 16px;
  color: #777;
  font-style: italic;
  font-size: 0.9rem;
}

.add-to-cart-btn {
  margin-top: 20px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

.back-btn {
  margin-top: 12px;
  margin-left: 10px;
  padding: 8px 14px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  background: #eee;
  border-radius: 5px;
  cursor: pointer;
  color: #333;
  transition: background 0.2s ease;
}

.back-btn:hover {
  background: #ddd;
}

.suggested-section {
  margin-top: 60px;
  padding: 20px;
  background: #f8f8f8;
  border-top: 1px solid #ddd;
}

.suggested-section h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
  color: #2c3e50;
}

.suggested-scroll {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 10px;
}

.suggested-card {
  min-width: 160px;
  max-width: 180px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.suggested-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.suggested-card img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 8px;
}

.suggested-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 4px;
  color: #2c3e50;
}

.suggested-price {
  font-size: 0.85rem;
  color: #777;
}
</style>
