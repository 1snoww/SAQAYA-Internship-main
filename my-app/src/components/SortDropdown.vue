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
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['sort'])

const selected = ref('default')

function emitSort() {
  emit('sort', selected.value)
}
</script>

<style scoped>
.sort-dropdown {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 8px;
}

select {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
    