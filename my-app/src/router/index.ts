import { createRouter, createWebHistory } from 'vue-router'
import ProductDetails from '../pages/ProductDetails.vue'
import ProductsPage from '../pages/ProductsPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import CartPage from '../pages/CartPage.vue'

const routes = [
  { path: '/products', component: ProductsPage },
  { path: '/product/:id', component: ProductDetails },
  { path: '/contact', component: ContactPage },
  { path: '/cart', component: CartPage } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
