<template>
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
      <button class="back-btn" @click="goBack">← Back to Products</button>
    </div>
  </div>

  <div class="suggested-section" v-if="suggested.length">
    <h3>Suggested Products</h3>
    <div class="suggested-scroll">
      <router-link
        class="suggested-card"
        v-for="item in suggested"
        :key="item.id"
        :to="`/product/${item.id}`"
      >
        <img :src="item.image" :alt="item.title" />
        <p class="suggested-title">{{ item.title }}</p>
        <p class="suggested-price">${{ item.price.toFixed(2) }}</p>
      </router-link>
    </div>
  </div>

  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { products as rawProducts } from '../data/productsData'
import { ref, computed, watch } from 'vue'
import { useNotification } from '../composables/useNotification'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const notify = useNotification()

const productId = ref(Number(route.params.id))
const products = rawProducts

const product = ref(products.find(p => p.id === productId.value) || null)

const suggested = ref(
  products.filter(p => p.category === product.value?.category && p.id !== product.value?.id).slice(0, 8)
)

watch(
  () => route.params.id,
  (newId) => {
    productId.value = Number(newId)
    product.value = products.find(p => p.id === productId.value) || null
    suggested.value = products
      .filter(p => p.category === product.value?.category && p.id !== product.value?.id)
      .slice(0, 8)
  }
)

function goBack() {
  router.push('/products')
}

function addToCart() {
  if (product.value) {
    cart.addToCart({
      id: product.value.id,
      title: product.value.title,
      price: product.value.price,
      image: product.value.image,
      rating: product.value.rating.rate
    })
    notify.success(`${product.value.title} added to cart!`)
  }
}
</script>

<style scoped>
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
