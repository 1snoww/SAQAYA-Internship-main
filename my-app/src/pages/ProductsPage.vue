<template>
  <div class="product-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :title="product.title"
      :price="product.price"
      :description="product.description"
      :category="product.category"
      :image="product.image"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue'

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
</script>

<style scoped>
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
