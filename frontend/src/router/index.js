import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/views/appointments/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reservas',
      name: 'appointments',
      component: MainLayout,
      children: [
        {
          path: 'nueva',
          component: () => import('@/views/appointments/NewLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('@/views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('@/views/appointments/DetailsView.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
