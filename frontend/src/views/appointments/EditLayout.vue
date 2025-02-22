<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppointmentAPI from '@/api/AppointmentAPI.js'
import { useAppointmentStore } from '@/stores/appointments.js'

const route = useRoute()
const router = useRouter()
const appointmentStore = useAppointmentStore()

const { id } = route.params

onMounted(async () => {
  try {
    const { data } = await AppointmentAPI.getById(id)
    appointmentStore.setSelectedAppointment(data)
  } catch {
    await router.push({ name: 'my-appointments' })
  }
})
</script>
<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{ name: 'edit-appointment' }"
      class="flex-1 text-center p-3 uppercase font-bold hover:bg-emerald-600 hover:text-white rounded-md transition duration-300"
      :class="
        route.name === 'edit-appointment'
          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
          : 'bg-white text-emerald-600 border-emerald-600 border-1'
      "
      >Servicios
    </RouterLink>

    <RouterLink
      :to="{ name: 'edit-appointment-details' }"
      class="flex-1 text-center p-3 uppercase font-bold hover:bg-emerald-600 hover:text-white rounded-md transition duration-300"
      :class="
        route.name === 'edit-appointment-details'
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
