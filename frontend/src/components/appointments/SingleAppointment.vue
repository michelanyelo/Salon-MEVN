<script setup>
import { formatCurrency } from '@/helpers/index.js'
import { displayDate } from '@/helpers/index.js'
import {useAppointmentStore} from "@/stores/appointments.js";

const appointmentStore = useAppointmentStore()

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
    <p class="text-medium font-medium">
      {{ displayDate(appointment.date).toUpperCase() }} - {{ appointment.time }} hrs
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

    <div class="flex gap-2 items-center">
      <RouterLink
        class="bg-slate-600 hover:bg-slate-700 rounded-lg p-3 text-white text-sm uppercase font-semibold flex-1 md:flex-none hover:cursor-pointer transition duration-300"
        :to="{ name: 'edit-appointment', params: { id: appointment._id } }"
      >
        Editar cita
      </RouterLink>
      <button
        class="rounded-lg p-3 text-white text-sm uppercase font-semibold flex-1 md:flex-none hover:cursor-pointer bg-red-600 hover:bg-red-700 transition duration-300"
        @click="appointmentStore.deleteAppointment(appointment._id)"
      >
        Eliminar cita
      </button>
    </div>
  </div>
</template>

<style scoped></style>
