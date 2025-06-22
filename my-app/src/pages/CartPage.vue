<template>
  <div class="cart-page">
    <h1>Your Cart</h1>
    <div v-if="cart.items.length">
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <p><strong>{{ item.title }}</strong> (x{{ item.quantity }})</p>
        <p>\${{ item.price.toFixed(2) }} each</p>
        <p>({{ item.rating }})</p>
        <p>Total: \${{ (item.price * item.quantity).toFixed(2) }}</p>
        <button @click="removeItem(item.id)">Remove</button>
      </div>
      <hr />
      <h2>Cart Total: \${{ cart.total.toFixed(2) }}</h2>
      <div class="cart-actions">
        <button @click="clearCart">Clear Cart</button>
        <router-link to="/checkout" class="checkout-link">
          <button class="checkout-btn">Proceed to Checkout</button>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { useNotification } from '../composables/useNotification'

const cart = useCartStore()
const { success, info } = useNotification()

function removeItem(id: number) {
  cart.removeFromCart(id)
  info('Item removed from cart')
}

function clearCart() {
  cart.clearCart()
  success('Cart cleared successfully')
}
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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

.cart-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.checkout-link {
  text-decoration: none;
}

.checkout-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.checkout-btn:hover {
  background-color: #1e874b;
}
</style>
