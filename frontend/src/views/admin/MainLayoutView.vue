<script setup>
import { useUserStore } from '@/stores/user.js'
import { onMounted } from 'vue'

const user = useUserStore()

onMounted(async () => {
  await user.fetchUser()
})
</script>

<template>
  <div class="flex justify-between px-6 py-4 rounded-md">
    <div>
      <h1 class="text-2xl lg:text-6xl font-black uppercase">Dale tu corte</h1>
      <h2 class="text-xl lg:text-2xl font-black text-base">Panel de Administración</h2>
    </div>

    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center">
        <p class="text-base text-right">Hola: {{ user.getUserName }}</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-bold rounded-lg transition duration-300 hover:cursor-pointer"
          @click="user.logout()"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
  <main class="space-y-6">
    <RouterView />
  </main>
</template>
