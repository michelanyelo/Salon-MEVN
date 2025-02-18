import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.js'

const app = createApp(App)

// Configuración de Pinia
app.use(createPinia())

// Configuración de FormKit
app.use(plugin, defaultConfig(config))

// Configuración de PrimeVue y servicios
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  locale: {
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    today: 'Hoy',
    weekHeader: 'Sem',
    firstDayOfWeek: 0,
    dateFormat: 'mm/dd/yy',
  },
})

// Configuración del servicio Toast
app.use(ToastService)

// Configuración del enrutador
app.use(router)

// Montar la aplicación
app.mount('#app')
