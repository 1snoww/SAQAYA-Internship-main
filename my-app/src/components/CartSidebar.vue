<template>
  <div v-if="visible" class="overlay" @click.self="closeSidebar">
    <div class="sidebar">
      <h2>Your Cart</h2>
      <div v-if="cart.items.length">
        <div v-for="item in cart.items" :key="item.id" class="item">
          <p><strong>{{ item.title }}</strong> (x{{ item.quantity }})</p>
          <p>\${{ item.price.toFixed(2) }}</p>
        </div>
        <hr />
        <h3>Total: \${{ cart.total.toFixed(2) }}</h3>
        <button @click="cart.clearCart">Clear Cart</button>
      </div>
      <div v-else><p>Your cart is empty.</p></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'

defineProps<{ visible: boolean }>() // ✔ No need to assign to const
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
  background: rgba(0, 0, 0, 0.3); /* lightened from 0.4 to 0.3 */
  z-index: 2000; /* Ensure it's on top of everything */
  display: flex;
  justify-content: flex-end;
}

.sidebar {
  background: #ffffff;
  width: 320px;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 2001; /* Higher than overlay to be sure */
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
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
</style>
