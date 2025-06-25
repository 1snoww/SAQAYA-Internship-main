<template>
  <div class="product-card">
    <RouterLink :to="`/product/${id}`" class="product-link" title="Click for details">
      <img :src="image || 'https://via.placeholder.com/200x150?text=No+Image'" :alt="title" class="product-img" />
      <h2 class="title">{{ title }}</h2>
      <p class="price">
        ${{ price.toFixed(2) }}
        <span class="rating">
          ·
          <span v-for="n in 5" :key="n">
            <span v-if="n <= Math.round(rating)">⭐</span><span v-else>☆</span>
          </span>
        </span>
      </p>
      <p class="description" :title="description">{{ shortDescription }}</p>
      <p class="category">{{ category }}</p>
    </RouterLink>
    <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  name: 'ProductCard',
  components: {
    RouterLink
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  },
  computed: {
    shortDescription() {
      return this.description.length > 80
        ? this.description.slice(0, 77) + '...'
        : this.description
    }
  },
  methods: {
    addToCart() {
      const cart = useCartStore()
      cart.addToCart({
        id: this.id,
        title: this.title,
        price: this.price,
        image: this.image,
        rating: this.rating
      })

      toast.success(`${this.title} added to cart!`, {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  max-width: 280px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  overflow: hidden;
}

.product-card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

.product-link {
  text-decoration: none;
  color: inherit;
}

.product-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-radius: 4px;
  margin-bottom: 10px;
}

.title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 4px;
  min-height: 48px;
}

.price {
  font-weight: bold;
  color: #2c3e50;
  font-size: 0.95rem;
  margin-bottom: 6px;
}

.rating {
  font-weight: normal;
  color: #f39c12;
  font-size: 0.9rem;
  margin-left: 6px;
}

.description {
  font-size: 0.85rem;
  color: #555;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
  cursor: help;
}

.category {
  font-style: italic;
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 10px;
}

.add-to-cart-btn {
  padding: 8px;
  border: none;
  border-radius: 6px;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}
</style>
