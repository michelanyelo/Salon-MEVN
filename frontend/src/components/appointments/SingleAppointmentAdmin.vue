<script setup>
import { formatCurrency } from '@/helpers/index.js'
import { displayDate } from '@/helpers/index.js'

defineProps({
  appointment: {
    type: Object,
  },
})
</script>

<template>
  <div
    class="p-5 space-y-5 rounded-lg cursor-pointer border border-transparent hover:border-1 hover:border-emerald-500 transition duration-150 bg-gray-50 text-base"
  >
    <p class="text-medium font-medium ">
      <span class="text-gray-700 font-semibold uppercase">Cliente: </span
      >{{ appointment.user.name }}
      <br />
      <span class="text-gray-700 font-semibold uppercase">Correo: </span
      >{{ appointment.user.email }}
      <br />
      <span class="text-gray-700 font-semibold uppercase">Fecha: </span>
      {{ displayDate(appointment.date) }} - {{ appointment.time }} hrs
    </p>

    <div v-for="service in appointment.services" :key="service._id">
      <p class="text-lg font-semibold text-gray-800">{{ service.name }}</p>
      <p class="text-lg text-emerald-500">{{ formatCurrency(service.price) }}</p>
    </div>

    <div class="mt-6 p-4 border-t border-gray-200 flex justify-between">
      <p class="text-sm text-gray-700">Sub total servicios agregados</p>
      <p class="font-semibold text-emerald-500">
        {{ formatCurrency(appointment.totalAmount) }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
