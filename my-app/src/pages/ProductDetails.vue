<template>
  <div v-if="product" class="details-container">
    <img :src="product.image" :alt="product.title" class="details-img" />
    <div class="details-info">
      <h2>{{ product.title }}</h2>
      <p class="price">\${{ product.price }}</p>
      <p class="desc">{{ product.description }}</p>
      <p class="category">Category: {{ product.category }}</p>
    </div>
  </div>
  <div v-else>
    <p>Product not found.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = Number(route.params.id)

const products = [
  {
    id: 0,
    title: 'Red Shoes',
    price: 49.99,
    description: 'Comfortable and stylish red sneakers for everyday use.',
    category: 'Footwear',
    image: 'https://via.placeholder.com/200x150?text=Red+Shoes'
  },
  {
    id: 1,
    title: 'White Sneakers',
    price: 59.99,
    description: 'Classic white sneakers that go with anything.',
    category: 'Footwear',
    image: 'https://via.placeholder.com/200x150?text=White+Sneakers'
  },
  {
    id: 2,
    title: 'Black Boots',
    price: 89.99,
    description: 'Durable black boots for outdoor adventures.',
    category: 'Footwear',
    image: 'https://via.placeholder.com/200x150?text=Black+Boots'
  }
]

const product = products.find(p => p.id === productId)
</script>

<style scoped>
.details-container {
  display: flex;
  gap: 30px;
  padding: 20px;
}
.details-img {
  width: 300px;
  height: 225px;
  object-fit: cover;
  border-radius: 6px;
}
.details-info {
  max-width: 500px;
}
.price {
  font-weight: bold;
  color: #2c3e50;
}
.desc {
  margin-top: 10px;
  font-size: 0.95rem;
}
.category {
  margin-top: 8px;
  color: #888;
  font-style: italic;
}
</style>
