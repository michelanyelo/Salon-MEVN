import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/views/appointments/MainLayout.vue'
import apiAuth from '@/api/apiAuth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/MainLayoutView.vue'),
      meta: { requiresAdmin: true },
      children: [{
        path: '',
        name: 'admin-appointments',
        component: () => import('@/views/admin/AppointmentsView.vue'),
      }],
    },
    {
      path: '/reservas',
      name: 'appointments',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('@/views/appointments/MyAppointmentsView.vue'),
        },
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
        {
          path: ':id/editar',
          component: () => import('@/views/appointments/EditLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('@/views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('@/views/appointments/DetailsView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/MainLayoutView.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('@/views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'restablecer-contrasena',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'restablecer-contrasena/:token',
          name: 'reset-password',
          component: () => import('@/views/auth/NewPasswordView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      const { data } = await apiAuth.auth()
      if (data.admin) {
        next({ name: 'admin' })
      } else {
        next()
      }
    } catch {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some((url) => url.meta.requiresAdmin)
  if (requiresAdmin) {
    try {
      const { data } = await apiAuth.admin()
      if (data.admin) {
        next()
      } else {
        next({ name: 'home' })
      }
    } catch {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
