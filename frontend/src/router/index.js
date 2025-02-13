import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutView from "@/views/appointments/LayoutView.vue";
import NewView from "@/views/appointments/NewView.vue";

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
      component: LayoutView,
      children: [
        {
          path: 'nueva',
          name: 'new-appointment',
          component: () =>import(NewView)
        }
      ]
    }
  ],
})

export default router
