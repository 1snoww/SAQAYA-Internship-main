<template>
  <div v-if="visible" class="cart-sidebar">
    <div class="cart-header">
      <h3>Your Cart</h3>
      <button class="close-btn" @click="close">×</button>
    </div>

    <div v-if="cart.items.length > 0" class="cart-items">
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <img :src="item.image" alt="" class="item-image" />
        <div class="item-info">
          <h4>{{ item.title }}</h4>
          <p>
            ${{ item.price }} x {{ item.quantity }} =
            <strong>${{ (item.price * item.quantity).toFixed(2) }}</strong>
          </p>
          <div class="quantity-controls">
            <button @click="decrement(item.id)" :disabled="item.quantity <= 1">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increment(item.id)">+</button>
            <button class="remove-btn" @click="remove(item.id)">Remove</button>
          </div>
        </div>
      </div>

      <div class="cart-footer">
        <p>
          Total: <strong>${{ cart.total.toFixed(2) }}</strong>
        </p>
        <router-link to="/checkout" class="checkout-btn" @click="close">
          Proceed to Checkout
        </router-link>
        <router-link to="/products" class="back-btn" @click="close">
          ⬅ Back to Products
        </router-link>
        <router-link to="/cart" class="back-btn" @click="close"> Cart </router-link>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty.</p>
      <router-link to="/products" class="back-btn" @click="close"> ⬅ Back to Products </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cartStore'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ visible: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cart = useCartStore()

function increment(id: number) {
  cart.incrementQuantity(id)
}

function decrement(id: number) {
  cart.decrementQuantity(id)
}

function remove(id: number) {
  cart.removeFromCart(id)
}

function close() {
  emit('close')
}
</script>

<style scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  height: 100%;
  background: #fdfdfd;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  border-left: 4px solid #1f2e3d;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.cart-header h3 {
  font-size: 1.3rem;
  color: #1f2e3d;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1f2e3d;
}

.cart-items {
  margin-top: 10px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: contain;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.item-info h4 {
  font-size: 0.95rem;
  color: #2c3e50;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.item-info p {
  margin: 3px 0;
  font-size: 0.85rem;
  color: #555;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  flex-wrap: wrap;
}

.quantity-controls button {
  padding: 4px 8px;
  font-size: 0.9rem;
  background: #1f2e3d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.cart-footer {
  padding-top: 12px;
  border-top: 1px solid #ccc;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-footer p {
  font-size: 1rem;
  font-weight: bold;
  color: #1f2e3d;
}

.checkout-btn {
  background-color: #2ecc71;
  color: white;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #27ae60;
}

.back-btn {
  display: inline-block;
  padding: 8px 12px;
  background-color: #1f2e3d;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
}

.back-btn:hover {
  background-color: #34495e;
}

.empty-cart {
  margin-top: 40px;
  text-align: center;
  font-style: italic;
  color: #555;
}
</style>
