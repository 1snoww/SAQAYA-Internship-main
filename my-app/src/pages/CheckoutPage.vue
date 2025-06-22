<template>
  <div class="checkout-page">
    <h1>Checkout</h1>

    <form @submit.prevent="placeOrder" class="checkout-form">
      <label>
        Full Name
        <input v-model="form.name" type="text" required />
      </label>

      <label>
        Email
        <input v-model="form.email" type="email" required />
      </label>

      <label>
        Shipping Address
        <textarea v-model="form.address" required></textarea>
      </label>

      <h2>Order Summary</h2>
      <ul class="summary-list">
        <li v-for="item in cart.items" :key="item.id">
          {{ item.title }} × {{ item.quantity }} — ${{ (item.quantity * item.price).toFixed(2) }}
        </li>
      </ul>
      <p class="total">Total: ${{ cart.total.toFixed(2) }}</p>

      <button type="submit" class="place-order-btn">Place Order</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { useNotification } from '../composables/useNotification'

const router = useRouter()
const cart = useCartStore()
const { success } = useNotification()

const form = ref({
  name: '',
  email: '',
  address: '',
})

function placeOrder() {
  if (cart.items.length === 0) return

  success('Order placed successfully! 🎉')
  cart.clearCart()
  router.push('/products')
}
</script>

<style scoped>
.checkout-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.checkout-form label {
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
}

.checkout-form input,
.checkout-form textarea {
  padding: 8px;
  margin-top: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: white;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.total {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.1rem;
}

.place-order-btn {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.place-order-btn:hover {
  background-color: #27ae60;
}
</style>
