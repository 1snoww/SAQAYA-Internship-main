<template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <div v-if="cart.items.length">
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <p><strong>{{ item.title }}</strong> (x{{ item.quantity }})</p>
        <p>\${{ item.price.toFixed(2) }} each</p>
        <p>({{ item.rating }})</p>
        <p>Total: \${{ (item.price * item.quantity).toFixed(2) }}</p>
        <button @click="cart.removeFromCart(item.id)">Remove</button>
      </div>
      <hr />
      <h2>Cart Total: \${{ cart.total.toFixed(2) }}</h2>
      <button @click="cart.clearCart">Clear Cart</button>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
const cart = useCartStore()
</script>

<style scoped>
.cart-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.cart-item {
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.cart-item button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.cart-item button:hover {
  background-color: #c0392b;
}
</style>
