<template>
  <footer class="footer">
    <div class="container">
      <p>© {{ year }} SAQAYA Shop. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #1f2e3d;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
