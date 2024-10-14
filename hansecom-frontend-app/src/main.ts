import { createApp } from 'vue'
import App from './components/App.vue'
import './style.sass'
import router from './router.ts'

const app = createApp(App)
app.use(router)
app.mount('#app')
