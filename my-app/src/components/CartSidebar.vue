<template>
  <div v-if="visible" class="overlay" @click.self="closeSidebar">
    <div class="sidebar">
      <h2>Your Cart</h2>
      <div v-if="cart.items.length">
        <div v-for="item in cart.items" :key="item.id" class="item">
          <img :src="item.image || 'https://via.placeholder.com/60'" alt="product" />
          <div class="details">
            <p><strong>{{ item.title }}</strong></p>
            <p>Quantity: x{{ item.quantity }}</p>
            <p>\${{ (item.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
        <hr />
        <div class="footer">
          <h3>Total: \${{ cart.total.toFixed(2) }}</h3>
          <button class="clear-btn" @click="cart.clearCart">Clear Cart</button>
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])

const cart = useCartStore()

function closeSidebar() {
  emit('close')
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.sidebar {
  background: #1f2e3d;
  width: 320px;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  animation: slide-in 0.3s ease forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}

.item {
  display: flex;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid #000000;
}

.item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.details p {
  margin: 2px 0;
  font-size: 0.9rem;
}

.footer {
  margin-top: 15px;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #c0392b;
}
</style>
