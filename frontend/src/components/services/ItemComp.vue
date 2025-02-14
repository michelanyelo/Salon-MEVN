<script setup>
import { formatCurrency } from '@/helpers/index.js'
import { useAppointmentStore } from '@/stores/appointments.js'
import { useFlash } from '@/composable/useSwal.js'

const appointments = useAppointmentStore()
const { flash } = useFlash() // Obtener flash

const props = defineProps({
  service: Object,
})

const serviceSelected = () => {
  appointments.onServiceSelected(props.service, flash)
}
</script>

<template>
  <div
    class="p-5 space-y-5 rounded-lg cursor-pointer border border-transparent hover:border-1 hover:border-emerald-500 transition duration-150"
    :class="
      appointments.isServiceSelected(service._id)
        ? 'bg-emerald-500 text-white'
        : 'bg-gray-50 text-base'
    "
    @click="serviceSelected"
  >
    <p class="text-lg font-medium">{{ service.name }}</p>
    <p
      class="text-xl"
      :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-emerald-500'"
    >
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>
