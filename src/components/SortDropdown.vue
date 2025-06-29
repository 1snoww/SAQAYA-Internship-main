<template>
  <div class="sort-dropdown">
    <label for="sort">Sort by:</label>
    <select id="sort" v-model="selected" @change="emitSort">
      <option value="default">Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-desc">Rating: High to Low</option>
      <option value="rating-asc">Rating: Low to High</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Declare the emit signature
const emit = defineEmits<{
  (e: 'sort', value: string): void
}>()

// Reactive selected value
const selected = ref<string>('default')

// When the dropdown changes, emit the new sort key
function emitSort() {
  emit('sort', selected.value)
}
</script>

<style scoped>
.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-dropdown label {
  font-weight: 500;
}

.sort-dropdown select {
  padding: 0.3rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
