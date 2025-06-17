<template>
  <RouterLink :to="`/product/${id}`" class="product-card">
    <img :src="image" :alt="title" class="product-img" />
    <h2>{{ title }}</h2>
    <p class="price">\${{ price }}</p>
    <p class="description">{{ description }}</p>
    <p class="category">{{ category }}</p>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}>()
</script>

<style scoped>
.product-card {
  display: block;
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
  cursor: pointer;
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
</style>
