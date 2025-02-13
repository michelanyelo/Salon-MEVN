<script setup>
import ItemComp from '@/components/services/ItemComp.vue'
import { useServiceStore } from '@/stores/services.js'

const serviceStore = useServiceStore()
</script>

<template>
  <h2 class="text-4xl font-bold mt-10">Servicios</h2>
  <p class="text-lg mt-5">A continuación elige al menos un servicio para tu cita</p>

  <div class="grid grid-cols-2 gap-5 mt-5">
    <ItemComp v-for="service in serviceStore.allServices" :key="service._id" :service="service" />
  </div>
</template>

<style scoped></style>
