import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
app.use(Toastify)

