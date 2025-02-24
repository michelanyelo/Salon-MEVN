<script setup>
import { useUserStore } from '@/stores/user.js'
import { onMounted, ref } from 'vue'

const user = useUserStore()
const isMenuOpen = ref(false) // Estado para controlar el menú

onMounted(async () => {
  await user.fetchUser()
})
</script>

<template>
  <div class="flex justify-center md:justify-between bg-white lg:px-6 py-4 rounded-md">
    <!-- Logo -->
    <h1 class="text-2xl lg:text-6xl font-black uppercase">Dale tu corte</h1>

    <!-- Menú principal visible en pantallas grandes -->
    <div class="hidden lg:flex flex-col space-y-5">
      <div class="flex gap-2 items-center justify-end">
        <p class="text-right text-base">Hola: {{ user.getUserName }}</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-bold rounded-lg transition duration-300 hover:cursor-pointer"
          @click="user.logout()"
        >
          Cerrar sesión
        </button>
      </div>
      <nav class="flex gap-2 items-center justify-end">
        <RouterLink
          :to="{ name: 'my-appointments' }"
          class="p-3 bg-sky-800 hover:bg-sky-900 text-white uppercase text-xs font-bold rounded-lg transition duration-300 hover:cursor-pointer"
        >
          Mis reservas
        </RouterLink>
        <RouterLink
          :to="{ name: 'new-appointment' }"
          class="p-3 bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-xs font-bold rounded-lg transition duration-300 inline-block"
        >
          Nueva reserva
        </RouterLink>
      </nav>
    </div>

    <!-- Botón de hamburguesa visible en pantallas pequeñas -->
    <button class="lg:hidden p-2 focus:outline-none" @click="isMenuOpen = !isMenuOpen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
  </div>

  <!-- Menú desplegable para pantallas pequeñas -->
  <div
    v-if="isMenuOpen"
    class="lg:hidden absolute top-20 right-6 bg-white shadow-md rounded-md p-4 z-10"
  >
    <div class="flex flex-col space-y-4">
      <p class="text-right text-base">Hola: {{ user.getUserName }}</p>
      <button
        type="button"
        class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-bold rounded-lg transition duration-300 hover:cursor-pointer"
        @click="user.logout()"
      >
        Cerrar sesión
      </button>
      <RouterLink
        :to="{ name: 'my-appointments' }"
        class="p-3 bg-sky-800 hover:bg-sky-900 text-white uppercase text-xs font-bold rounded-lg transition duration-300 hover:cursor-pointer"
      >
        Mis reservas
      </RouterLink>
      <RouterLink
        :to="{ name: 'new-appointment' }"
        class="p-3 bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-xs font-bold rounded-lg transition duration-300 inline-block"
      >
        Nueva reserva
      </RouterLink>
    </div>
  </div>

  <main class="bg-white min-h-screen text-black px-6 py-8 rounded-md">
    <RouterView />
  </main>
</template>
