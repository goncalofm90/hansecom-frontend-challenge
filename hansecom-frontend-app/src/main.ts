import { createApp } from 'vue'
import App from './components/App.vue'
import './style.sass'
import router from './router.ts'
import store from '../src/store/index.ts'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

export default store
