<script setup>
import { formatCurrency } from '@/helpers/index.js'
import { useAppointmentStore } from '@/stores/appointments.js'

const appointment = useAppointmentStore()

defineProps({
  service: Object,
})
</script>

<template>
  <div
    class="rounded-lg p-4 flex justify-between items-center mb-4 hover:cursor-pointer hover:bg-gray-100 transition duration-300"
  >
    <div>
      <p class="text-lg font-semibold text-gray-800">{{ service.name }}</p>
      <p class="text-lg font-semibold text-emerald-500">{{ formatCurrency(service.price) }}</p>
    </div>

    <button
      type="button"
      class="inline-flex items-center rounded-md bg-red-500 text-white text-sm px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-600 hover:cursor-pointer"
      @click="appointment.onServiceSelected(service)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>

    </button>
  </div>
</template>

<style scoped></style>
