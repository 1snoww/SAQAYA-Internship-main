<template>
  <div class="product-card">
    <RouterLink :to="`/product/${id}`" class="product-link">
      <img :src="image || 'https://via.placeholder.com/200x150?text=No+Image'" :alt="title" class="product-img" />
      <h2>{{ title }}</h2>
      <p class="price">\${{ price }}</p>
      <p class="description">{{ description }}</p>
      <p class="category">{{ category }}</p>
    </RouterLink>
    <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const cart = useCartStore()

const props = defineProps<{
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}>()

function addToCart() {
  cart.addToCart({
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image // ✅ Pass image to cart
  })

  toast.success(`${props.title} added to cart!`, {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT
  })
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  width: 220px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}

.price {
  font-weight: bold;
  color: #2c3e50;
}

.description {
  font-size: 0.9rem;
  color: #555;
  margin-top: 6px;
}

.category {
  font-style: italic;
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}

.add-to-cart-btn {
  margin-top: 12px;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}
</style>
