<template> 
  <div class="product-grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :id="product.id"
      :title="product.title"
      :price="product.price"
      :description="product.description"
      :category="product.category"
      :image="product.image"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from '../components/ProductCard.vue'

const products = [
  { id: 0, title: 'Red Shoes', price: 49.99, description: 'Comfortable and stylish red sneakers for everyday use.', category: 'Footwear', image: 'https://placehold.co/200x150?text=Red+Shoes' },
  { id: 1, title: 'White Sneakers', price: 59.99, description: 'Classic white sneakers that go with anything.', category: 'Footwear', image: 'https://placehold.co/200x150?text=White+Sneakers' },
  { id: 2, title: 'Black Boots', price: 89.99, description: 'Durable black boots for outdoor adventures.', category: 'Footwear', image: 'https://placehold.co/200x150?text=Black+Boots' },
  { id: 3, title: 'Running Shoes', price: 69.99, description: 'Lightweight running shoes for daily jogs.', category: 'Footwear', image: 'https://placehold.co/200x150?text=Running+Shoes' },
  { id: 4, title: 'Denim Jacket', price: 89.00, description: 'Stylish blue denim jacket.', category: 'Apparel', image: 'https://placehold.co/200x150?text=Denim+Jacket' },
  { id: 5, title: 'Smart Watch', price: 129.99, description: 'Fitness tracking and notifications.', category: 'Electronics', image: 'https://placehold.co/200x150?text=Smart+Watch' },
  { id: 6, title: 'Backpack', price: 45.50, description: 'Waterproof school backpack.', category: 'Accessories', image: 'https://placehold.co/200x150?text=Backpack' },
  { id: 7, title: 'Bluetooth Earbuds', price: 39.99, description: 'Wireless earbuds with charging case.', category: 'Electronics', image: 'https://placehold.co/200x150?text=Earbuds' },
  { id: 8, title: 'Casual T-Shirt', price: 19.99, description: 'Soft cotton t-shirt.', category: 'Apparel', image: 'https://placehold.co/200x150?text=T-Shirt' },
  { id: 9, title: 'Yoga Mat', price: 22.00, description: 'Non-slip exercise mat.', category: 'Fitness', image: 'https://placehold.co/200x150?text=Yoga+Mat' },
  { id: 10, title: 'Gaming Mouse', price: 59.00, description: 'Ergonomic RGB gaming mouse.', category: 'Electronics', image: 'https://placehold.co/200x150?text=Gaming+Mouse' },
  { id: 11, title: 'Sunglasses', price: 29.99, description: 'Polarized UV protection sunglasses.', category: 'Accessories', image: 'https://placehold.co/200x150?text=Sunglasses' },
  { id: 12, title: 'Leather Wallet', price: 34.99, description: 'Compact bifold wallet.', category: 'Accessories', image: 'https://placehold.co/200x150?text=Wallet' },
  { id: 13, title: 'Running Shorts', price: 27.99, description: 'Breathable athletic shorts.', category: 'Fitness', image: 'https://placehold.co/200x150?text=Shorts' },
  { id: 14, title: 'Winter Beanie', price: 15.99, description: 'Warm knitted cap.', category: 'Apparel', image: 'https://placehold.co/200x150?text=Beanie' },
  { id: 15, title: 'Laptop Stand', price: 48.00, description: 'Adjustable metal laptop stand.', category: 'Office', image: 'https://placehold.co/200x150?text=Laptop+Stand' },
  { id: 16, title: 'Desk Lamp', price: 25.00, description: 'LED reading lamp with touch controls.', category: 'Office', image: 'https://placehold.co/200x150?text=Desk+Lamp' },
  { id: 17, title: 'Travel Mug', price: 18.50, description: 'Insulated stainless steel mug.', category: 'Kitchen', image: 'https://placehold.co/200x150?text=Travel+Mug' }
]
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    padding: 16px;
  }
}
</style>
