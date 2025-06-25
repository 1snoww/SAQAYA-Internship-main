<template>
  <div class="products-container">
    <div class="filter-bar">
      <div class="filter-group">
        <label for="categoryFilter">Filter by Category:</label>
        <select v-model="selectedCategory" id="categoryFilter" class="filter-select">
          <option value="">All</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="sortOption">Sort by Price:</label>
        <select v-model="sortOption" id="sortOption" class="filter-select">
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="search">Search</label>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search products..."
          id="search"
          class="filter-select"
        />
      </div>
    </div>

    <div class="product-grid">
      <ProductCard
        v-for="product in paginatedProducts"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :price="product.price"
        :description="product.description"
        :category="product.category"
        :image="product.image"
        :rating="product.rating.rate"
      />
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { products as rawProducts } from '../data/productsData'

export default {
  name: 'ProductsPage',
  components: {
    ProductCard
  },
  data() {
    return {
      products: rawProducts,
      selectedCategory: '',
      sortOption: '',
      searchTerm: '',
      currentPage: 1,
      itemsPerPage: 8
    }
  },
  computed: {
    categories() {
      return [...new Set(this.products.map(p => p.category))]
    },
    filteredAndSortedProducts() {
      let filtered = this.selectedCategory
        ? this.products.filter(p => p.category === this.selectedCategory)
        : this.products

      if (this.searchTerm) {
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }

      if (this.sortOption === 'asc') {
        filtered = [...filtered].sort((a, b) => a.price - b.price)
      } else if (this.sortOption === 'desc') {
        filtered = [...filtered].sort((a, b) => b.price - a.price)
      }

      return filtered
    },
    totalPages() {
      return Math.ceil(this.filteredAndSortedProducts.length / this.itemsPerPage)
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredAndSortedProducts.slice(start, start + this.itemsPerPage)
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>

<style scoped>
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
