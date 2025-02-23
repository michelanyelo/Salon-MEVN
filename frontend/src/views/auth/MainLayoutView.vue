<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const authRoutes = [
  { id: 1, name: 'register', text: 'Crea una nueva cuenta' },
  { id: 2, name: 'login', text: 'Accede a tu cuenta' },
  { id: 3, name: 'forgot-password', text: 'Olvidé mi contraseña' },
]
</script>

<template>
  <div class="mx-auto lg:w-3/5 mt-10">
    <RouterView />
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0 lg:gap-3"
    >
      <RouterLink
        v-for="routes in authRoutes"
        :key="routes.id"
        :to="{ name: routes.name }"
        :class="['uppercase font-semibold text-sm text-base hover:text-emerald-500 transition duration-300', route.name === routes.name ? 'hidden' : '']"
      >
        {{ routes.text }}
      </RouterLink>
    </nav>
  </div>
</template>
