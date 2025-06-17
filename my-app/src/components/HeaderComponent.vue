<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">SAQAYA Shop</h1>
      <nav class="nav">
        <router-link to="/products">Products</router-link>
        <router-link to="/contact">Contact</router-link>
        <button class="cart-btn" @click="showSidebar = true">🛒</button>
      </nav>
    </div>
    <CartSidebar :visible="showSidebar" @close="showSidebar = false" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartSidebar from './CartSidebar.vue'

const showSidebar = ref(false)
</script>

<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
}
.nav a, .cart-btn {
  color: white;
  margin-left: 15px;
  text-decoration: none;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
.nav a:hover, .cart-btn:hover {
  text-decoration: underline;
}
</style>
