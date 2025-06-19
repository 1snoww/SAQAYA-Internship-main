<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">SAQAYA Shop</h1>

      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: menuOpen }">☰</span>
      </button>

      <nav :class="['nav', { open: menuOpen }]">
        <router-link to="/products" @click="closeMenu">Products</router-link>
        <router-link to="/contact" @click="closeMenu">Contact</router-link>
        <button class="cart-btn" @click="openCart">🛒</button>
      </nav>
    </div>

    <CartSidebar :visible="showSidebar" @close="showSidebar = false" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CartSidebar from './CartSidebar.vue'

const menuOpen = ref(false)
const showSidebar = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function openCart() {
  showSidebar.value = true
  menuOpen.value = false
}
</script>

<style scoped>
.header {
  background-color: #1f2e3d;
  color: white;
  padding: 16px 0;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.nav a:hover {
  text-decoration: underline;
}

.cart-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav {
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #1f2e3d;
    padding: 10px 20px;
    display: none;
  }

  .nav.open {
    display: flex;
  }
}
</style>
