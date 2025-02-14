<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'new-appointment' }"
      class="flex-1 text-center p-3 uppercase font-bold hover:bg-emerald-600 hover:text-white rounded-md transition duration-300"
      :class="
        route.name === 'new-appointment'
          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
          : 'bg-white text-emerald-600 border-emerald-600 border-1'
      "
      >Servicios
    </RouterLink>

    <RouterLink
      :to="{ name: 'appointment-details' }"
      class="flex-1 text-center p-3 uppercase font-bold hover:bg-emerald-600 hover:text-white rounded-md transition duration-300"
      :class="
        route.name === 'appointment-details'
          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
          : 'bg-white text-emerald-600 border-emerald-600 border-1'
      "
      >Reservas
    </RouterLink>
  </nav>

  <div class="space-y-8">
    <RouterView />
  </div>
</template>

<style scoped></style>
