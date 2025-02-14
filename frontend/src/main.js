import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import es from 'element-plus/es/locale/lang/es';

const app = createApp(App)

app.use(ElementPlus, {
  locale: es,
})
app.use(createPinia())
app.use(router)

app.mount('#app')
