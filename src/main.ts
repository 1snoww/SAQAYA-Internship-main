// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast, {
  autoClose: 3000,
  position: 'top-right',
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
})
app.mount('#app')
