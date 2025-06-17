<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">SAQAYA Shop</h1>
      <nav class="nav">
        <router-link to="/products">Products</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #2c3e50;
  color: white;
  padding: 15px 0;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
}
.nav a {
  color: white;
  margin-left: 15px;
  text-decoration: none;
}
.nav a:hover {
  text-decoration: underline;
}
</style>
