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
        <button class="cart-btn" @click="openCart" data-test="cart-icon">🛒</button>
        <button class="dark-toggle-btn" @click="toggleDarkMode">
          {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
        </button>
      </nav>
    </div>

    <CartSidebar :visible="showSidebar" @close="showSidebar = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CartSidebar from './CartSidebar.vue'

// reactive state
const menuOpen = ref(false)
const showSidebar = ref(false)
const isDarkMode = ref(localStorage.getItem('theme') === 'dark')

// apply initial theme
if (isDarkMode.value) {
  document.documentElement.classList.add('dark')
}

// persist dark mode toggles
watch(isDarkMode, (val) => {
  document.documentElement.classList.toggle('dark', val)
  localStorage.setItem('theme', val ? 'dark' : 'light')
})

// methods
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

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
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

.nav a,
.cart-btn {
  padding: 8px 14px;
  background-color: transparent;
  border: 2px solid #ffffff;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav a:hover,
.cart-btn:hover {
  background-color: #ffffff;
  color: #1f2e3d;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.cart-btn {
  font-size: 1.2rem;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
}

.dark-toggle-btn {
  background: none;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: inherit;
  margin-left: auto;
  font-size: 0.9rem;
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

  .nav a,
  .cart-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
