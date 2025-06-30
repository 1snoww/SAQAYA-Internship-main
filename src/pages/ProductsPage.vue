<template>
  <div class="products-container">
    <!-- FILTER BAR -->
    <div class="filter-bar">
      <!-- Category -->
      <div class="filter-group">
        <label for="categoryFilter">Filter by Category:</label>
        <select v-model="filter.selectedCategory" id="categoryFilter" class="filter-select">
          <option value="">All</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Sort -->
      <div class="filter-group">
        <label for="sortOption">Sort by Price:</label>
        <select v-model="filter.sortOption" id="sortOption" class="filter-select">
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <!-- Search -->
      <div class="filter-group">
        <label for="search">Search</label>
        <input
          v-model="filter.searchTerm"
          type="text"
          placeholder="Search products…"
          id="search"
          class="filter-select"
        />
      </div>
    </div>

    <!-- PRODUCT GRID -->
    <div class="product-grid">
      <ProductCard
        v-for="p in paginatedProducts"
        :key="p.id"
        :id="p.id"
        :title="p.title"
        :price="p.price"
        :description="p.description"
        :category="p.category"
        :image="p.image"
        :rating="p.rating.rate"
      />
    </div>

    <!-- PAGINATION -->
    <div class="pagination">
      <button @click="pagination.prevPage()" :disabled="pagination.currentPage === 1">
        Previous
      </button>
      <span>Page {{ pagination.currentPage }} of {{ totalPages }}</span>
      <button
        @click="pagination.nextPage(totalPages)"
        :disabled="pagination.currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'

import { useProductStore } from '../stores/productStore'
import { useFilterStore } from '../stores/useFilterStore'
import { usePaginationStore } from '../stores/usePaginationStore'

/* Pinia stores */
const productsStore = useProductStore()
const filter = useFilterStore()
const pagination = usePaginationStore()

/* Load catalogue once */
onMounted(() => {
  if (!productsStore.products.length) productsStore.loadProducts()
})

/* Category list for dropdown */
const categories = computed(() =>
  Array.from(new Set(productsStore.products.map((p) => p.category)))
)

/* Filter → search → sort chain */
const filteredProducts = computed(() => {
  let list = productsStore.products

  // category
  if (filter.selectedCategory) list = list.filter((p) => p.category === filter.selectedCategory)

  // search
  if (filter.searchTerm)
    list = list.filter((p) => p.title.toLowerCase().includes(filter.searchTerm.toLowerCase()))

  // sort
  if (filter.sortOption === 'asc') list = [...list].sort((a, b) => a.price - b.price)
  else if (filter.sortOption === 'desc') list = [...list].sort((a, b) => b.price - a.price)

  return list
})

/* Keep current page valid when list length changes */
watch(filteredProducts, () => pagination.resetPage())

/* Paging helpers */
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / pagination.itemsPerPage))
)

const paginatedProducts = computed(() => {
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage
  return filteredProducts.value.slice(start, start + pagination.itemsPerPage)
})
</script>

<style scoped>
/* -- original styles unchanged -- */
.products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px 20px;
  background-color: var(--bg-color);
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 200px;
  max-width: 33.3%;
}

.filter-group label {
  font-weight: bold;
  font-size: 0.95rem;
  margin-bottom: 4px;
  color: var(--text-color);
}

.filter-select {
  padding: 8px 12px;
  font-size: 0.9rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  color: #333;
  outline: none;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.filter-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 6px rgba(52, 152, 219, 0.3);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 30px;
  color: #1f2e3d;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 30px 0 10px;
}

.pagination button {
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #1a252f;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
  }
}
</style>
